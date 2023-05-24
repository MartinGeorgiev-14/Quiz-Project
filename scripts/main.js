const url = "http://localhost:3000/questions";
const startButton = document.getElementById("start");
const mainContainer = document.getElementById("mainContainerMessage");
let totalPoints = 0;

// Removing the start menu
function startQuiz(){
        removeNodes(mainContainer);
        mainContainer.setAttribute("id", "mainContainerQuestion");
        getQuestion(url);
}

// Displaying question
async function displayQuestion(question)
{
    const questionsLenght = Object.keys(question).length;
    
    let i = 0;
   for (let i = 0; i < questionsLenght; i++) 
   {
    let numberQuestion = 0;

    console.log(i);
    const topHead = createNode("div");
    const questionTitle = createNode("h2");
    const questionNum = createNode("p");
    const questionForm = createNode("form");
    const nextFnishButton = createNode("button");
    
    topHead.setAttribute("id" , "top");
    questionForm.setAttribute("id", "questionForm");
    nextFnishButton.setAttribute("id", "nextFinish");

    append(mainContainer, topHead);
    append(topHead, questionTitle);
    append(topHead, questionNum)
    append(mainContainer, questionForm);
    append(mainContainer, nextFnishButton);

    questionTitle.innerHTML = question[i].questionTitle;
    questionNum.innerHTML = i+1 + "/" + questionsLenght;
    nextFnishButton.innerHTML = "Next";

    question[i].answers.forEach(element => {
        
        const questionLabel = createNode("label");
        const radioInput = createNode("input");
        const questionText = createNode("p");

        radioInput.setAttribute("type", "radio");
        radioInput.setAttribute("id", "answer" + numberQuestion);
        radioInput.setAttribute("name", "radio");
        questionLabel.setAttribute("class", "container");

        append(questionForm, questionLabel);
        append(questionLabel, radioInput);
        append(questionLabel, questionText);

        questionText.innerHTML = element;
        numberQuestion++;
    });

    await waitForClick(nextFnishButton);
    

    removeNodes(mainContainer);

   }
}


function waitForClick(button) {
    return new Promise((resolve) => {
      button.addEventListener('click', resolve);
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
            displayQuestion(responseData);
        }
        else
        {
            throw new Error(response.statusText);    
        }
    } 
    catch (error) 
    {
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



