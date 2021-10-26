const express = require('express')
const TodoRouter = express.Router()
const Todo = require(`../models/Todo`)

TodoRouter.route('/').get(async(req, res) => {
    // res.send('all todo list')
    const todos = await Todo.find()
    console.log(todos)
    res.json({status: 200, todos})
})

TodoRouter.route('/:id').get((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) throw err;
        res.json({status:200, todo})
    })
})

TodoRouter.route('/:id').put((req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, todo) => {
        if(err) throw err;
        res.json({status:204, msg: `todo ${req.params.id} updated in db !`, todo})
    })
})

TodoRouter.route('/:id').delete((req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if(err) throw err;
        res.json({status:204, msg: `todo ${req.params.id} removed in db !`})
    })
})

TodoRouter.get('/:id', (req, res) => {
    res.send(`todo ${req.params.id}`)
})

TodoRouter.post('/', (req, res) => {
    res.send(`todo ${req.body.name} created`)
    Todo.findOne({ name:req.body.name, done:false}, (err, todo) => {
        if(err) throw err;
        if(!todo) {
            const newTodo = new Todo(req.body)
            newTodo.save().then( () => {
                res.json({status:201, msg: `new todo created in db!`, todo})
      })
    }else{//생성하려는 할일과 같은 이름이고 아직 끝나지 않은 할일이 이미 db에 존재하는 경우
        const msg = `this todo already exists in db!`
        console.log(msg)
        res.json({status:204,msg})
    }
})
})




// TodoRouter.put('/:id', (req, res) => {
//     //데이터베이스 접속후 id 값으로 모델 조회하고 변경함
//     res.send(`todo ${req.params.id} updated`)
// })

// TodoRouter.delete('/:id', (req, res) => {
//     res.send(`todo ${req.params.id} remove`)
// })
module.exports = TodoRouter;


//api/todos/