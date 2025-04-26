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

//Search Client
exports.searchClient = async (req, res) => {
    const { query } = req.query;
  
    if (!query) return res.status(400).json({ message: 'Search query is required' });
  
    try {
      const [results] = await db.query(`
        SELECT * FROM clients 
        WHERE first_name LIKE ? 
           OR last_name LIKE ? 
           OR email LIKE ? 
           OR id = ?
      `, [`%${query}%`, `%${query}%`, `%${query}%`, query]);
  
      res.json(results);
    } catch (err) {
      res.status(500).json({ message: 'Error searching clients', error: err.message });
    }
  };

  //Get client profile details
exports.getClientProfile = async (req, res) => {
    const { clientId } = req.params;
  
    if (!clientId) return res.status(400).json({ message: 'Client ID is required' });
  
    try {
      const [results] = await db.query(`
        SELECT * FROM clients 
        WHERE id = ?
      `, [clientId]);
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Client not found' });
      }
  
      res.json(results[0]);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching client profile', error: err.message });
    }
  };
  