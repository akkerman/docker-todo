const app = require('express')()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

let tododb

app.set('views', './views')
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/todo.js', (req, res) => {
    tododb.find().toArray().then(items => {
        res.render('todo', {items})
    })
})

app.post('/todo.js/new', (req, res) => {
    tododb.insertOne(req.body).then(() => res.redirect('/todo.js'))
})

MongoClient.connect('mongodb://mongo:27017/tododb')
    .then(db => {
        tododb = db.collection('tododb')
        app.listen(3000, console.log)
    })

