let globalQuestionCounter = 0;
const mainContainerCreate = document.getElementById("mainContainerCreate");
const numberAnswers = document.getElementById("numberAns");
const question = document.getElementById("question");
const correctAnswerOptionDiv = document.getElementById("correctAnswerOption");
const correctAsnwerOption = document.getElementById("correctAns");
const questionPoints = document.getElementById("questionPoints");
const saveButton = document.getElementById("saveButton");

const answerContainer = createNode("div");

answerContainer.setAttribute("id", "answersContainer");

mainContainerCreate.insertBefore(answerContainer, correctAnswerOptionDiv);

// Creating Answers
numberAnswers.addEventListener("input", function(event)
{   
    removeNodes(answerContainer);
    removeNodes(correctAsnwerOption);
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
        append(correctAsnwerOption, correctAsnwer);

        globalQuestionCounter++;
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

    if(globalQuestionCounter < 2)
    {
        alert("You need to have at least 2 answers");
        return;
    }

    if(!question.value)
    {
        alert("You must enter a question");
        return;
    }

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

})


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

