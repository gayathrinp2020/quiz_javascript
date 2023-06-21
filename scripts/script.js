// Fuction invoked when navigation tab is called

function tabContent(evt, tabid) {  
    localStorage.setItem('tab-', tabid);
    localStorage.setItem('right-',tabid);
    var tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active","");
    }
    document.getElementById('tab-' + tabid).style.display = "flex";
     document.getElementById('description-'+ tabid).style.display = "block";
    evt.currentTarget.className += " active";  

    var loadedIframe = document.getElementById("activeIframe");
    if(document.body.contains(loadedIframe)){
        loadedIframe.remove();
    }
    }

    // Fuction  invoked when vertical tabs were selected(Quiz Selection)

function QuizContent(evt, tabidh,tabidv, filename) {
    localStorage.setItem('tabv-', tabidv);
    var tablinks = document.getElementsByClassName("tabv");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }   
    evt.currentTarget.className += " active";       
    document.getElementById('description-'+ tabidh).style.display = "none"; 
    var loadedIframe = document.getElementById("activeIframe");
    if(document.body.contains(loadedIframe)){
        loadedIframe.remove();
    } 
    var div = document.getElementById("right-"+ tabidh);
    let currentIframe = document.createElement("iframe");
    currentIframe.src = filename;
    currentIframe.id = "activeIframe";
    currentIframe.style.width = '100%';
    currentIframe.style.height = '100%';
    currentIframe.style.border = 'none';
    div.appendChild(currentIframe); 

    localStorage.setItem("activeIframe",currentIframe);
    localStorage.setItem('tabv-', tabidv);

    // Store the selected quiz ID in sessionStorage
  sessionStorage.setItem("selectedQuizId", tabidv);
  // Store the selected quiz file in sessionStorage
  sessionStorage.setItem("selectedQuizFile", filename);
  // Load the quiz page
  loadQuizContent(quizfile);
   }  

// Default Navigation Tab
    const currentTab = localStorage.getItem('tab-') ? localStorage.getItem('tab-') : 1;
    document.getElementById('tab-button-' + currentTab).classList.add('active');
    document.getElementById('tab-' + currentTab).style.display = 'flex';

// const currentTabv = localStorage.getItem('tabv-') ? localStorage.getItem('tabv-') : 1;
// document.getElementById('tabv-' + currentTab).classList.add('active');

// const currentRight = localStorage.getItem('right-') ? localStorage.getItem('right-') : 1;
// document.getElementById('right-' + currentTab).classList.add('active')


//active iframe on reload
// if(!(localStorage.getItem("activeiframe") === null)){
//     const currentRight = localStorage.getItem('right-') ? localStorage.getItem('right-') : 1;
//     var div = document.getElementById("right-"+ currentRight);
//     let currentIframe = document.createElement("iframe");
//     currentIframe.src = localStorage.getItem("activeiframe");
//     currentIframe.id = "activeIframe";
//     currentIframe.style.width = '100%';
//     currentIframe.style.height = '100%';
//     currentIframe.style.border = 'none';
//     if(document.body.contains(div)){
//        div.appendChild(currentIframe);  
//     }
// }

// const outerTabButtons = document.querySelectorAll('.tab');
// const outerTabContents = document.querySelectorAll('.tabcontent');
// const innerTabButtons = document.querySelectorAll('.tabv');
// const innerTabContents = document.querySelectorAll('.right');

// // Add event listeners to outer tab buttons
// outerTabButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//     // Remove active class from all other tab buttons and content divs
//     outerTabButtons.forEach((btn) => btn.classList.remove('active'));
//     outerTabContents.forEach((content) => content.classList.remove('active'));

//     // Add active class to clicked tab button and corresponding content div
//     button.classList.add('active');
//     const contentId = button.getAttribute('id').replace('tab-', 'tabcontent');
//     document.getElementById(contentId).classList.add('active');
//   });
// });

// // Add event listener to outer tab content div to handle inner tab clicks
// outerTabContents.forEach((content) => {
//   content.addEventListener('click', (event) => {
//     // Check if a inner tab button was clicked
//     if (event.target.classList.contains('inner-tab-button')) {
//       // Remove active class from all other inner tab buttons and content divs
//       innerTabButtons.forEach((btn) => btn.classList.remove('active'));
//       innerTabContents.forEach((innerContent) => innerContent.classList.remove('active'));

//       // Add active class to clicked inner tab button and corresponding content div
//       event.target.classList.add('active');
//       const contentId = event.target.getAttribute('id').replace('inner-tab', 'inner-tab-content');
//       document.getElementById(contentId).classList.add('active');
//     }
//   });
// });
  
//Responsive navigation
        // var dropdownBtn = document.querySelector(".dropdown-btn");
        // var dropdownContent = document.querySelector(".dropdown-content");
        
        // dropdownBtn.addEventListener("click", function() {
        //   dropdownContent.classList.toggle("show");
        // });
              


       // Function to load the quiz content into a div
function loadQuizContent(quizfile) {
  // Create an XMLHttpRequest object
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // Retrieve the div where the quiz content will be loaded
      var quizContainer = document.getElementById("quizContainer");
      // Set the innerHTML of the div to the quiz content
      quizContainer.innerHTML = this.responseText;
    }
  };
  // Send a GET request to fetch the quiz content
  xhttp.open("GET", quizfile, true);
  xhttp.send();
}

// Function to initialize the page
function initializePage() {
  // Retrieve the selected quiz ID and quiz file from sessionStorage
  var selectedQuizId = sessionStorage.getItem("selectedQuizId");
  var selectedQuizFile = sessionStorage.getItem("selectedQuizFile");

  if (selectedQuizId && selectedQuizFile) {
    // Restore the selected quiz by simulating the button click
    var quizButton = document.getElementById("tabv-" + selectedQuizId);
    if (quizButton) {
      quizButton.click();
    }
  }
}

// Add an event listener to execute the initialization on page load
window.addEventListener("load", initializePage);
        
        

// sliding tab scripts
document.addEventListener("DOMContentLoaded", function() {
  var tabContainer = document.querySelector(".tab-container");
  var tabWrapper = document.querySelector(".nav-group");
  var prevButton = document.querySelector(".prev-button");
  var nextButton = document.querySelector(".next-button");
  var tabItems = Array.from(document.querySelectorAll("li"));
  var currentIndex = 0;

  prevButton.addEventListener("click", function() {
    currentIndex--;
    slideToCurrentIndex();
  });

  nextButton.addEventListener("click", function() {
    currentIndex++;
    slideToCurrentIndex();
  });

  function slideToCurrentIndex() {
    var totalWidth = tabWrapper.scrollWidth;
    var containerWidth = tabContainer.offsetWidth;
    var slideWidth = 0;

    if (currentIndex < 0) {
      currentIndex = tabItems.length - 1;
      slideWidth = totalWidth - containerWidth;
    } else if (currentIndex >= tabItems.length) {
      currentIndex = 0;
    } else {
      slideWidth = tabItems[currentIndex].offsetLeft;
    }

    tabWrapper.style.transform = "translateX(-" + slideWidth + "px)";
  }

  window.addEventListener("resize", function() {
    // Adjust slide position on window resize
    slideToCurrentIndex();
  });
});