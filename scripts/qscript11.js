const questions = [
  {
    question: "What is JavaScript?",
    optionA: "A markup language used for creating web pages.",
    optionB: "A database management system.",
    optionC: "An operating system",
    optionD: "None of these",
    correctOption: "optionA",
  },

  {
    question: "Which of the following is not a primitive data type in JavaScript?",
    optionA: "Number",
    optionB: "String",
    optionC: "Boolean",
    optionD: "Object",
    correctOption: "optionD",
  },

  {
    question: "What is the difference between == and === operators in JavaScript?",
    optionA: "== compares values and types while === compares only values.",
    optionB: "== compares only values while === compares values and types.",
    optionC: "There is no difference between == and ===.",
    optionD: "== is a logical operator while === is a bitwise operator.",
    correctOption: "optionB",
  },

  {
    question: "What is the output of the following code: console.log(typeof(`Hello World`));",
    optionA: "String",
    optionB: "Number",
    optionC: "Boolean",
    optionD:  "Undefined",
    correctOption: "optionA",
  },

  {
    question: "What is the output of the following code: var x = 5; console.log(x++);",
    optionA: "5",
    optionB: "6",
    optionC: "4",
    optionD: "Error",
    correctOption: "optionA",
  },

  {
    question: "What is the output of the following code: var x = null; console.log(typeof(x));",
    optionA: "Null",
    optionB: "Undefined",
    optionC: "Object",
    optionD: "String",
    correctOption: "optionC",
  },

  {
    question: "What is the output of the following code: var x = function() { return 2; }; console.log(x());",
    optionA: "1",
    optionB: "2",
    optionC: "Undefined",
    optionD: "Error",
    correctOption: "optionB",
  },

  {
    question: "What is the output of the following code: var obj = { name: `John`, age: 30 }; console.log(obj.name);",
    optionA: "John",
    optionB: "age",
    optionC: "30",
    optionD: "Undefined",
    correctOption: "optionA",
  },

  {
    question: "What is the output of the following code: document.querySelector(`.myClass`).innerHTML = `Hello World`;",
    optionA: " It sets the inner HTML of the first element with class `myClass` to `Hello World`.",
    optionB: "It sets the outer HTML of the first element with class `myClass` to `Hello World`.",
    optionC: "It creates a new HTML element with class `myClass` and sets its inner HTML to `Hello World`.",
    optionD: " It logs `Hello World` to the console.",
    correctOption: "optionA",
  },

  {
    question: "What is the output of the following code: var arr = [1,2,3]; console.log(arr[1]);",
    optionA: " 1",
    optionB: "2",
    optionC: "3",
    optionD: " Error",
    correctOption: "optionB",
  }
];

let shuffledQuestions = []; //empty array to hold shuffled selected questions out of all available questions
  
function handleQuestions() {
  //function to shuffle and push 10 questions to shuffledQuestions array
  while (shuffledQuestions.length <= 9) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random);
    }
  }
}

let questionNumber = 1; //holds the current question number
let playerScore = 0; //holds the player score
let wrongAttempt = 0; //amount of wrong answers picked by player
let indexNumber = 0; //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("display-question").innerHTML =
    currentQuestion.question;
  document.getElementById("option-one-label").innerHTML =
    currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML =
    currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML =
    currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML =
    currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]; //gets current Question
  const currentQuestionAnswer = currentQuestion.correctOption; //gets current Question's answer
  const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      //get's correct's radio input with correct answer
      correctOption = option.labels[0].id;
    }
  });

  //checking to make sure a radio input has been checked or an option being chosen
  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    alert("Please select an option");
  }

  //checking if checked radio button is same as answer
  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      document.getElementById(correctOption).style.backgroundColor = "green";
      playerScore++; //adding to player's score
      indexNumber++; //adding 1 to index so has to display next question..
      setTimeout(() => {
        questionNumber++;
      }, 1000);
      
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      document.getElementById(wrongLabelId).style.backgroundColor = "red";
      document.getElementById(correctOption).style.backgroundColor = "green";
      wrongAttempt++; //adds 1 to wrong attempts
      indexNumber++;
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
  });
}

//called when the next button is called
function handleNextQuestion() {
  checkForAnswer(); //check if player picked right or wrong option
  unCheckRadioButtons();
  //delays next question displaying for a second just for some effects so questions don't rush in on player
  setTimeout(() => {
    if (indexNumber <= 9) {
      //displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
      NextQuestion(indexNumber);
    } else {
      handleEndGame(); //ends game if index number greater than 9 meaning we're already at the 10th question
    }
    resetOptionBackground();
  }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = "";
  });
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

// function for when all questions being answered
function handleEndGame() {
  let remark = null;
  let remarkColor = null;

  // condition check for player remark and remark color
  if (playerScore <= 3) {
    remark = "Bad Grades, Keep Practicing.";
    remarkColor = "red";
  } else if (playerScore >= 4 && playerScore < 7) {
    remark = "Average Grades, You can do better.";
    remarkColor = "orange";
  } else if (playerScore >= 7) {
    remark = "Excellent, Keep the good work going.";
    remarkColor = "green";
  }
  const playerGrade = (playerScore / 10) * 100;

  //data to display to score board
  document.getElementById("remarks").innerHTML = remark;
  document.getElementById("remarks").style.color = remarkColor;
  document.getElementById("grade-percentage").innerHTML = playerGrade;
  document.getElementById("wrong-answers").innerHTML = wrongAttempt;
  document.getElementById("right-answers").innerHTML = playerScore;
  document.getElementById("score-modal").style.display = "flex";
}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
  questionNumber = 1;
  playerScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);
  document.getElementById("score-modal").style.display = "none";
}