var express = require('express')
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var routes = require('./src/routes')
const { application } = require('express')

const CONNECT_URL = 'mongodb://localhost:27017/kor_dic_db'
mongoose.connect(CONNECT_URL, { //mongo DB 서버 연결
    useNewUrlParser: true,
    useUnifiedTopology :true
}).then(() => console.log("mongodb connected..."))
.catch(e => console.log('failed to connect mongodb : ${e}'))

var corsOptions = { //CORS 옵션
    origin: '*',
    credentials : true
}

app.use(cors(corsOptions))
// app.use(cors())
app.use(express.json()) 
app.use(logger('tiny'))
app.use('/api', routes) //api 라우팅


app.get('/hello', (req, res) => { //URL 응답 테스트
    res.send('hello world !')
})

app.use((req,res,next) => { //사용자가 요청한 페이지가 없는 경우 에러처리
     res.status(404).send("this is page you see when page don't exist")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("something is broken on server !")
})

 app.listen(5000, () => {  //5000포트로 서버 오픈
     console.log('server is running on port 5000...')

})



// const points = [3, 5];
// const app = {} //리터럴 곧바로 메모리가 할당된다.
// app.doubleNums = () => {
//     return points.map(p => {
//         return p*p;
//     })
// }
// app.sum = (points_doubled) => {
//     let s = 0;
//     points_doubled.forEach(p => {
//         s += p;
//     })
//     return s;
// }
// app.sq = (s) => {
//     return Math.sqrt(s)
// }

// const pipeline = [app.doubleNums, app.sum, app.sq]

// const result = app.sq(app.sum(app.doubleNums(points)))
// console.log(result)