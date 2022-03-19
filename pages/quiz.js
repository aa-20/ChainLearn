import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getDatabase, ref, child, get  } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-performance.js";
import {getCLS, getFID, getLCP} from 'https://unpkg.com/web-vitals?module';

  

const firebaseConfig = {
    apiKey: "AIzaSyCPfilrGWJaFE-Bm5HutBi6gouLcUf4xIM",
    authDomain: "chainlearn-90a1a.firebaseapp.com",
    projectId: "chainlearn-90a1a",
    storageBucket: "chainlearn-90a1a.appspot.com",
    messagingSenderId: "357402957160",
    appId: "1:357402957160:web:de56efa082dc2cc0e332dd"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const perf = getPerformance(app);

  getCLS(console.log);
  getFID(console.log);
  getLCP(console.log);
  

  

  

async function getQuestions(){
    const dbRef = ref(getDatabase());
    try{
    const snapshot = await get(child(dbRef, `questions`))
        if (snapshot.exists){
            return snapshot.val();
        }
        else{
            console.log("No data available")
        }
    }
    catch(err){
        console.log(err);
    }
}


const questions = await getQuestions();


const quiz = document.querySelector('.quiz-form');
const body = document.querySelector('body');
const submitBtn = document.createElement('button');
const confirmPrompt = document.querySelector('.confirm-prompt')
const confirmButton = document.querySelector('.confirm-submit-btn');
const cancelButton = document.querySelector('.cancel-btn');
const results = document.querySelector('.results');
const retakeButton = document.querySelector('.retake-btn');
const exitButton = document.querySelector('.exit-quiz-btn');
const quizInfo = document.querySelector('.quiz-info');
const xit = document.querySelector('.confirm-x');






function displayQuestions(){
  quizInfo.style.display = "block";

    for (let i = 0; i < questions.length; i++){

        let pageContent = [];
        let options = []; // array to store the options for each question
        let answers = questions[i].answers;
        let question = questions[i].question;
       
        for(let character in answers){
          options.push(`
         
          
          
                <label >
                <div class="test">
                <input id="options" type="radio" name="question${i+1}" value="${character}"><div class="ans">${answers[character]}</div>
                </div>
                </label>
                
         
            ` )
            

       }
       pageContent.push(
           `<div class="card-divider"></div>
           <div class="question-number"> 
                ${i+1} 
           </div>
           <div class="question-wrapper">
           <div class="question">
           ${question}
           </div>
           <div class="options-wrapper"
           ${options.join('')}
           </div>
           </div>
           `
       )


    
quiz.innerHTML += pageContent.join('');   
     
}

}


displayQuestions();
const text = document.createTextNode("Submit");
submitBtn.appendChild(text);
submitBtn.classList.add("submit-btn");

const buttonWrapper = document.createElement('div');
buttonWrapper.appendChild(submitBtn);
buttonWrapper.classList.add("submit-btn-wrapper")

quiz.appendChild(buttonWrapper);

function checkAnswers(){
    quizInfo.style.display = "none";
    const choices = document.getElementsByClassName('options-wrapper');
    const question = document.getElementsByClassName('question');
    const questionsAnswered = document.querySelector('.questions-answered')
    const finalScore = document.querySelector('.score')
    let score = 0; 
    let nullCounter = 0;
    
   
    for (let i = 0; i < questions.length; i++){
        
        try{
        let answer = questions[i].correct_answer;
        let userAnswer = choices[i].querySelector('input[type="radio"]:checked').value;


         
         if(userAnswer == answer){
            choices[i].querySelector('input[type="radio"]:checked').parentElement.classList.add('correct-colour');
            
            choices[i].querySelector('input[type="radio"]:checked').parentElement.innerHTML+=`<div class="correct"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
          </svg></div>`;
           
            score++;
            
        }

        if(userAnswer != answer){
            choices[i].querySelector('input[type="radio"]:checked').parentElement.classList.add('incorrect-colour');

            choices[i].querySelector('input[type="radio"]:checked').parentElement.innerHTML+=`<div class="incorrect">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>`;
            
        }
    }
    catch(err){
        nullCounter++;
        
        choices[i].innerHTML+=`<div class="null-colour">
        <p>No answer<p>
        <div class="incorrect">
           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
          </div>`;
        
       
        

      
    }
        
        
    }
    questionsAnswered.textContent = `Questions Answered: ${question.length - nullCounter} out of ${questions.length} questions`
    finalScore.textContent = `Score Achieved: (${(score/question.length) * 100}  %)`;
}

submitBtn.addEventListener('click',function(){
    confirmPrompt.style.visibility="visible";

    body.style.overflow="hidden";

});







retakeButton.addEventListener('click',function(){
    location.reload();
});
exitButton.addEventListener('click',function(){
    window.location.href = 'quiz-start.html';

});

cancelButton.addEventListener('click',function(){
    confirmPrompt.style.visibility="hidden";
    
    body.style.overflow="scroll";
});

confirmButton.addEventListener('click',function(){
    
    checkAnswers();
    results.style.display="block";
    confirmPrompt.style.visibility="hidden";
    
    body.style.overflow="scroll";
    window.scrollTo(0, 0);
    submitBtn.style.display="none";


})

xit.addEventListener('click',function(){
    confirmPrompt.style.visibility="hidden";
    
    body.style.overflow="scroll";
});





