const showLoginBtn = document.getElementById('showLogin');
const showRegisterBtn = document.getElementById('showRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

showLoginBtn.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
});

showRegisterBtn.addEventListener('click', () => {
  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
});


document.getElementById('registerForm').addEventListener('submit', async (event) =>{
    event.preventDefault();
    //Get the form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    


    //add a try and catch error
    try{

      const docresp = await fetch('http://localhost:4000/doctor/create-doctor',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({name,email,password})
      });
      console.log(docresp)
       //Check if the response is not successful
       if(!docresp.ok){
        const responseData = await docresp.json();
        throw new Error(responseData.message);
    }
    // If successful, show the success alert
Swal.fire({
title: 'Success!',
text: 'Doctor account created successfully,Log in.',
icon: 'success',
confirmButtonText: 'OK'
})
    }
    catch(error){
      console.log(error);
      Swal.fire({
          title: 'Error creating an Account!',
          text: error.message ||'Your action was not successful.',
          icon: 'error',
          confirmButtonText: 'OK'
        });

    }
  })

  //Login a doctor

  document.getElementById('loginForm').addEventListener('submit', async function(e){

    e.preventDefault();
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;
     

    try{
      const response = await fetch('http://localhost:4000/doctor/login',{
        method:'POST',
        headers:{
             'Content-Type' : 'application/json'
        },
        body:JSON.stringify({email,password})
      });
      
      const responseData = await response.json();  
      console.log(responseData)
      if(!response.ok){
            throw new Error(responseData.message);
        }

      if(responseData.token){
      localStorage.setItem('token',responseData.token);
      
   }
       
  Swal.fire({
    title: 'Success!',
    text: 'Logged in successfully.',
    icon: 'success',
    confirmButtonText: 'OK' 
  });
window.location.href = 'dashboardpage.html';
 
}
catch(error){
        console.log(error);
        Swal.fire({
            title: 'Error logging into your Account!',
            text: error.message ||'Your action was not successful.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
    }

  })
