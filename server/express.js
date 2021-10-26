var express = require('express')
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')


const CONNECT_URL = 'mongodb://localhost:27017/'
mongoose.connect(CONNECT_URL, { //mongo DB 서버 연결
    useNewUrlParser: true,
    useUnifiedTopology :true
}).then(() => console.log("mongodb connected..."))
.catch(e => console.log('failed to connect mongodb : ${e}'))

app.use('/static', express.static('public'));
app.use(express.json()) 
app.use(logger('tiny'))
app.use(express.static('public'))



app.get("/users", (req, res) => {
    //데이터베이스에서 사용자 전체목록 조회
    res.send("all user list!")
})

// app.get("/go+gle", (req, res) => {
//     res.send("google site")
// })

app.get("/LeeJaeHyeop((mo)+)?", (req, res) => {
    res.send("Lee JaeHyeop is definitely shown! and other string is optional !")
})

app.get(/^\/users\/(\d{4})$/, (req, res) => {
    console.log(req.params)
    res.send(`user id ${req.params[0]} found successfully !`) 
})

app.get("/users/:userId([a-z]{4})", (req, res) => {
    console.log(req.params)
    res.send('user id ${req.params.userId} found successfully')
})

app.get(
    "/users/:name/comments",
    (req, res, next) => {
        if(req.params.name !== "jaehyeop") {
            //권한없음 페이지를 클라언트로 전송
            res.status(401).send("you are not authorized to this page!")
        }
        next() //위의 조건을 만족시키지 못했으면 두번째 콜백함수로 사용자 요청이 전달된다.
    },
    (req, res) => {
        res.send("this is page to update your comments!") // 댓글 수정 페이지 보여주기
    }
)

const blockFirstUser = (req, res, next) => {
    if(req.params.name === "Kim") {
        res.status(401).send("u are not authorized to this page ! fuck you are self")
   }
   next()
}

const blockSecondUser = (req, res, next) => {
    if(req.params.name === "Lee") {
        res.status(401).send("u are not authorized to this page ! fuck you are self")
   }
   next()
}

const allowThisUser = (req, res) => {//여기는 next가 없는데 다음 콜백함수가 없기 때문이다.
    res.send("u can see this home page! come on in!")
}

app.get("/home/users/:name", [
    blockFirstUser,
    blockSecondUser,
    allowThisUser
])


app.get("/chance", (req, res, next) => {
    if(Math.random() < 0.5) return next()
    res.send("first one")
})
app.get("/chance", (req, res) => {
    res.send("second one")
})

app.get(
    "/fruits/:name",
    (req, res, next) => {
        if(req.params.name !== "apple") return next()
        res.send("[logic 1] you choose apple for your favorite fruit!")
    },
    (req, res, next) => {
        if(req.params.name !== "banana") return next()
        res.send("[logic 2] you choose banana for your favorite fruit!")
    },
    (req, res) => {
        res.send(`[logic 3] you choose ${req.params.name} for your favorite fruite !`)
    }
)

app.get("/shirts", (req,res) => {
    res.send(`feature - color : ${req.query.color} / size: ${req.query.size}`)
})

app.get("/hello", (req, res) => {
    res.send(`<html> 
                <head></head> 
                <body> 
                    <h1>Hello world !fdadfa</h1>
                    <input type='button' value='Submit'/> 
                    </body>
             </html>`) 
})

app.get("/hello1", (req, res) => {
    res.json({ user: "syleemomo", msg: "hello !" })
})

app.get("/google", (req, res) => {
     res.redirect("https://google.com")
     })

app.get("/home", (req, res) => {
    res.redirect("/static/index.html")
 })







app.post("/users", (req, res) => { 
    console.log(req.body.newUser) 
    // 데이터베이스에 새로운 사용자 생성 
    res.json(`new user - ${req.body.newUser.name} created !`) 
})

app.put("/users/:id", (req, res) => { 
    console.log(req.body.updatedUserInfo) 
    // 데이터베이스에서 id 에 해당하는 사용자 정보 조회 후 업데이트 
    res.send(
     `user ${req.params.id} updated with payload ${JSON.stringify( 
         req.body.updatedUserInfo 
         )}!` 
    ) 
})

app.delete("/users/:id", (req, res) => {
     // 데이터베이스에서 id 에 해당하는 사용자 조회 후 제거 
     res.send(`user ${req.params.id} removed !`) })

    출처: https://syleemomo.tistory.com/36 [syleemomo의 IT 블로그]

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
