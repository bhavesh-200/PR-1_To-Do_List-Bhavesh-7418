const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8001

let todos = [];
let idCounter = 1;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/add', (req, res) => {
  const todo = { id: idCounter++, task: req.body.task };
  todos.push(todo);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  res.render('edit', { todo });
});

app.post('/update/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  todo.task = req.body.task;
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.redirect('/');
});

app.listen(8001, () => {
  console.log('Server running on http://localhost:8001');
});
