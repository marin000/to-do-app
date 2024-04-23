# To Do App
The application for task management. 

- [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
- [![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
- [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)

## Installation

Install all dependencies in both directories, client and server. 
```bash
npm install
```
Setup your mongo database. 
You also need to have node installed.

## Configuration

### Client

| Environment Variable        | Description                                       | Example                         |
|-----------------------------|---------------------------------------------------|---------------------------------|
| `REACT_APP_BACKEND_SERVER`  | The URL for the server's API.                     | `http://localhost:3000`

### Server

| Environment Variable        | Description                                       | Example                         |
|-----------------------------|---------------------------------------------------|---------------------------------|
| `DB_URL`                    | Database connection url.                          | `mongodb+srv://user:password@cluster0.akmr6w4.mongodb.net/projectName?retryWrites=true&w=majority`
| `PORT`                      | Application port.                                 | `3000`
| `SMS_KEY`                   | Key for SMS service provider.                     | `Sms key`
| `SMS_HOSTNAME`              | Host for SMS service provider.                    | `Sms host`
| `SMS_FROM`                  | From whom the message comes.                      | `User/App/Company name`
| `SMS_DESTINATION`           | To whom we send the message.`                     | `Phone number`

## Run project

For server: 
```bash
npm run dev
```

For client: 
```bash
npm start
```

## To Do API
You can use swagger for api routes on http://localhost:3000/api-docs/#
