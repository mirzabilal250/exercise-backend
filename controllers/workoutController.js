const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  const workouts = await Workout.find({user_id}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }
  
  res.status(200).json(workout)
}


// create new workout
const createWorkout = async (req, res) => {
  const {name, activity, duration, date, description} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!activity) {
    emptyFields.push('activity')
  }
  if(!duration) {
    emptyFields.push('duration')
  }
  if(!date) {
    emptyFields.push('date')
  }
  if(!description) {
    emptyFields.push('description')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const workout = await Workout.create({name, activity, duration, date, description, user_id})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  const {name, activity, duration, date, description} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!activity) {
    emptyFields.push('activity')
  }
  if(!duration) {
    emptyFields.push('duration')
  }
  if(!date) {
    emptyFields.push('date')
  }
  if(!description) {
    emptyFields.push('description')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

const searchWorkout = async (req, res) => {

  const { key } = req.params;
  const result = await Workout.find({
    "$or":[
      {name:{$regex:key}}
    ]
  });

  if (!result) {
    return res.status(404).json({error: 'No such workout'})
  }
  
  res.status(200).json(result);
  
}


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  searchWorkout
}