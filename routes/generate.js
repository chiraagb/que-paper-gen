const queModel = require("./users");
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
}
async function generateQuestions(
  totalMarks,
  easyPercentage,
  mediumPercentage,
  hardPercentage
) {
  try {
    let totalM = easyPercentage + mediumPercentage + hardPercentage;
    if (totalM != totalMarks) {
      return ["Values dont add up to total"];
    } else {
      let easy_que = totalM - (mediumPercentage + hardPercentage);
      let medium_que = totalM - (easyPercentage + hardPercentage);
      let hard_que = totalM - (mediumPercentage + easyPercentage);
      let ret = [];
      let j = 0;
      //easy
      const [marks_hard, marks_medium, marks_easy] = await Promise.all([
        queModel.find({ difficulty: "hard" }),
        queModel.find({ difficulty: "medium" }),
        queModel.find({ difficulty: "easy" }),
      ]);
      shuffleArray(marks_easy);
      const marksArray_easy = marks_easy.map((question) => question.marks);
      let num_e = marksArray_easy.length;
      // console.log(easy_que, marksArray_easy, num_e);
      for (let i = 0; i < marksArray_easy.length; i++) {
        if (easy_que >= marksArray_easy[i] && num_e > 0) {
          ret[j] = marks_easy[i];
          easy_que -= marksArray_easy[i];
          num_e--;
          j++;
        } else {
        }
      }
      console.log(marksArray_easy.length);
      ret = ret.filter((element) => element !== null);
      // console.log(easy_que);

      //medium

      shuffleArray(marks_medium);
      const marksArray_medium = marks_medium.map((question) => question.marks);
      let num_m = marksArray_medium.length;
      for (let i = 0; i < marksArray_medium.length; i++) {
        if (medium_que >= marksArray_medium[i] && num_m > 0) {
          ret[j] = marks_medium[i];
          medium_que -= marksArray_medium[i];
          num_m--;
          j++;
        } else {
        }
      }
      // console.log(easy_que);
      console.log(marksArray_medium.length);
      ret = ret.filter((element) => element !== null);
      // return ret;
      //hard
      shuffleArray(marks_hard);
      const marksArray_hard = marks_hard.map((question) => question.marks);
      let num_h = marksArray_hard.length;
      for (let i = 0; i < marksArray_hard.length; i++) {
        if (hard_que >= marksArray_hard[i] && num_h > 0) {
          ret[j] = marks_hard[i];
          hard_que -= marksArray_hard[i];
          num_h--;
          j++;
        } else {
        }
      }
      console.log(marks_hard.length);
      ret = ret.filter((element) => element !== null);

      return ret;
    }
    // return marksArray;

    // return await queModel.find({ difficulty: "easy" });
    // return [totalMarks, easyPercentage, mediumPercentage, hardPercentage];
  } catch (error) {
    console.log("Questions cannot be generated...", error);
  }
}

module.exports = generateQuestions;
