const mongoose = require('mongoose')

const wordschema = mongoose.Schema({
    r_seq: {type:String, trim : true },
    r_word: {type:String, trim : true },
    r_link: {type:String, trim : true },
    r_chi: {type:String, trim : true },
    r_des: {type:String, trim : true },
    r_pos: {type:String, trim : true },
})

const Word = mongoose.model('Word', wordschema, 'kor_dic_coli')


module.exports = Word;