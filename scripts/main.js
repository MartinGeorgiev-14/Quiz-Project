const url = "http://localhost:3000/questions";
const startButton = document.getElementById("start");
const mainContainer = document.getElementById("mainContainerMessage");
let earnedPoints = 0;
let totalPoints = 0;

// Removing the start menu
function startQuiz(){
        removeNodes(mainContainer);
        getQuestion(url);
}

// Displaying home
function displayHome()
{
    const headingMes = createNode("h1");
    const startButton = createNode("button");

    mainContainer.setAttribute("id", "mainContainerMessage");
    
    append(mainContainer, headingMes);
    append(mainContainer, startButton);

    headingMes.innerHTML = "Welcome to the quiz game";
    startButton.innerHTML = "Start";

    startButton.addEventListener("click", function(event)
    {
        startQuiz();
    })
}

// Displaying question
async function displayQuestion(question)
{
    const questionsLenght = Object.keys(question).length;

   for (let i = 0; i < questionsLenght; i++) 
   {

    let numberQuestion = 0;

    //Creating and appending the heading of the question and continue button
    const questionIndicator = createNode("div");
    const questionTitle = createNode("h2");
    const questionNum = createNode("p");
    const questionForm = createNode("form");
    const questionBottom = createNode("div");
    const questionPoints = createNode("p");
    const nextFnishButton = createNode("input");

    questionIndicator.setAttribute("id" , "top");
    questionBottom.setAttribute("id", "bottom");
    questionForm.setAttribute("id", "questionForm");
    nextFnishButton.setAttribute("id", "nextFinish");
    nextFnishButton.setAttribute("type", "submit");

    append(mainContainer, questionIndicator);
    append(questionIndicator, questionTitle);
    append(questionIndicator, questionNum);
    append(mainContainer, questionForm);
    append(mainContainer, questionBottom);
    append(questionBottom, questionPoints);
    append(questionBottom, nextFnishButton);

    questionTitle.innerHTML = question[i].questionTitle;
    questionNum.innerHTML = i+1 + "<span>/"+ questionsLenght + "</span>";
    questionPoints.innerHTML = "<span>Points: </span>" + question[i].pointsGiven;

    //Check if the answer is last or next
    nextOrFinish(nextFnishButton ,i, questionsLenght);

    //Creating and appending the question inputs
    question[i].answers.forEach(element => {
        
        const questionLabel = createNode("label");
        const radioInput = createNode("input");
        const questionText = createNode("p");

        radioInput.setAttribute("type", "radio");
        radioInput.setAttribute("id", "answer" + numberQuestion);
        radioInput.setAttribute("name", "question");
        radioInput.setAttribute("value", numberQuestion);
        questionLabel.setAttribute("class", "container");

        append(questionForm, questionLabel);
        append(questionLabel, radioInput);
        append(questionLabel, questionText);

        questionText.innerHTML = element;
        numberQuestion++;
    });

    
    await waitForClick(nextFnishButton);

    //Suming the points of the question
    const radioButtons = document.querySelectorAll('input[name="question"]')
    let selectedAnswer;
   
    for(const radioButton of radioButtons)
    { 
        if(radioButton.checked){
        selectedAnswer = radioButton.value;
        }
     
        if(selectedAnswer == question[i].correctAnswer)
        {
            earnedPoints = earnedPoints + question[i].pointsGiven;
            break;  
        }
           
    }
    
    totalPoints += question[i].pointsGiven;

    //Final answer check
    if(i+1 === questionsLenght)
    {
        removeNodes(mainContainer);
        displayResult()
        break;
    }

    removeNodes(mainContainer);
   }
}

// Displaying results
function displayResult()
{   
    const resultHeading = createNode("h1");
    const scoreDivContainer = createNode("div");

    const ulPoints = createNode("ul");
    const headPoints = createNode("li");
    const pointsPoints = createNode("li");

    const ulPercentage = createNode("ul");
    const headPercentage= createNode("li");
    const percentagePercentage = createNode("li");

    const ulGrade = createNode("ul");
    const headGrade= createNode("li");
    const gradeGrade = createNode("li");

    const divContainer = createNode("div");
    const restartButton = createNode("button");
    const homeButton = createNode("button");

    mainContainer.setAttribute("id", "mainContainerResult");
    scoreDivContainer.setAttribute("id", "score");
    divContainer.setAttribute("id", "buttonContainer");
    
    append(mainContainer, resultHeading);
    append(mainContainer, scoreDivContainer);

    append(scoreDivContainer, ulPoints);
    append(ulPoints, headPoints);
    append(ulPoints, pointsPoints);

    append(scoreDivContainer, ulPercentage);
    append(ulPercentage, headPercentage);
    append(ulPercentage, percentagePercentage);

    append(scoreDivContainer, ulGrade);
    append(ulGrade, headGrade);
    append(ulGrade, gradeGrade);

    append(mainContainer, divContainer);
    append(divContainer, homeButton);
    append(divContainer, restartButton);
  
    resultHeading.innerHTML = "Your Results";

    headPoints.innerHTML = "Points";
    pointsPoints.innerHTML = earnedPoints + " out of " + totalPoints;

    headPercentage.innerHTML = "Percentage";
    percentagePercentage.innerHTML = calculatePercentageScore() + " %";

    headGrade.innerHTML = "Grade";
    gradeGrade.innerHTML = getGrade();

    homeButton.innerHTML = "Home";
    restartButton.innerHTML = "Restart";

    homeButton.addEventListener("click", function(event)
    {   
        totalPoints = 0;
        earnedPoints = 0;
        removeNodes(mainContainer);
        displayHome();
    })

    restartButton.addEventListener("click", function(event)
    {
        totalPoints = 0;
        earnedPoints = 0;
        removeNodes(mainContainer);
        getQuestion(url);
    });

}

// Getting the data from data base
async function getQuestion(url)
{
    const response = await fetch(url);
    const responseData = await response.json();

    try 
    {
        if(response.ok)
        {
            mainContainer.setAttribute("id", "mainContainerQuestion");
            displayQuestion(responseData);
        }
        else
        {
            throw new Error(response.statusText);    
        }
    } 
    catch (error) 
    {   
        alert(error);
        console.log(error)
    }
}


function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function removeNodes(element){
    while(element.firstChild)
    {
        element.removeChild(element.firstChild);
    }
}

function waitForClick(button) {
    return new Promise((resolve) => {
      button.addEventListener('click', resolve);
    });
}

function calculatePercentageScore(){
    return Math.round((earnedPoints/totalPoints) * 100);
}

function calculatePercentage(x,y)
{
    return Math.round((x/y) * 100);
}

function getGrade()
{
   if(calculatePercentageScore() >= calculatePercentage(90,100))
   {
    return "Perfect";
   }
   else if(calculatePercentageScore() >= calculatePercentage(80,100))
   {
    return "Very Good";
   }
   else if(calculatePercentageScore() >= calculatePercentage(65,100))
   {
    return "Good";
   }
   else if(calculatePercentageScore() >= calculatePercentage(50,100))
   {
    return "Fine"
   }
   else
   {
    return "Poor";
   }
}

function nextOrFinish(button, current, lenght){

    if(current+1 === lenght)
    {
        button.setAttribute("value", "Finish");
    }
    else
    {
        button.setAttribute("value", "Next");
    }
}




