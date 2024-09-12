const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.js');
const jobRoutes = require("./routes/jobRoutes.js")
const resultRoutes = require("./routes/resultRoutes.js");
const admitCardRoutes = require("./routes/admitCardRoutes.js");

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
app.use('/api/result', resultRoutes);
app.use('/api/admit-card', admitCardRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running`);
});