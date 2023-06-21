// Array to store Quiz questions, Options and Answers
const questions = [
    {
        question: "What is the output of the following code? x = 5  y = 3.0 z = `hello`  print(type(x))   print(type(y)) print(type(z))",
        optionA: "nt, int, str",
        optionB: "int, float, str",
        optionC: " float, float, str",
        optionD: "float, int, str",
        correctOption: "optionB"
    },

    {
        question: "What is the result of the following code? x = `5` y = 3  print(x + y) ",
        optionA: "8",
        optionB: 8,
        optionC: "53",
        optionD: "Error",
        correctOption: "optionD"
    },

    {
        question: "Which of the following is a valid Python boolean value?",
        optionA:  "True",
        optionB: "False",
        optionC: 1,
        optionD: 0,
        correctOption: "optionA"
    },

    {
        question: "What is the output of the following code? x = (1, 2, 3)  print(type(x)) ",
        optionA: " list",
        optionB: "Tuple",
        optionC: "Dictionary",
        optionD: "Set",
        correctOption: "optionB"
    },

    {
        question: "Which of the following is not a valid sequence type in Python?",
        optionA: " list",
        optionB: "Tuple",
        optionC: "Dictionary",
        optionD: "Set",
        correctOption: "optionD"
    },

    {
        question: "What is the output of the following code? x = 5 + 3j print(type(x)) ",
        optionA: "int",
        optionB: "float",
        optionC: "complex",
        optionD: "None of the above",
        correctOption: "optionC"
    },

    {
        question: "What is the output of the following code?x = `hello` print(x[1:4])",
        optionA:  "hlo",
        optionB: "ell",
        optionC:  "hel",
        optionD: "lo",
        correctOption: "optionB"
    },

    {
        question:' Which of the following is a valid way to convert a string to an integer in Python?',
        optionA: 'str(5)',
        optionB: 'float("5")',
        optionC: 'int("5")',
        optionD: 'list("5")',
        correctOption: "optionC"
    },

    {
        question: "What is the output of the following code?`x = [1, 2, 3]  y = x  x.append(4)  print(y) `",
        optionA: "[1, 2, 3]",
        optionB: "[1, 2, 3, 4]",
        optionC: "[4, 3, 2, 1]",
        optionD: "None of the above",
        correctOption: "optionB"
    },

    {
      question: "What is the output of the following code?`x = {'a': 1, 'b': 2, 'c': 3}  print(x.values())`",
      optionA: "[1, 2, 3]",
      optionB: "['a', 'b', 'c']",
      optionC: '["1", "2", "3"]',
      optionD: '{"a": 1, "b": 2, "c": 3}',
      correctOption: "optionA"
  }
    
];


let shuffledQuestions = []; //empty array to hold shuffled selected questions 
 
//function to shuffle and push 10 questions to shuffledQuestions array
function handleQuestions() {    
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
function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("display-question").innerHTML = currentQuestion.question;
  document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

// function for checking correct answers
function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]; //gets current Question
  const currentQuestionAnswer = currentQuestion.correctOption; //gets current Question's answer
  const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option'
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
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
      playerScore++; 
      indexNumber++; 
      setTimeout(() => {
        questionNumber++;
      }, 1000);
      
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      document.getElementById(wrongLabelId).style.backgroundColor = "red";
      document.getElementById(correctOption).style.backgroundColor = "green";
      wrongAttempt++; 
      indexNumber++;
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
  });
}

//called when the next button is called
function handleNextQuestion() {
  checkForAnswer(); 
  unCheckRadioButtons();
  setTimeout(() => {
    if (indexNumber <= 9) {
      //displays next question as long as index number isn't greater than 9.
      NextQuestion(indexNumber);
    } else {
      handleEndGame(); 
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

// unchecking all radio buttons for next question
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
