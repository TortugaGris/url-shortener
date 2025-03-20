import express from "express";

const APP = express();
const PORT = 3000;

APP.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port "+ PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});

export default APP;
