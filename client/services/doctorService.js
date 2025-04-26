// Create a function to handle and submit the data
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");

const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

document.getElementById('docregisterForm').addEventListener('submit', async (event) =>{
    event.preventDefault();
    //Get the form data
    const first_name = document.getElementById('first_name').value;
    const last_name= document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const specialization = document.getElementById('specialization').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const gender = document.getElementById('gender').value;

    //add a try and catch error
    try{

      const docresp = await fetch('http://localhost:4000/doctor/register',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({first_name,last_name,email,specialization,phone,gender,password})
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

  document.getElementById('docloginForm').addEventListener('submit', async function(e){
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
window.location.href = '/Frontend/Dashboards/doctorDashboard.html'
 
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
