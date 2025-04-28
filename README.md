
# 🏥 Meditrack - Healthcare Management System

## 🎯 Overview
Meditrack streamlines healthcare information management with a modern web application.

## 🏗️ Project Structure
```
meditrack/
├── client/                # Frontend application
│   ├── services/         # API integration
└── server/              # Backend application
    ├── config/         # Configuration files
    ├── controllers/    # Request handlers
    ├── routes/         # API routes
```

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/Terkihacks/meditrack.git
cd meditrack

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```


# 🏥 Meditrack Server

## 🚀 Overview
Backend service for Meditrack healthcare management system built with Node.js and Express.

### 🛠️ Tech Stack
- Node.js
- Express.js
- MySQL
- CORS
- dotenv

## ⚙️ Setup

### Prerequisites
- Node.js v14+
- MySQL 8.0+
- npm/yarn

### Installation
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update environment variables
notepad .env
```

### Database Setup
```sql
CREATE DATABASE meditrack;
USE meditrack;

CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20)
);
```

## 📡 API Endpoints

### Client Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/client/create-client` | Create new client |
| GET | `/client/search` | Search clients |
| GET | `/client/profile/:clientId` | Get client profile |


## 🚀 Running the Server
```bash
nodemon app.js
```
# 💻 Meditrack Client

## 🚀 Overview
Frontend application for Meditrack healthcare management system.

### 🛠️ Tech Stack
- HTML5
- JavaScript (ES6+)
- Tailwind CSS
- SweetAlert2

## ⚙️ Setup

### Prerequisites
- VS Code
- Live Server extension

### Installation
```bash
# Install dependencies
npm install
```

## 🎯 Features

### 👥 Client Management
- Register new clients
- Search client database
- View client profiles


### 📋 Program Management
- Create health programs
- Enroll clients
- Track participation

  ## 🎥 Demo & Prototype
### Video Walkthrough
[![Meditrack Demo](https://img.youtube.com/vi/_21Es9l7F7w/0.jpg)](https://www.youtube.com/watch?v=_21Es9l7F7w)

Watch our complete system walkthrough and prototype demonstration on [YouTube](https://www.youtube.com/watch?v=_21Es9l7F7w).

### Features Demonstrated in Video
- 🔐 Doctor Authentication System
- 👥 Client Management Interface
- 🔍 Search Functionality
- 📋 Program Creation & Management
- ✅ Client Enrollment Process

## 📁 Project Structure
```
client/
├── services/          # API integration
│   ├── createClient.js
│   ├── searchClient.js
│   └── createProgram.js
├── styles/           # CSS styles
├── views/           # HTML templates
└── index.html       # Main entry point
```

## 🚀 Development
```bash
# Using VS Code run the code in the backend
nodemon app.js

```

## 🤝 Contributing
1. Fork repository
2. Create feature branch (`git checkout -b feature/Amazing`)
3. Commit changes (`git commit -m 'Add Amazing feature'`)
4. Push branch (`git push origin feature/Amazing`)
5. Open Pull Request

## 📝 License
MIT License

## 📞 Contact
- 📧 Email: raymondmunguti4894@gmail.com
- 🌐 Project: [GitHub Repository](https://github.com/Terkihacks/meditrack)
-

## 🙏 Acknowledgments
- Tailwind CSS
- SweetAlert2
- Express.js Community

---
Made with ❤️ by Raymond
