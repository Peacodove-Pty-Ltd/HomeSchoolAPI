# HomeSchool-Backend
This is a backend project that serves [homeschool.com](https://homeschoolweb.netlify.app/) that is at the [homeschoolweb repository](https://github.com/Peacodove-Pty-Ltd/HomeSchoolWeb)

![Travis (.org)](https://img.shields.io/travis/Peacodove-Pty-Ltd/HomeSchoolAPI?style=plastic)

## Background
This project is the backend of the [homeschool.com](https://homeschoolweb.netlify.app/), an E-Learning Management System that helps learners and teachers effectively carry out online education. 

## Install
This project uses `node`, `MongoDB` and `yarn`. If you're new to these technologies, please find it important to familiarize with these tools before attempting to contribute.
You will need to have [node](https://nodejs.org/en/download/), [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) and [mongo](https://www.mongodb.com/try/download/community) installed on you local dev machine in order to have a flawless working environment.

After installing node and mongo, copy the repository on your local machine, in your projects' folder,  by running the following command.

```sh
git clone https://github.com/Peacodove-Pty-Ltd/HomeSchoolAPI.git
```
This will create a directory called `HomeSchoolAPI` and download the contents of this repo to it.

## Configuration
In your projects folder, open terminal and run the following commands
```sh
cd HomeSchoolAPI
```
This takes you to the project root directory
```sh
yarn install
```
this will install all the necessary dependencies

In the root directory, creat a `.env` file to and assign it the following parameters;
```text
PORT = < replace with port number that will be used on your local host server>
MONGO_URI = <replace with URI to local Mongo database>
```
once the `.env` file is created, save it and go back to your terminal and run the following command
```sh
yarn start
```
this starts your server on `localhost:<PORT_NUMBER>`

## Usage
After making neccesary changes to the project in your own branch, `commit`, `push` and `create a pull request` on github

## Contribute
We welcome issues, questions, and pull requests.

## Maintainers
- [Enock Kasaadha](https://github.com/EKaxada)
- [Joshua Nsereko](https://github.com/jnsereko)

## License
This project is licensed under the terms of the MIT open source license. Please refer to LICENSE for the full terms.
