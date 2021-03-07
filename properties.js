module.exports = {
	Peacodove_db_dbUrl: (process.env.DB_HOST || 'localhost') + ':27017/Peacodove_db',
	port: process.env.NODE_PORT || 3000,
    tokenSecret: 'Insert Your Secret Token',
    api: process.env.NODE_API != null ? process.env.NODE_API : '/api', 
    ROLES:{
        PUBLIC: "anyone",
        ADMIN: "admin",
        STUDENT: "student",
        LECTURER: "lecturer"
    }
}