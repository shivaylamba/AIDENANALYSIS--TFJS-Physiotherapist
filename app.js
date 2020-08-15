// Server App

// Imports dependencies.
const express = require('express');

// Starts express app.
const app = express();

// Serves main page and initialises port.
app.use(express.static('client'));

// Set PORT
const PORT = process.env.PORT || 8080;

// App Listening
app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`)
});

