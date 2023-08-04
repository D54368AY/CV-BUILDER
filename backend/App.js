const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8899;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const db = "mongodb://localhost:27017/cvbuilder";
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();
//load routes

const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

app.use("/api/user", userRoutes);
app.use("/api/resume", resumeRoutes);
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Work on ${PORT}`);
});
