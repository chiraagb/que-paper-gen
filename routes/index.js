var express = require("express");
var router = express.Router();
const queModel = require("./users");
const generateQuestions = require("./generate");

router.get("/", function (req, res, next) {
  res.render("index", { message: "Displaying The Home Page" });
});

router.get("/create-que", function (req, res, next) {
  res.render("create-que", { message: "Create More Unique Questions" });
});

router.get("/gen-que", function (req, res, next) {
  res.render("gen-que", { message: "Generate The Questions" });
});

router.post("/", async function (req, res) {
  let newQue = await queModel({
    question: req.body.question,
    subject: req.body.subject,
    topic: req.body.topic,
    difficulty: req.body.difficulty,
    marks: req.body.marks,
  });
  newQue
    .save()
    .then(() => {
      res.render("index", { message: "Created Questions Successfully..." });
    })
    .catch((err) => {
      res.render("error", { message: "Error while creating Questions..." });
    });

  // res.send("Created Questions Successfully..");
});

router.post("/gen-que", async function (req, res) {
  try {
    const totalMarks = parseInt(req.body.totalMarks);
    const easyPercentage = parseInt(req.body.easy);
    const mediumPercentage = parseInt(req.body.medium);
    const hardPercentage = parseInt(req.body.hard);

    const questionPaper = await generateQuestions(
      totalMarks,
      easyPercentage,
      mediumPercentage,
      hardPercentage
    );
    // console.log(totalMarks);
    // console.log(easyPercentage);
    // console.log(mediumPercentage);
    // console.log(hardPercentage);
    res.send(questionPaper);
  } catch (error) {
    res.render("error", { message: "Error in Generating Questions" });
  }
});

// router.get("/create", async function (req, res, next) {
//   const createdQue = await queModel.create({
//     question: "What is the speed of light?",
//     subject: "Physics",
//     topic: "Waves",
//     difficulty: "Easy",
//     marks: 5,
//   });
//   res.send(createdQue);
// });

// router.get("/allQue", async function (req, res, next) {
//   // let allQue = await queModel.find();
//   let allQue = await queModel.findOne({ subject: "Physics" });
//   // console.log(allQue); // We will get null if we don't have subject = Physics
//   res.send(allQue);
// });

module.exports = router;
