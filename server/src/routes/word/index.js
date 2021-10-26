const express = require('express')
const WordRouter = express.Router()

const Word = require("../../models/Word");

WordRouter.route('/(:word)?').get( async (req, res) => {// /api/words/ , /api/words/학원
    let words = []
    const { word } = req.params
    
    // res.send(word)

    if(word != "undefined" && word !== undefined){ 
        console.log(word)
        words = await Word.find({ r_word:word })        
        // 데이터베이스에서 쿼리로 단어를 검색
        // res.json({status : 200, msg: '특정 단어 검색'})
    }else{
        console.log(word)
        // console.log(`word database: ${Word}`)
        words = await Word.find() 
        //데이터베이스에서 전체 단어 검색
        // res.json({status : 200, msg:'전체 단어 검색'})
    }
    res.json({status:200, words})
})

module.exports = WordRouter
