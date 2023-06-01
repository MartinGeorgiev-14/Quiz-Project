const url = "http://localhost:3000/questions";
let answerQuestionGlobal = 0;
const mainContainerCreate = document.getElementById("mainContainerCreate");
const mainContainerEdit = document.getElementById("mainContainerEdit");
const answersContainer = document.getElementById("answersContainer");
const numberAnswers = document.getElementById("numberAns");
const question = document.getElementById("question");
const correctAnswerOptionDiv = document.getElementById("correctAnswerOption");
const correctAnsnwerOption = document.getElementById("correctAns");
const questionPoints = document.getElementById("questionPoints");
const saveButton = document.getElementById("saveButton");


// Creating Answers
numberAnswers.addEventListener("input", function(event)
{   
    removeNodes(answersContainer);
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

        append(answersContainer, containerLabel);    
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
            return displayQuestions(responseData);
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

// Displaying all questions in the database
function displayQuestions(question)
{

    let questionIndex = 0;
    
    question.forEach(element => {
        let editAnswerCounter = 1;

    
        const numOfAnsLabel = createNode("label");
        const numOfAnsParagraph = createNode("p");
        const numOfAnsInput = createNode("input");

        const questionTitleLabel = createNode("label");
        const questionTitleParagraph = createNode("p");
        const questionTitleInput = createNode("input");

        const itemContainer = createNode("div");

        const answerOptionPointsContainer = createNode("div");
        const correctAnsnwerLabel = createNode("label");
        const correctAnsnwerParagraph = createNode("p");
        const correctAnsnwerSelector = createNode("select");

        const pointsLabel = createNode("label");
        const pointsParagraph = createNode("p");
        const pointsInput = createNode("input");

        const infoContainer = createNode("div");
        const createdOnInfo = createNode("p");
        const editedAtInfo = createNode("p");
        const idInfo = createNode("p");

        const editSaveContainer = createNode("div");
        const editButton = createNode("input");
        const saveButton = createNode("input");

        itemContainer.setAttribute("id", "EditAnswersContainer")

        numOfAnsLabel.setAttribute("class", "listContainer");
        numOfAnsLabel.setAttribute("id", "numberOfAnswers");
        numOfAnsInput.setAttribute("type", "number");
        numOfAnsInput.setAttribute("disabled", "");

        questionTitleLabel.setAttribute("class", "listContainer");
        questionTitleLabel.setAttribute("id", "questionTitle");
        questionTitleInput.setAttribute("type", "text");
        questionTitleInput.setAttribute("disabled", "");
        

        answerOptionPointsContainer.setAttribute("id", "correctAnswerPointsOption");
        correctAnsnwerLabel.setAttribute("class", "listContainer");
        correctAnsnwerSelector.setAttribute("disabled", "");

        pointsLabel.setAttribute("class", "listContainer");
        pointsInput.setAttribute("type", "number");
        pointsInput.setAttribute("disabled", "");

        infoContainer.setAttribute("id", "info");

        editSaveContainer.setAttribute("id", "bottom");
        editButton.setAttribute("type", "button");
        editButton.setAttribute("value", "Edit");
        saveButton.setAttribute("type", "button");
        saveButton.setAttribute("value", "Save");
        saveButton.setAttribute("disabled", "");

        append(mainContainerEdit,itemContainer);

        append(itemContainer, numOfAnsLabel);
        append(numOfAnsLabel, numOfAnsParagraph);
        append(numOfAnsLabel, numOfAnsInput);

        append(itemContainer, questionTitleLabel);
        append(questionTitleLabel, questionTitleParagraph);
        append(questionTitleLabel, questionTitleInput);

       
        for(let i = 0; i < element.answers.length; i++)
        {
           
            const answerLabel = createNode("label");
            const answerParagraph = createNode("p");
            const answerInput = createNode("input");

            
            answerLabel.setAttribute("class", "listContainer");
            answerInput.setAttribute("type", "text");
            answerInput.setAttribute("name", "itemAnswer");
            answerInput.setAttribute("id", "itemAnswer" + i);
            answerInput.setAttribute("disabled", "");
            
            append(answerLabel, answerParagraph);
            append(answerLabel, answerInput);
            append(itemContainer, answerLabel);

            answerParagraph.innerHTML = "Answer " + editAnswerCounter; 
            answerInput.setAttribute("value", element.answers[i]);

            editAnswerCounter++;
        }

        editAnswerCounter = 1;

        append(itemContainer, answerOptionPointsContainer);
        append(answerOptionPointsContainer, correctAnsnwerLabel);
        append(correctAnsnwerLabel, correctAnsnwerParagraph);
        append(correctAnsnwerLabel, correctAnsnwerSelector);

        append(answerOptionPointsContainer, pointsLabel);
        append(pointsLabel, pointsParagraph);
        append(pointsLabel, pointsInput);

        for(let i = 0; i < element.answers.length; i++)
        {
            let num = element.correctAnswer + 1;
            const answerOption = createNode("option");

            answerOption.setAttribute("value", element.correctAnswer);

            append(correctAnsnwerSelector, answerOption);
            
            answerOption.innerHTML = "Answer " + num;
            
        }

        append(itemContainer, infoContainer);
        append(infoContainer, createdOnInfo);
        append(infoContainer, editedAtInfo);
        append(infoContainer, idInfo);

        append(itemContainer, editSaveContainer);
        append(editSaveContainer, editButton);
        append(editSaveContainer, saveButton);

        numOfAnsParagraph.innerHTML = "Number Of Answers";
        numOfAnsInput.value = element.answers.length;

        questionTitleParagraph.innerHTML = "Question";
        questionTitleInput.setAttribute("value", element.questionTitle);

        correctAnsnwerParagraph.innerHTML = "Correct answer";

        pointsParagraph.innerHTML = "Points";
        pointsInput.setAttribute("value", element.pointsGiven);

      
        createdOnInfo.innerHTML = "Created on: " + element.createdOn;
        editedAtInfo.innerHTML = "Edited on: " + element.editedOn;
        idInfo.innerHTML = "Id: " + element.id;
        

    });

   
}


//Posting a question in the database
async function postQuestion(url)
{
    const inputQuery = document.querySelectorAll("input[name=answer]");
    let arrAnswers = [];

    const dateNow = getNowDate();

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
        createdOn: dateNow,
        editedOn : "-"
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
            removeNodes(answersContainer);
            removeNodes(correctAnsnwerOption);
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

function getNowDate()
{
    const date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1; 
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
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

