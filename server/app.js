const express = require('express');
const path = require('path')
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Middleware setup should come first
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Api Documentation using swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to Routes
const doctorRoute = require('./routes/doctorRoute');
const programRoute = require('./routes/programRoute');
const enrollmentRoute = require('./routes/enrollmentRoutes');
const clientRoute = require('./routes/clientRoute');

//Use Routes
app.use('/doctor', doctorRoute);
app.use('/program', programRoute);
app.use('/enrollment', enrollmentRoute);
app.use('/client', clientRoute);

app.use(express.static(path.join(__dirname, '../client')));

app.get('/',(request,response) =>{
    response.sendFile(path.join(__dirname,'../client/auth.html'));
  })
  
app.listen(process.env.PORT || 4500, () => {
    console.log(`Server running on port ${process.env.PORT || 4500}`);
    console.log('Medi Track API Docs available at http://localhost:4500/api-docs');
});

// http://localhost:4000/program/create-program
