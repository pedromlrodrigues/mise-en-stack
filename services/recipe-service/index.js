// 1. Import Express
const express = require('express');

// 2. Create an Express application
const app = express();

// 3. Define the port the server will run on
// Use the environment variable PORT, or 3000 if it's not defined
const PORT = process.env.PORT || 3000;

// 4. Create a basic route for the root URL
// This sends a "Hello World!" message when you visit http://localhost:3000
app.get('/', (req, res) => {
  res.send('Hello, World! Your Express server is running. 🚀');
});

// 5. Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});