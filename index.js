const express = require('express');
require('colors');

const app = express();

let users = [
  {
    id: 1,
    name: 'Nizar',
    email: 'nizar@gmail.com',
  },
  {
    id: 2,
    name: 'Khalid',
    email: 'khalid@gmail.com',
  },
  {
    id: 3,
    name: 'Soufiane',
    email: 'soufiane@gmail.com',
  },
];

app.use(express.json());

// Root Index
app.get('/', (req, res) => {
  res.json({ msg: 'API Running' });
});

// get all users
app.get('/users', (req, res) => {
  res.json({ users });
});

// get a single user
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === +id);
  res.json({ user });
});

// add a user
app.post('/users', (req, res) => {
  const body = req.body;
  res.json({ user: body });
});

// update a user
app.put('/users/:id', (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const user = users.find((user) => user.id === +id);
  if (!user) {
    return res.json({ msg: 'Not Found' });
  }
  user.name = body.name;
  user.email = body.email;
  res.json({ user });
});

// delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== +id);
  res.json({ users });
});

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`.cyan.underline.bold)
);
