const router = require("express").Router();
const { Workout } = require("../model");

router.post("/api/workouts", ({ body }, res) => {
    console.log(body)
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        })
});


router.put("/api/workouts/:id", ({ body, params }, res) => {
    console.log(body)
    console.log(params)

    Workout.findByIdAndUpdate(params.id, { $push: { exercises: body }} )
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.status(400).json(err);
    })
});


router.get("/api/workouts/range", (req, res) => {

    Workout.aggregate( [ {
        $addFields: { 
        totalDuration: {
            $sum: '$exercises.duration'
        } }
    }]).sort({'date': -1}).limit(7)
    .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout)
    })
    .catch(err => {
        res.status(400).json(err);
    })
});
















module.exports = router