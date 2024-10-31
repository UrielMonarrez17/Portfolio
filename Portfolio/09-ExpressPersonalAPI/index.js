const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('vies'));

app.set('view engine', 'ejs');
var names = []; 
var tasks = []; 
app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) names.push(name);
    res.redirect('/');
});

app.put('/greet/nombre/:name', (req, res) => {
    const name = req.params.name;
    if (name) names.push(name);
    res.json({ names });
});

app.get('/greet/:index', (req, res, next) => {
    const index = parseInt(req.params.index, 10);

    if (index >= 0 && index < names.length) {
        const name = names[index];
        res.render(path.join(__dirname, 'views', 'wazzup.ejs'), { name });
    } else {
        const error = 'Índice fuera de rango.';
        res.render('index', { names, tasks, error });
    }
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(err.status || 500);
    res.render('index', { names, tasks, error: err.message });
});

app.post('/task', (req, res) => {
    const task = req.body.task;
    if (task) tasks.push(task);
    res.redirect('/');
});

app.get('/task', (req, res) => {
    res.json({ tasks });
});

app.get('/task/delete/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
    res.redirect('/');
});

app.get('/task/up/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index > 0 && index < tasks.length) {
        [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]];
    }
    res.redirect('/');
});

app.get('/task/down/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < tasks.length - 1) {
        [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
    }
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.render('index', { names, tasks});
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});