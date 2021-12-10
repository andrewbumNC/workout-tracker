const mongoose = require("mongoose");
const Schema = mongoose.Schema; 



const workoutSchema = new Schema({

    day: { 
        type: Date,
        default: Date.now
    },

    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Exercise is required"
        },
        name: {
            type: String,
            trim: true,
            required: "Name is required"
        },
        duration: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        reps: { 
            type: Number,
            required: true,
        },
        sets: { 
            type: Number,
            required: true,
        },
        distance: { 
            type: Number,
            required: true,
        }
    }]

});

const WorkOut = mongoose.model("workOut", workoutSchema)

module.exports = WorkOut