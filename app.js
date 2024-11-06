const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use(express.static('public'));

app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
