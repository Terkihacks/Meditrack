const db = require('../config/dbSetup');

exports.createEnrollment = async (req, res) => {
    try {
        const { client_id, program_name } = req.body;
        const doctor_id = req.user.id; // from auth middleware

        // Validate inputs
        if (!client_id || !program_name) {
            return res.status(400).json({ message: 'Client ID and program name are required' });
        }

        // Check if client exists
        const [clientExists] = await db.execute(
            'SELECT id FROM clients WHERE id = ?', 
            [client_id]
        );

        if (clientExists.length === 0) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Check if program exists
        const [programExists] = await db.execute(
            'SELECT id FROM programs WHERE name = ?', 
            [program_name]
        );

        if (programExists.length === 0) {
            return res.status(404).json({ message: 'Program not found' });
        }

        // Create enrollment
        const [result] = await db.execute(
            'INSERT INTO enrollments (client_id, program_id, doctor_id) VALUES (?, ?, ?)',
            [client_id, programExists[0].id, doctor_id]
        );

        res.status(201).json({
            message: 'Enrollment created successfully',
            enrollment_id: result.insertId
        });

    } catch (error) {
        console.error('Error creating enrollment:', error);
        res.status(500).json({ message: 'Error creating enrollment' });
    }
};