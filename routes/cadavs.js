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

router.get('/:title', (req,res,next) =>{
  const {title} = req.params
  console.log('GET REQUEST FOR ' + title)
  Cadav.find({title}).populate('lines')
    .then((r) => res.status(200).json(r))
    .catch(console.log('Cadav not Found'))
})

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
