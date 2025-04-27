document.getElementById('enrollUser').addEventListener('submit',async(event) =>{
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
            console.log(localStorage.getItem('token'));

            const response = await fetch('http://localhost:4000/enrollment/create', {
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
            console.log(data);
            console.log(response)

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
            enrollUser.reset();

        } catch (error) {
            console.log('Enrollment error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Enrollment Failed',
                text: error.message || 'An error occurred while enrolling the client'
            });
        }
    });
