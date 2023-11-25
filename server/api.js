const express = require('express');
const app = express();
const port = 9411; // Change this to the desired port

// Define a sample response for your API endpoint
app.post('/applicationservice/Admin/ApplicationAdmin/ModuleMaster/Create', (req, res) => {
  // You can send a dummy response here
  const response = {
    message: 'Dummy API response for ModuleMaster/Create',
    // Add any other data you want to mock
  };
  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Dummy API server is running on http://localhost:${port}`);
});
