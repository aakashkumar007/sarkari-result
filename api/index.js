const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.js');
const jobRoutes = require("./routes/jobRoutes.js")

const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
  }));

app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});