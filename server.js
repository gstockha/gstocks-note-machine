const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express(); //instantiate server
const apiRoutes = require('./Develop/routes/apiRoutes');
const htmlRoutes = require('./Develop/routes/htmlRoutes');

app.use(express.urlencoded({ extended: true })); // parse incoming string or array data
app.use(express.json()); // parse incoming JSON data
app.use(express.static('./Develop/public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, ()=>{
    console.log(`Note Taker API server now on port ${PORT}!`);
});