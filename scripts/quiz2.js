// Array to store Quiz questions, Options and Answers
const questions = [
    {
      question: "W Is Python case sensitive when dealing with identifiers?",
      optionA: "Yes",
      optionB: "No",
      optionC: "machine dependent",
      optionD: "None of the above",
      correctOption: "optionA",
    },
  
    {
      question: "Which of the following is invalid?",
      optionA: " _a = 1",
      optionB: " __a = 1",
      optionC: " __str__ = 1",
      optionD: "None of the above",
      correctOption: "optionD",
    },
  
    {
      question: "Which of the following is an invalid variable?",
      optionA: "my_string_1",
      optionB: "1st_string",
      optionC: "foo",
      optionD: "_",
      correctOption: "optionB",
    },
  
    {
      question: "Why are local variable names beginning with an underscore discouraged?",
      optionA: "they are used to indicate a private variables of a class",
      optionB: "they confuse the interpreter",
      optionC: "they are used to indicate global variables",
      optionD: "they slow down execution",
      correctOption: "optionA",
    },
  
    {
      question: "Which of the following is not a keyword?",
      optionA: "eval",
      optionB: "assert",
      optionC: "nonlocal",
      optionD: "pass",
      correctOption: "optionA",
    },
  
    {
      question: "All keywords in Python are in _________",
      optionA: "lower case",
      optionB: "UPPER CASE",
      optionC: "Capitalized",
      optionD: " None of the above",
      correctOption: "optionD",
    },
  
    {
      question: "Which of the following is true for variable names in Python?",
      optionA: "unlimited length",
      optionB: "all private members must have leading and trailing underscores",
      optionC: "underscore and ampersand are the only two special characters allowed",
      optionD: "None of the above",
      correctOption: "optionA",
    },
  
    {
      question: "Which of the following is an invalid statement?",
      optionA: " abc = 1,000,000",
      optionB: "a b c = 1000 2000 3000",
      optionC: "a,b,c = 1000, 2000, 3000",
      optionD: "a_b_c = 1,000,000",
      correctOption: "optionB",
    },
  
    {
      question: "Which of the following cannot be a variable?",
      optionA: " __init__",
      optionB: "in",
      optionC: "it",
      optionD: "on",
      correctOption: "optionB",
    },
  
    {
      question: `What is the maximum possible length of an identifier?`,
      optionA: "31 characters",
      optionB: "63 characters",
      optionC: "79 characters",
      optionD: "none of the mentioned",
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
  