const app = require('express')()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

let tododb


const system = process.env.system || '"not set"'

app.set('views', './views')
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/todo.js', (req, res) => {
    tododb.find().toArray().then(items => {
        res.render('todo', {items, system})
    })
})

app.post('/todo.js/new', (req, res) => {
    tododb.insertOne(req.body).then(() => res.redirect('/todo.js'))
})

MongoClient.connect('mongodb://mongo:27017/tododb')
    .then(db => {
        let server
        tododb = db.collection('tododb')
        server = app.listen(3000, console.log)
        return [db, server]
    })
    .then(([db,server]) => {
        process.on('SIGTERM', () => {
            server.close()
            db.close()
        })
    })
