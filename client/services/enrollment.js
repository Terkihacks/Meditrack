ddocument.getElementById('enrollUser').addEventListener('submit',async(event) =>{
    event.preventDefault();
    
    enrollForm?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const clientId = document.getElementById('clientid').value;
        const programName = document.getElementById('program').value;

        // Validation
        if (!clientId || !programName) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Fields',
                text: 'Please fill in all required fields'
            });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await fetch('http://localhost:4000/enrollment/create-enrollment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    client_id: clientId,
                    program_name: programName
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to enroll client');
            }

            // Success message
            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Client enrolled successfully'
            });

            // Reset form
            enrollForm.reset();

        } catch (error) {
            console.error('Enrollment error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Enrollment Failed',
                text: error.message || 'An error occurred while enrolling the client'
            });
        }
    });
});