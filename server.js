const express = require("express");
const mongoose = require("mongoose");



const PORT = process.env.PORT || 3000

const app = express();



mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(require("./routes/views"))
app.use(require("./routes/twerkout"))




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  