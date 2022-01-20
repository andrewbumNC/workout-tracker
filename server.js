const express = require("express");
const mongoose = require("mongoose");



const PORT = process.env.PORT || 3002

const app = express();



mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(require("./routes/views"))
app.use(require("./routes/twerkout"))




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  