

const express = require('express')
const dbConnection = require('./database/db')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const dotenv = require('dotenv')

// express app
const app = express()
dotenv.config();


// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
dbConnection(username, password);

app.listen(process.env.PORT , () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})