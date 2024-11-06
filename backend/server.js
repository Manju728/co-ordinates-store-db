const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // replace with your MySQL username
  password: 'Manju@728',  // replace with your MySQL password
  database: 'coordinates_db',  // replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create the table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS coordinates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    x INT NOT NULL,
    y INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

db.query(createTableQuery, (err, result) => {
  if (err) throw err;
  console.log('Coordinates table ensured');
});
app.get(' ',(req,res)=> {
    console.log('Inserting co-ordinates');
});
// POST endpoint to save coordinates
app.post('/api/coordinates', (req, res) => {
  const { x, y } = req.body;
  const query = 'INSERT INTO coordinates (x, y) VALUES (?, ?)';

  db.query(query, [x, y], (err, result) => {
    if (err) {
      console.error('Error saving coordinates:', err);
      return res.status(500).json({ message: 'Failed to save coordinates' });
    }
    res.status(200).json({ message: 'Coordinates saved successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});