const express = require('express');
const router  = express.Router();
const path = require('path')
const Cadav = require('../models/Cadav')
const Line = require('../models/Line')

const {verifyToken} =require('../helpers/jwt')

// /* GET home page */
// router.get('/*', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'))
// });

router.post('/new', (req,res,next)=> {
  const {title, writer, text} = req.body
  Line.create({writer, text})
    .then(line=>{
      console.log(line)
      const lines = [line._id]
      const urlEnd = title // must use a .URL encoded or something similar
      console.log('urlEnd='+urlEnd)
      const newCadav = {urlEnd, title, lines}
      Cadav.create(newCadav)
       .then(cd=>{
         console.log(cd)
         res.status(200).json(cd)})
      .catch(e=>console.log(e))
    })
})

module.exports = router;
