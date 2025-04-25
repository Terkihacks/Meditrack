const db = require('../config/dbSetup');

// Create a  health program
exports.createProgram = async (req, res) => {
    try{
        const {name, description} = req.body;
        // Check if the program already exists
       const[rows] = await db.execute('SELECT * FROM programs WHERE name = ?', [name]);
        if(rows.length > 0){
            return res.status(400).json({ message: 'Program already exists' });
        }
        // Insert the new program into the database
        const [result] = await db.execute('INSERT INTO programs (name, description) VALUES (?, ?)', [name, description]);
        res.status(201).json({ message: 'Program created successfully', 
            data: result
        });
        
    }catch(error){
        console.error('Error creating program:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}