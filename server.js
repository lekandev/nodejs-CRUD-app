const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

// Connect to MongoDb
mongoose.connect(process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);

const db = mongoose.connection;
db.on('connected', () => {
    console.log("connected to mongoDb successfully");
})

db.on('error', () => {
    console.log("error connecting to MongoDb!");
})

// Schema for data
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const Person = mongoose.model("Person", PersonSchema);


const app = express();

app.use(express.json({ extended: false }));

// POST request to /create route
app.post('/create', (req, res) => {
    const newPerson = new Person(req.body);
    newPerson.save()
    .then(
        () => {
            res.status(200).json({
                message: "data added successfully!",
                data: newPerson
            })
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: err })
        }
    )
});

// GET request to / route
app.get('/', (req, res) => {
    Person.find()
    .then(
        (people) => {
            res.status(200).json(people)
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: err })
        }
    )
});

// PUT request to /people/:id route
app.put('/people/:id', (req, res) => {
    Person.findByIdAndUpdate(req.params.id, req.body, (err, person) => {
        if (err) {
            return res.status(500).json({ message: err })
        } else if (!person){
            return res.status(404).json({ message: "data not found" });
        } else {
            person.save((err, savedPerson) => {
                if (err) {
                    return res.status(400).json({ message: err})
                } else {
                    return res.status(200).json({ message: "data updated successfully!" })
                }
            });
        }
    })
});

// DELETE request to /people/:id
app.delete('/people/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
    .then(
        res.json({message: "data deleted successfully!"})
    ).catch(
        (err) => {
            res.status(500).json({ message: err })
        }
    )
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
