const router = require("express").Router();
const WorkOut = require("../model/workout");

router.post("api/workout", ({ body }, res) => {
    WorkOut.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        })
});



module.exports = router