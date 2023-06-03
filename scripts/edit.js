const url = "http://localhost:3000/questions";
const questionUrl = "http://localhost:3000/questions/";
let answerQuestionGlobal = 0;
let editAnswerQuestionGlobal = 0;
const navigationDiv = document.getElementById("top");
const mainContainerCreate = document.getElementById("mainContainerCreate");
const mainContainerEdit = document.getElementById("mainContainerEdit");
const answersContainer = document.getElementById("answersContainer");
const numberAnswers = document.getElementById("numberAns");
const question = document.getElementById("question");
const correctAnswerOptionDiv = document.getElementById("correctAnswerOption");
const correctAnsnwerOption = document.getElementById("correctAns");
const questionPoints = document.getElementById("questionPoints");
const saveButton = document.getElementById("saveButton");
const sortId = document.getElementById("sortId");
const sortCreatedDate = document.getElementById("sortCDate");
const sortEditDate = document.getElementById("sortEDate");
const sortPoints = document.getElementById("sortPoints");


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
            message = message + ", Answer " + parseInt(i + 1);
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
    else if(questionPoints.value < 1)
    {
        alert("The question must give at least 1 point");
        return;
    }

    postQuestion(url);
});

getQuestions(url);

//Sorting by id
let clickedSortId = false;
sortId.addEventListener("click", function(event)
{   //Checks how to sort
    if(clickedSortId)
    {   
        clickedSortId = false;
        sortQuestion("asc", "id", sortId)
    }
    else
    {   
        clickedSortId = true;
        sortQuestion("desc", "id", sortId)
    }
    //Setting the rest button to default settings
    clickedSortCDate = false;
    clickedSortEDate = true;
    clickedSortPoints = true;
});

//Sorting by Created date
let clickedSortCDate = false;
sortCreatedDate.addEventListener("click", function(event)
{   //Checks how to sort
    if(clickedSortCDate)
    {   
        clickedSortCDate = false;
        sortQuestion("asc", "createdOn", sortCreatedDate);
    }
    else
    {   
        clickedSortCDate = true;
        sortQuestion("desc", "createdOn", sortCreatedDate);
    }
    //Setting the rest button to default settings
    clickedSortId = true;
    clickedSortEDate = true;
    clickedSortPoints = true;
});

//Sorting by Edited date
let clickedSortEDate = true;
sortEditDate.addEventListener("click", function(event)
{   //Checks how to sort
    if(clickedSortEDate)
    {   
        clickedSortEDate = false;
        sortQuestion("asc", "editedOn", sortEditDate);
    }
    else
    {   
        clickedSortEDate = true;
        sortQuestion("desc", "editedOn", sortEditDate);
    }
    //Setting the rest button to default settings
    clickedSortId = true;
    clickedSortCDate = true;
    clickedSortPoints = true;
});

//Sorting by points
let clickedSortPoints = true;
sortPoints.addEventListener("click", function(event)
{   //Checks how to sort
    if(clickedSortPoints)
    {   
        clickedSortPoints = false;
        sortQuestion("asc", "pointsGiven", sortPoints);
    }
    else
    {   
        clickedSortPoints = true;
        sortQuestion("desc", "pointsGiven", sortPoints);
    }
    //Setting the rest button to default settings
    clickedSortId = false;
    clickedSortCDate = true;
    clickedSortEDate = true;
    
});

// Displaying all questions in the database
function displayQuestions(question)
{  
    
    removeNodes(mainContainerEdit);
    let questionIndex = 1;
    
    question.forEach(element => {
        let editAnswerCounter = 1;

        //Creating inputs for answers number and question title
        const numOfAnsLabel = createNode("label");
        const numOfAnsParagraph = createNode("p");
        const numOfAnsInput = createNode("input");

        const questionTitleLabel = createNode("label");
        const questionTitleParagraph = createNode("p");
        const questionTitleInput = createNode("input");

        const itemContainer = createNode("div");    //Creating div container for storing info for each question
        const answersContainer = createNode("div"); //Creating div container for storing all answers
        //Creating correct answer selector and points given input
        const answerOptionPointsContainer = createNode("div");
        const correctAnsnwerLabel = createNode("label");
        const correctAnsnwerParagraph = createNode("p");
        const correctAnsnwerSelector = createNode("select");

        const pointsLabel = createNode("label");
        const pointsParagraph = createNode("p");
        const pointsInput = createNode("input");
        //Creating info container
        const infoContainer = createNode("div");
        const createdOnInfo = createNode("p");
        const editedAtInfo = createNode("p");
        const idInfo = createNode("p");
        //Creating editing buttons
        const editSaveContainer = createNode("div");
        const editButton = createNode("button");
        const saveButton = createNode("button");
        const deleteButton = createNode("button");
        //Setting attributes to the div containers
        itemContainer.setAttribute("class", "itemContainer");
        answersContainer.setAttribute("class", "itemContainer");
        answersContainer.setAttribute("name", "ansContainer");
        //Setting attributes to inputs of answers number and question title
        numOfAnsLabel.setAttribute("class", "listContainer");
        numOfAnsLabel.setAttribute("id", "numberOfAnswers");
        numOfAnsInput.setAttribute("type", "number");
        numOfAnsInput.setAttribute("name", "top");
        numOfAnsInput.setAttribute("disabled", "");
        numOfAnsInput.style.cursor = "not-allowed";
        
        questionTitleLabel.setAttribute("class", "listContainer");
        questionTitleLabel.setAttribute("id", "questionLabel");
        questionTitleInput.setAttribute("type", "text");
        questionTitleInput.setAttribute("name", "question");
        questionTitleInput.setAttribute("disabled", "");
        questionTitleInput.style.cursor = "not-allowed";
        
        //Setting attribute for selector of correct answer and input of points given
        answerOptionPointsContainer.setAttribute("id", "correctAnswerPointsOption");
        correctAnsnwerLabel.setAttribute("class", "listContainer");
        correctAnsnwerSelector.setAttribute("disabled", "");
        correctAnsnwerSelector.style.cursor = "not-allowed";

        pointsLabel.setAttribute("class", "listContainer");
        pointsInput.setAttribute("type", "number");
        pointsInput.setAttribute("disabled", "");
        pointsInput.style.cursor = "not-allowed";
        //Setting attribute to info container
        infoContainer.setAttribute("id", "info");
        //Setting attributes to editing buttons
        editSaveContainer.setAttribute("id", "bottom");
        saveButton.setAttribute("disabled", "");
        editButton.setAttribute("value", element.id);
        saveButton.style.cursor = "not-allowed";
        saveButton.setAttribute("value", element.id);
        deleteButton.setAttribute("value", element.id);
        //Appending the each question container to the edit container
        append(mainContainerEdit,itemContainer);
        //Appending the inputs of answers number and question title
        append(itemContainer, numOfAnsLabel);
        append(numOfAnsLabel, numOfAnsParagraph);
        append(numOfAnsLabel, numOfAnsInput);
        
        append(itemContainer, questionTitleLabel);
        append(questionTitleLabel, questionTitleParagraph);
        append(questionTitleLabel, questionTitleInput);

       
        for(let i = 0; i < element.answers.length; i++)
        {
            //Creating each question answer
            const answerLabel = createNode("label");
            const answerParagraph = createNode("p");
            const answerInput = createNode("input");
            //Setting attributes to each question answer
            answerLabel.setAttribute("class", "listContainer");
            answerInput.setAttribute("type", "text");
            answerInput.setAttribute("name", "itemAnswer" + questionIndex);
            answerInput.setAttribute("disabled", "");
            answerInput.style.cursor = "not-allowed";
            //Appending the elements for each answer
            append(answerLabel, answerParagraph);
            append(answerLabel, answerInput);
            append(answersContainer, answerLabel);
            append(itemContainer, answersContainer);
            //Setting the data for each answer
            answerParagraph.innerHTML = "Answer " + editAnswerCounter; 
            answerInput.setAttribute("value", element.answers[i]);
            editAnswerCounter++;
        }

        editAnswerCounter = 1;

        //Appending the selector of correct answer and the input of given points
        append(itemContainer, answerOptionPointsContainer);
        append(answerOptionPointsContainer, correctAnsnwerLabel);
        append(correctAnsnwerLabel, correctAnsnwerParagraph);
        append(correctAnsnwerLabel, correctAnsnwerSelector);

        append(answerOptionPointsContainer, pointsLabel);
        append(pointsLabel, pointsParagraph);
        append(pointsLabel, pointsInput);

        for(let i = 0; i < element.answers.length; i++)
        {   //Creating each question answer an option
            const answerOption = createNode("option");
            //Setting attribute to each option
            answerOption.setAttribute("value", i);
            answerOption.setAttribute("name", "option");
            //Appending each option to the selector of correct answer
            append(correctAnsnwerSelector, answerOption);
            //Setting data for each option
            answerOption.innerHTML = "Answer " + editAnswerCounter;
            editAnswerCounter++;
        }
        //Appending the info container and edit buttons container
        append(itemContainer, infoContainer);
        append(infoContainer, createdOnInfo);
        append(infoContainer, editedAtInfo);
        append(infoContainer, idInfo);

        append(itemContainer, editSaveContainer);
        append(editSaveContainer, editButton);
        append(editSaveContainer, saveButton);
        append(editSaveContainer, deleteButton);
        //Setting data to inputs of answers number and question title
        numOfAnsParagraph.innerHTML = "Number Of Answers";
        numOfAnsInput.value = element.answers.length;

        questionTitleParagraph.innerHTML = "Question";
        questionTitleInput.setAttribute("value", element.questionTitle);
        //Setting data to selector of correct answer selector and input of given points
        correctAnsnwerParagraph.innerHTML = "Correct answer";
        correctAnsnwerSelector.selectedIndex = element.correctAnswer;

        pointsParagraph.innerHTML = "Points";
        pointsInput.setAttribute("value", element.pointsGiven);
        //Setting data to the info and edit buttons containers
        createdOnInfo.innerHTML = "Created on: " + element.createdOn;
        editedAtInfo.innerHTML = "Edited on: " + element.editedOn;
        idInfo.innerHTML = "Id: " + element.id;

        editButton.innerHTML = "Edit";
        saveButton.innerHTML = "Save";
        deleteButton.innerHTML = "Delete";
        
        //Enables to edit a certain question
        editButton.addEventListener("click", function(event)
        {
            saveButton.removeAttribute("disabled");
            saveButton.style.cursor = "pointer";
            editButton.setAttribute("disabled", "");
            deleteButton.setAttribute("disabled", "");
            editButton.style.cursor = "not-allowed";
            deleteButton.style.cursor = "not-allowed";


            let disable = itemContainer.querySelectorAll("input");
            
            correctAnsnwerSelector.removeAttribute("disabled");
            correctAnsnwerSelector.style.cursor = "";

            disable.forEach(element => {
                element.removeAttribute("disabled");
                element.style.cursor = "text";
            });
                
        });

        //Adds/Removes answer and option
        numOfAnsInput.addEventListener("input", function(event)
        {   
            let editAnswerCounter = 1;
            removeNodes(answersContainer);
            const currentQuestionIndex = element.id;
            for(let i = 0; i < numOfAnsInput.value; i++)
            {   
                const answerLabel = createNode("label");
                const answerParagraph = createNode("p");
                const answerInput = createNode("input");

                answerLabel.setAttribute("class", "listContainer");
                answerInput.setAttribute("type", "text");
                answerInput.setAttribute("name", "itemAnswer" + currentQuestionIndex);

                append(answerLabel, answerParagraph);
                append(answerLabel, answerInput);
                append(answersContainer, answerLabel);
                
                //Checks if there is a question in the database
                answerParagraph.innerHTML = "Answer " + editAnswerCounter;
                if(element.answers[i] != undefined)
                {
                    answerInput.setAttribute("value", element.answers[i]);
                }
                else
                {
                    answerInput.setAttribute("value", "");
                }
                editAnswerQuestionGlobal++;
                editAnswerCounter++;
            }

            editAnswerCounter = 1;
            removeNodes(correctAnsnwerSelector);
            for(let i = 0; i < numOfAnsInput.value; i++)
            {   
                let correctAnswerNum = element.answers.length + 1;

                const answerOption = createNode("option");

                answerOption.setAttribute("value", i);

                append(correctAnsnwerSelector, answerOption);

                answerOption.innerHTML = "Answer " + editAnswerCounter;
                editAnswerCounter++;
            }
            correctAnsnwerSelector.selectedIndex = element.correctAnswer;

        })

        questionIndex++;
        editAnswerCounter = 1;
        saveButton.addEventListener("click", function(event)
        {   
            let message = "";
            let isChecked = false;
            const inputQuery = document.querySelectorAll(`input[name=itemAnswer${saveButton.value}]`);

            editAnswerQuestionGlobal = numOfAnsInput.value;
            //Checking for the quantity of asnwers
            if(editAnswerQuestionGlobal < 2)
            {
                alert("You need to have at least 2 answers");
                return;
            }
            //Checking if there is a question
            if(!questionTitleInput.value)
            {
                alert("You must enter a question");
                return;
            }
            //Checking if all input fields are used
            for (let i = 0; i < inputQuery.length; i++) {
               
                if(!inputQuery[i].value)
                { 
                    message = message + ", Answer " + parseInt(i + 1);
                    isChecked = true;
                }
            }

            if(isChecked)
            {
                alert("Your questions: " + message + " are empty");
                return;
            }
            //Checking if there is entered quantity if points
            if(!pointsInput.value)
            {
                alert("Enter quantity of points above 1");
                return;
            }
            else if(pointsInput.value < 1)
            {
                alert("The question must give at least 1 point");
                return;
            }
            
            editButton.removeAttribute("disabled");
            saveButton.setAttribute("disabled", "");
            deleteButton.removeAttribute("disabled");

            let enable = itemContainer.querySelectorAll("input");
            
            correctAnsnwerSelector.setAttribute("disabled", "");

            enable.forEach(element => {
                element.setAttribute("disabled", "");
            });
            
            putQuestion(questionTitleInput, inputQuery, correctAnsnwerSelector, pointsInput, element.createdOn ,saveButton.value);
        });

        deleteButton.addEventListener("click", function(event)
        {
            deleteQuestion(questionUrl + deleteButton.value);
        });

    });
    
}

//Getting all questions for the database
async function getQuestions(url)
{
    
    const response = await fetch(url);
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

//Putting a question in the database
async function putQuestion(questionTitle, inputQuery, correctAnswer, pointsInput, createdOn, id)
{   
    let arrAnswers = [];

    inputQuery.forEach(function(input) {
        arrAnswers.push(input.value);
    });

    const dateNow = getNowDate();
   
    const data = {
        questionType : "oneAnswer",
        questionTitle: questionTitle.value,
        answers: arrAnswers,
        correctAnswer: parseInt(correctAnswer.value),
        pointsGiven: parseInt(pointsInput.value),
        createdOn: createdOn,
        editedOn: dateNow
    }
    try 
    {
        const response = await fetch(questionUrl + id, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

        if(response.ok)
        {
            getQuestions(url);
        }
    } catch (error) 
    {
            alert(error);
    }

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
            getQuestions(url);
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

async function deleteQuestion(deleteUrl)
{   
    try{
        const response = await fetch(deleteUrl, 
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            if(response.ok)
            {
                getQuestions(url);
            }
        }
        catch(error)
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

function removeNodesExeptFirstChild(parent, child)
{   
    for (var i = child.length - 1; i > 0; i--) {
        parent.removeChild(child[i]);
      }
}

function removeAttributeDisabled(element){
    while(element.firstChild)
    {
        element.removeAttribute("disabled");
    }
}

function sortQuestion(order, stat, button) {

    const iconRemover = navigationDiv.querySelectorAll("i");
    
    iconRemover.forEach(element => {
        element.remove();
    });

    if(order == "asc")
    {
        const removeIcon = button.querySelector("i");
        if(removeIcon)
        {
            removeIcon.remove();
        }
        const SortIcon = createNode("i");
    
        SortIcon.setAttribute("class", "fa-solid fa-sort-down");

        append(button, SortIcon);
    }
    else
    {
        const removeIcon = button.querySelector("i");
        if(removeIcon)
        {
            removeIcon.remove();
        }
       
        const SortIcon = createNode("i");

        SortIcon.setAttribute("class", "fa-solid fa-sort-up");

        append(button, SortIcon);

    }

    getQuestions(`${url}?_sort=${stat}&_order=${order}`);
}

function clickToDefault(clickBool)
{



}
