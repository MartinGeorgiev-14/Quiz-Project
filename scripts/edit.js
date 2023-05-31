const url = "http://localhost:3000/questions";
let answerQuestionGlobal = 0;
const mainContainerCreate = document.getElementById("mainContainerCreate");
const numberAnswers = document.getElementById("numberAns");
const question = document.getElementById("question");
const correctAnswerOptionDiv = document.getElementById("correctAnswerOption");
const correctAnsnwerOption = document.getElementById("correctAns");
const questionPoints = document.getElementById("questionPoints");
const saveButton = document.getElementById("saveButton");


const answerContainer = createNode("div");

answerContainer.setAttribute("id", "answersContainer");

mainContainerCreate.insertBefore(answerContainer, correctAnswerOptionDiv);

// Creating Answers
numberAnswers.addEventListener("input", function(event)
{   
    removeNodes(answerContainer);
    removeNodes(correctAnsnwerOption);
    let answerNum = 1;

    for (let i = 0; i < numberAnswers.value; i++) {
        
        const containerLabel = createNode("label");
        const answerTitle = createNode("p");
        const answerInput = createNode("input");
        const correctAsnwer = createNode("option");

        containerLabel.setAttribute("class", "container");
        answerInput.setAttribute("type", "text");
        answerInput.setAttribute("id", "answer" + i);
        answerInput.setAttribute("name", "answer");        
        correctAsnwer.setAttribute("value", i);
       

        answerTitle.innerHTML = "Answer " + answerNum;
        correctAsnwer.innerHTML = "Answer " + answerNum;

        append(answerContainer, containerLabel);    
        append(containerLabel, answerTitle);
        append(containerLabel, answerInput);
        append(correctAnsnwerOption, correctAsnwer);

        answerQuestionGlobal++;
        answerNum++;
    }
});

// Saving the question to the database
saveButton.addEventListener("click", function(event)
{
    event.preventDefault();
    let message = "";
    let isChecked = false;
    let answerNum = 1;
    const inputQuery = document.querySelectorAll("input[name=answer]");
   
    //Checking for the quantity of asnwers
    if(answerQuestionGlobal < 2)
    {
        alert("You need to have at least 2 answers");
        return;
    }
    //Checking if there is a question
    if(!question.value)
    {
        alert("You must enter a question");
        return;
    }
    //Checking if all input fields are used
    for (let i = 0; i < inputQuery.length; i++) {

    
        if(!inputQuery[i].value)
        { 
            message = message + ", Answer " + answerNum;
            answerNum++;
            isChecked = true;
        }
    }

    if(isChecked)
    {
        alert("Your questions: " + message + " are empty");
        return;
    }
    //Checking if there is entered quantity if points
    if(!questionPoints.value)
    {
        alert("Enter quantity of points above 1");
        return;
    }
    else if(questionPoints.value < 2)
    {
        alert("The question must give at least 1 point");
        return;
    }

    postQuestion(url);
})

getQuestions();
//Getting all questions
async function getQuestions(arl = "http://localhost:3000/questions")
{
    
    const response = await fetch(arl);
    const responseData = await response.json();

    try 
    {
        if(response.ok)
        {
            return getQuestions(responseData);
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


function displayQuestions(question)
{
    question.forEach(element => {
        
        const itemContainerDiv = createNode("div");

        const numOfAnsLabel = createNode("label");
        const numOfAnsParagraph = createNode("p");
        const numOfAnsInput = createNode("input");

        const questionTitleLabel = createNode("label");
        const questionTitleParagraph = createNode("p");
        const questionTitleInput = createNode("input");

        console.log(element.answers.length);

        for(const i = 0; i < element.answers.length; i++)
        {

        }

    });

   
}


//Posting a question in the database
async function postQuestion(url)
{
    const inputQuery = document.querySelectorAll("input[name=answer]");
    let arrAnswers = [];

    inputQuery.forEach(function(input) {
        arrAnswers.push(input.value);
    });
    
    const data = 
    {
        questionType: "oneAnswer",
        questionTitle: question.value,
        answers: arrAnswers,
        correctAnswer : parseInt(correctAnsnwerOption.value),
        pointsGiven : parseInt(questionPoints.value),
        createdOn: new Date(),
        editedAt : ""
    }

    try 
    {
        const response = await fetch(url, 
        {
            method: "POST",
            headers: 
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        if(response.ok)
        {
            mainContainerCreate.reset();
        }
        else
        {
            throw new Error(response.statusText);
        }
    } catch (error)
    {
        alert(error);
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

