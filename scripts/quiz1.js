// Array to store Quiz questions, Options and Answers
const questions = [
    {
      question: "What is Python?",
      optionA: "A compiled language",
      optionB: "An interpreted language",
      optionC: "A hybrid language",
      optionD: "None of the above",
      correctOption: "optionB",
    },
  
    {
      question: "Which of the following is a data type in Python?",
      optionA: " List",
      optionB: "Dictionary",
      optionC: "Tuple",
      optionD: "All of the above",
      correctOption: "optionD",
    },
  
    {
      question: "What is the purpose of the if statement in Python?",
      optionA: "To create a loop",
      optionB: "To define a function",
      optionC: "To perform a conditional check",
      optionD: "None of the above",
      correctOption: "optionC",
    },
  
    {
      question: "Which of the following is a built-in function in Python?",
      optionA: "print()",
      optionB: "read()",
      optionC: "input()",
      optionD: "all of the above",
      correctOption: "optionA",
    },
  
    {
      question: "What is the output of the following code? \n my_list = [1, 2, 3, 4, 5] \n print(my_list[2])",
      optionA: "1",
      optionB: "2",
      optionC: "3",
      optionD: "4",
      correctOption: "optionC",
    },
  
    {
      question: "Which of the following is a loop statement in Python?",
      optionA: "for",
      optionB: "if",
      optionC: "switch",
      optionD: " None of the above",
      correctOption: "optionA",
    },
  
    {
      question: "Which of the following is a function in the math module in Python?",
      optionA: "sqrt()",
      optionB: "floor()",
      optionC: "ceil()",
      optionD: "All of the above",
      correctOption: "optionD",
    },
  
    {
      question: "Which of the following is used to define a function in Python?",
      optionA: "func",
      optionB: "function",
      optionC: "def",
      optionD: " define",
      correctOption: "optionC",
    },
  
    {
      question: "What is the difference between a tuple and a list in Python?",
      optionA: "A tuple is immutable, while a list is mutable.",
      optionB: "A list is immutable, while a tuple is mutable.",
      optionC: "Both a tuple and a list are mutable.",
      optionD: "Both a tuple and a list are immutable.",
      correctOption: "optionA",
    },
  
    {
      question: `"You Can't see me" is a popular saying by`,
      optionA: "Eminem",
      optionB: "Bill Gates",
      optionC: "Chris Brown",
      optionD: "John Cena",
      correctOption: "optionD",
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
  