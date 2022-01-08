import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

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
  const auth = getAuth(app);

  const emailBox = document.querySelector('#email');
  const passwordBox = document.querySelector('#pwd');
  const signUpButton = document.querySelector('.sign-up-btn');
  const signInButton = document.querySelector('.login-btn');
  const signOutButton = document.querySelector('.logged-in-btn')
  const homeButton = document.querySelector('.h-log-in')
  const exit = document.querySelector('.x');
  const errorMessage = document.querySelector('.error-message');
  const toggleBtn = document.querySelector('.toggle-btn');
  const rightSide = document.getElementById('right-side');

  toggleBtn.addEventListener('click',function(){
    rightSide.classList.toggle('active');
  }
  );

  



 
  

  async function signUp(){
    const email = emailBox.value;
  const password = passwordBox.value;
      try{ 

       const userCredential = await createUserWithEmailAndPassword(auth,email,password);
       window.location.replace('pages/course.html'); // simulates a HTTP request so the user is not able to go back.
       console.log(userCredential.user);
      }

      catch (err){
        console.log(err);
          errorMessage.style.visibility="visible";
         
      }

   

  }


  async function signIn(){
    const email = emailBox.value;
  const password = passwordBox.value;
      try{ 

       const validUserCredential = await signInWithEmailAndPassword(auth,email,password);
       console.log(validUserCredential.user);
       window.location.replace('pages/course.html');
       
       
      }

      catch (err){
          console.log(err);

          errorMessage.style.visibility="visible";
          
      }

   

  }

function signOut(){
    window.location.replace('../index.html'); // when the sign out button is clicked,the user is re-assigned to the index page.
}


if(signUpButton){
signUpButton.addEventListener('click',signUp);


}


if(signInButton){

signInButton.addEventListener('click',signIn);

}

if(signOutButton){
signOutButton.addEventListener('click',signOut);
}

if(homeButton){
  homeButton.addEventListener('click',function(){
    window.location.href = 'login.html';
  })
}

if(exit){
  exit.addEventListener('click',function(){

    errorMessage.style.visibility="hidden";

  })
}