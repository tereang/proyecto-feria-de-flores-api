require('dotenv').config();
const express = require('express')
const app =express ()

app.set('port',process.env.PORT || 4000);

app.use(express.json())

app.use('/api/v1/ramos',require('./routes/ramos'))

app.listen (4000, ()=> console.log('Servidor 4000'))
