const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected successfully");

    app.listen(process.env.PORT || 8000, (error) => {
      if (error) console.log(error);

      console.log("connected successfully at", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("error", error);
  });

app.use("/api/user", userRoute);
