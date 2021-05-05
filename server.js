const express = require('express');
const mongoose = require('mongoose');
const uri = mongodb+srv://lekandev:<password>@cluster0.sbgkm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(express.json({ extended: false }));

app.create('/create', (req, res) => res.json({ requestType: 'create'}));

app.get('/', (req, res) => res.json({ requestType: 'create'}));

app.put('/update/:id', (req, res) => res.json({ requestType: 'create'}));

app.delete('/delete/:id', (req, res) => res.json({ requestType: 'create'}));

const PORT = process.env.PORT || 9010;

app.listen(PORT, () => console.log(`Servver don start at ${PORT}`));
