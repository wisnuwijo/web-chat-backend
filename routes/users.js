import express from 'express';

const router = express.Router();

const users = [
    {
        firstName: "John",
        lastName: "Doe",
        age: 25
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        age: 24
    }
];

// all routes in here are starting with /users

router.get('/', (req, res) => {
    res.send(users);
});

router.post('/', (req, res) => {
    console.log(req.body);
    console.log('POST ROUTE REACHED');

    res.send(req.body);
});

export default router;