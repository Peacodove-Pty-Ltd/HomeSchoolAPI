const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {google} = require('googleapis')
const {OAuth2} = google.auth
const fetch = require('node-fetch')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env
const properties = require('../../properties')
const studentCtr = require('./StudentController')
const lecturerCtr = require('./LecturerController')
const adminCtr = require('./AdminController')

const UserCtrl = {
  register: async (req, res) => {
      try {
          const {name, email, password, role} = req.body
          
        if(!role)
            return res.status(400).json({msg: "Please select your role to continue."})
          
        if(!name || !email || !password)
            return res.status(400).json({msg: "Please fill in all fields."})

        if(!validateEmail(email))
            return res.status(400).json({msg: "Invalid emails."})
          
        if(role === properties.ROLES.ADMIN)
            const user = await adminCtr.findAdminByEmail({email})

        else if(role === properties.ROLES.LECTURER)
            const user = await lecturerCtr.findLecturerByEmail({email})

        else if(role === properties.ROLES.STUDENT)
            const user = await studentCtr.findByStudentEmail({email})
        
        if(user) return res.status(400).json({msg: "This email already exists."})

        if(password.length < 8)
            return res.status(400).json({msg: "Password must be at least 8 characters."})

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = {
            name, email, password: passwordHash
        }

          const activation_token = createActivationToken(newUser)

          const url = `${CLIENT_URL}/${role}/activate/${activation_token}`
          sendMail(email, url, "Verify your email address")


        res.json({msg: "Register Success! Please activate your email to start."})
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  activateEmail: async (req, res) => {
      try {
          const {activation_token} = req.body
          const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

          const {name, email, password, role} = user

        if(!role) return res.status(400).json({msg: "Select A role to continue"})

        if(role === properties.ROLES.ADMIN){
            const check = await adminCtr.findAdminByEmail({email})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newAdmin = adminCtr.createAdmin({
                name, email, password
            })
            (await newAdmin).save
        }

        else if(role === properties.ROLES.LECTURER){
            const check = await lecturerCtr.findLecturerByEmail({email})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newLecturer = lecturerCtr.createLecturer({
                name, email, password
            })
            (await newLecturer).save
        }
        else if(role === properties.ROLES.STUDENT){
            const check = await studentCtr.findByStudentEmail({email})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newStudent = studentCtr.createStudent({
                name, email, password
            })
            (await newStudent).save
        }
          res.json({msg: "Account has been activated!"})

      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  login: async (req, res) => {
      try {
        const {email, password, role} = req.body
        if(!role) return res.status(400).json({msg: "Select A role to continue"})

        if(role === properties.ROLES.ADMIN)
            const user = await adminCtr.findByAdminEmail({email})

        else if(role === properties.ROLES.LECTURER)
            const user = await lecturerCtr.findLecturerByEmail({email})

        else if(role === properties.ROLES.STUDENT)
            const user = await studentCtr.findByStudentEmail({email})
        
          if(!user) return res.status(400).json({msg: "This email does not exist."})

          const isMatch = await bcrypt.compare(password, user.password)
          if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

          const refresh_token = createRefreshToken({id: user._id})
          res.cookie('refreshtoken', refresh_token, {
              httpOnly: true,
              path: '/'+role+'/refresh_token',
              maxAge: 7*24*60*60*1000 // 7 days
          })

          res.json({msg: "Login success!"})
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  getAccessToken: (req, res) => {
      try {
          const rf_token = req.cookies.refreshtoken
          if(!rf_token) return res.status(400).json({msg: "Please login now!"})

          jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
              if(err) return res.status(400).json({msg: "Please login now!"})

              const access_token = createAccessToken({id: user.id})
              res.json({access_token})
          })
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  forgotPassword: async (req, res) => {
      try {
          const {email, role} = req.body
          if(!role) return res.status(400).json({msg: "Select A role to continue"})

          if(role === properties.ROLES.ADMIN)
              const user = await adminCtr.findAdminByEmail({email})
  
          else if(role === properties.ROLES.LECTURER)
              const user = await lecturerCtr.findLecturerByEmail({email})
  
          else if(role === properties.ROLES.STUDENT)
              const user = await studentCtr.findByStudentEmail({email})
                
        if(!user) return res.status(400).json({msg: "This email does not exist."})

          const access_token = createAccessToken({id: user._id})
          const url = `${CLIENT_URL}/${role}/reset/${access_token}`

          sendMail(email, url, "Reset your password")
          res.json({msg: "Re-send the password, please check your email."})
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  resetPassword: async (req, res) => {
      try {
          const {password} = req.body
          console.log(password)
          const passwordHash = await bcrypt.hash(password, 12)

          if(role === properties.ROLES.ADMIN) 
          await adminCtr.updateAdmin({_id: req.user.id}.select('-password'), {
              password: passwordHash
          }) 

          else if(role === properties.ROLES.LECTURER) 
          await lecturerCtr.updateLecturer({_id: req.user.id}.select('-password'), {
              password: passwordHash
          }) 

          else if(role === properties.ROLES.STUDENT) 
          await studentCtr.updateStudent({_id: req.user.id}.select('-password'), {
              password: passwordHash
          })

          res.json({msg: "Password successfully changed!"})
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  getUserInfo: async (req, res) => {
      try {
        if(role === properties.ROLES.ADMIN) 
        const user = await adminCtr.findAdminById(req.user.id).select('-password')

        else if(role === properties.ROLES.LECTURER) 
        const user = await lecturerCtr.findLecturerByEmailecturerById(req.user.id).select('-password')

        else if(role === properties.ROLES.STUDENT) 
          const user = await studentCtr.findStudentById(req.user.id).select('-password')

          res.json(user)
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  logout: async (req, res) => {
      try {
        const {role} = req.body
        res.clearCookie('refreshtoken', {path: '/'+role+'/refresh_token'})
          return res.json({msg: "Logged out."})
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  deleteUser: async (req, res) => {
      try {
        const {role} = req.body
        if(role === properties.ROLES.ADMIN)
            await adminCtr.deleteAdmin(req.params.id)

        else if(role === properties.ROLES.LECTURER) 
            await lecturerCtr.deleteLecturer(req.params.id)

        else if(role === properties.ROLES.STUDENT) 
            await student.deleteStudent(req.params.id)

          res.json({msg: "Deleted Success!"})
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  googleLogin: async (req, res) => {
      try {
          const {tokenId, role} = req.body

          const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
          
          const {email_verified, email, name, picture} = verify.payload

          const password = email + process.env.GOOGLE_SECRET

          const passwordHash = await bcrypt.hash(password, 12)

          if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

          if(role === properties.ROLES.ADMIN)
            const user = await adminCtr.findAdminByEmail({email})

          else if(role === properties.ROLES.LECTURER)
            const user = await lecturerCtr.findLecturerByEmail({email})

          else if(role === properties.ROLES.STUDENT)
            const user = await studentCtr.findByStudentEmail({email})
          if(user){
              const isMatch = await bcrypt.compare(password, user.password)
              if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

              const refresh_token = createRefreshToken({id: user._id})
              res.cookie('refreshtoken', refresh_token, {
                  httpOnly: true,
                  path: '/'+role+'/refresh_token',
                  maxAge: 7*24*60*60*1000 // 7 days
              })

              res.json({msg: "Login success!"})
          }else{
              if(role === properties.ROLES.ADMIN){
                const newAdmin = adminCtr.create({
                    name, email, password: passwordHash, avatar: picture
                })
                (await newAdmin).save
            }

            else if(role === properties.ROLES.LECTURER){
                const newLecturer = lecturerCtr.create({
                    name, email, password: passwordHash, avatar: picture
                })
                (await newLecturer).save
            }
            else if(role === properties.ROLES.STUDENT){
                const newStudent = studentCtr.create({
                    name, email, password: passwordHash, avatar: picture
                })
                (await newStudent).save
            }
              const refresh_token = createRefreshToken({id: newUser._id})
              res.cookie('refreshtoken', refresh_token, {
                  httpOnly: true,
                  path: '/'+role+'/refresh_token',
                  maxAge: 7*24*60*60*1000 // 7 days
              })

              res.json({msg: "Login success!"})
          }


      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  facebookLogin: async (req, res) => {
      try {
          const {accessToken, userID, role} = req.body

          const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`
          
          const data = await fetch(URL).then(res => res.json()).then(res => {return res})

          const {email, name, picture} = data

          const password = email + process.env.FACEBOOK_SECRET

          const passwordHash = await bcrypt.hash(password, 12)

          if(role === properties.ROLES.ADMIN)
            const user = await adminCtr.findAdminByEmail({email})

          else if(role === properties.ROLES.LECTURER)
            const user = await lecturerCtr.findLecturerByEmail({email})

          else if(role === properties.ROLES.STUDENT)
            const user = await studentCtr.findByStudentEmail({email})
            
          if(user){
              const isMatch = await bcrypt.compare(password, user.password)
              if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

              const refresh_token = createRefreshToken({id: user._id})
              res.cookie('refreshtoken', refresh_token, {
                  httpOnly: true,
                  path: '/'+role+'/refresh_token',
                  maxAge: 7*24*60*60*1000 // 7 days
              })

              res.json({msg: "Login success!"})
          }else{
                if(role === properties.ROLES.ADMIN){
                    const newAdmin = adminCtr.create({
                        name, email, password: passwordHash, avatar: picture.data.url
                    })
                    (await newAdmin).save
                }

                else if(role === properties.ROLES.LECTURER){
                    const newLecturer = lecturerCtr.create({
                        name, email, password: passwordHash, avatar: picture.data.url
                    })
                    (await newLecturer).save
                }
                else if(role === properties.ROLES.STUDENT){
                    const newStudent = studentCtr.create({
                        name, email, password: passwordHash, avatar: picture.data.url
                    })
                    (await newStudent).save
                }
              const refresh_token = createRefreshToken({id: newUser._id})
              res.cookie('refreshtoken', refresh_token, {
                  httpOnly: true,
                  path: '/'+role+'/refresh_token',
                  maxAge: 7*24*60*60*1000 // 7 days
              })

              res.json({msg: "Login success!"})
          }

      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  }
}


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = UserCtrl;
