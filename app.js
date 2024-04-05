const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 3001;

const connectToDatabase = require('./config/db_conn.js');
const splitTransactionRoutes = require('./routers/splitTransactions.routes.js');

app.use(cors());
app.use(express.json());
console.log('Hello from splitTransaction-service');


app.use('/splitTransactions', splitTransactionRoutes);

connectToDatabase().then(db => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });