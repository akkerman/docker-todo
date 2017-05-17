const app = require('express')()
const MongoClient = require('mongodb').MongoClient;

let tododb;

app.set('views', './views')
app.set('view engine', 'pug')


app.get('/todo.js', (req, res) => {
    tododb.find().toArray().then(items => {
        res.render('todo', {items})
    });
});


MongoClient.connect('mongodb://mongo:27017/tododb')
    .then(db => {
        tododb = db.collection('tododb')
        app.listen(3000, console.log);
    })
