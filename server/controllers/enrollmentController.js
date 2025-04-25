const db = require('../config/dbSetup');

exports.createEnrollment = async (req, res) => {
    try {
        const { client_id, program_id, doctor_id } = req.body;
        const [result] = await db.query(
            `INSERT INTO enrollments (client_id, program_id, doctor_id) 
             VALUES (?, ?, ?)`,
            [client_id, program_id, doctor_id]
        );
        
        res.status(201).json({
            message: "Enrollment created successfully",
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating enrollment", error: error.message });
    }
};