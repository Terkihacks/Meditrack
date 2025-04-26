document.getElementById('registerUser').addEventListener('submit',async(event) =>{
    event.preventDefault();
//  first_name, last_name, date_of_birth,gender, email, phone
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const date_of_birth = document.getElementById('date_of_birth').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const phone  = document.getElementById('phone').value;

  try {
      // Make an Api Call
      const response = await fetch('http://localhost:4000/client/create-client', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ first_name, last_name, date_of_birth,gender, email, phone })
    });

    // Swal fire for success or error
    if(response.ok) {
        const data = await response.json();
        Swal.fire({
            icon: 'success',
            title: 'Client Created',
            text: data.message,
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.reload();
        });
    } else {
        const errorData = await response.json();
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorData.message,
            confirmButtonText: 'OK'
        });
    }

  } catch (error) {
    console.error('Error creating client:', error);
  }  
})

