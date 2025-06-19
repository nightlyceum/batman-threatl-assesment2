// Access the elements
document.addEventListener('DOMContentLoaded', function(){
  const accessCodeInput = document.getElementById('accessCodeInput');
  const accessCodeSubmit = document.getElementById('accessCodeSubmit');
  const respondMessage = document.getElementById('respondMessage');
  const accessCodeForm = document.getElementById('accessCodeform');
  const loginContainer = document.querySelector('.login-container');
  const batSignalAnimation = document.getElementById('batsignalAnimation');
  
//define the correct access code
  const correctAccessCode='212013114';
  
  // Add event listener to the submit button
  function performAccessCheck(){
    const userAnswer = accessCodeInput.value.trim();

    console.log("User Input (After Process):", userAnswer);
    console.log("Correct Access Code (Defined):", correctAccessCode);
    console.log("Respond Message Element", respondMessage);
    console.log("Login Container Element", loginContainer);

    if(userAnswer === correctAccessCode){
      respondMessage.textContent = "Access granted. Welcome, Detective.";
      respondMessage.style.color = "lightgreen";
      // Redirect to main.html after a short delay
      if(loginContainer) {
        loginContainer.style.opacity = '0';
        setTimeout(()=> {
          loginContainer.style.display = 'none';
          if (batSignalAnimation){
            batSignalAnimation.classList.remove('bat-signal-hidden');
            batSignalAnimation.classList.add('bat-signal-active');
          }
          setTimeout(()=> {
            window.location.href = "main.html";
          }, 3000);
        }, 1500);
      }
    } else {
      respondMessage.textContent = "Access Denied. Try again.";
      respondMessage.style.color = "red";
    }
    accessCodeInput.value = '';
  }

  // Prevent form submission and handle button click
  accessCodeForm.addEventListener('submit', function(event){
    event.preventDefault();
    performAccessCheck();
  });

  accessCodeSubmit.addEventListener('click', function(event){
    event.preventDefault();
    performAccessCheck();
  });

  accessCodeInput.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
      event.preventDefault();
      performAccessCheck();
    }
  });
});