const db = require('../config/dbSetup');

exports.createClient = async (req, res) => {
    try{
        const{first_name,last_name,date_of_birth,gender, email, phone} = req.body;
        // Check if the client already exists
        const [rows] = await db.execute('SELECT * FROM clients WHERE email = ?', [email]);
        if(rows.length > 0){
            return res.status(400).json({ message: 'Client already exists' });
        }
        // Insert the new client into the database
        const [result] = await db.execute('INSERT INTO clients (first_name, last_name, date_of_birth,gender, email, phone) VALUES (?, ?, ?, ?, ?, ?)',
             [first_name, last_name, date_of_birth,gender, email, phone]);
        res.status(201).json({ message: 'Client created successfully', data: result});
    }catch(error){
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
