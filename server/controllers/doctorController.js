const db = require('../config/dbSetup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createDoctor = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone } = req.body;
        // Check if the doctor already exists
        const [rows] = await db.execute('SELECT * FROM doctors WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert the new doctor into the database
        const [result] = await db.execute('INSERT INTO doctors (first_name, last_name, email, password, phone) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, email, hashedPassword, phone]);
        // return the created doctor details
        res.status(201).json({message:'Doctors created successfully'})
        
    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(500).json({ message: 'Internal server error' });        
    }
}
// Login doctor

exports.loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the doctor exists
        const [rows] = await db.execute('SELECT * FROM doctors WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const doctor = rows[0];
        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate a JWT token
        const token = jwt.sign(
            {
                 id: doctor.id,
                 name:doctor.first_name,
            },
             process.env.JWT_SECRET, 
             {
                 expiresIn: '1h'
             });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in doctor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
        
   