const db = require('../config/dbSetup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register Doctor
exports.createDoctor = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if doctor already exists
        const [existingDoctor] = await db.execute('SELECT * FROM doctors WHERE email = ?', [email]);
        if (existingDoctor.length > 0) {
            return res.status(400).json({ message: 'Doctor already exists with this email' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new doctor
        const [result] = await db.execute(
            'INSERT INTO doctors (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: 'Doctor registered successfully',
            doctorId: result.insertId
        });

    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login Doctor
exports.loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if doctor exists
        const [doctors] = await db.execute('SELECT * FROM doctors WHERE email = ?', [email]);
        if (doctors.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const doctor = doctors[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: doctor.id,
                name: doctor.name,
                email: doctor.email
            },
            process.env.JWT_SECRET_KEY,
            { 
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            doctor: {
                id: doctor.id,
                name: doctor.name,
                email: doctor.email,
                created_at: doctor.created_at
            }
        });

    } catch (error) {
        console.error('Error logging in doctor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

