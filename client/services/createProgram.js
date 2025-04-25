document.getElementById('createProgram').addEventListener('submit', async(event) => {
    event.preventDefault();
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 inline-block text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Creating Program...
    `;

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    try {
        // Show loading overlay
        // Swal.fire({
        //     title: 'Creating Program...',
        //     allowOutsideClick: false,
        //     showConfirmButton: false,
        //     willOpen: () => {
        //         Swal.showLoading();
        //     }
        // });

        const response = await fetch('http://localhost:4000/program/create-program', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        });

        // Close loading overlay
        Swal.close();

        if(response.ok) {
            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Program Created',
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
    } catch(error) {
        console.log('Error creating program:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred. Please try again.',
            confirmButtonText: 'OK'
        });
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});