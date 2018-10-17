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
      const urlEnd = title.replace(/ /g, '') // must use a trim or something similar
      console.log('urlEnd='+urlEnd)
      const newCadav = {urlEnd, title, lines}
      Cadav.create(newCadav)
       .then(cd=>{
         console.log(cd)
         res.status(200).json(cd)})
      .catch(e=>console.log(e))
    })
})

router.get('/list', (req,res,next) =>{
  console.log('GET REQUEST FOR LIST')
  Cadav.find({}).populate('lines').sort({"created_at":-1})
    .then((r) => res.status(200).json(r))
    .catch((e)=>console.log(e))
})

router.get('/:title', (req,res,next) =>{
  const {title} = req.params
  console.log('GET REQUEST FOR ' + title)
  Cadav.find({title}).populate('lines')
    .then((r) => res.status(200).json(r))
    .catch(console.log('Cadav not Found'))
})

router.post('/:urlEnd', (req,res,next) =>{
  const newLine = req.body
  const {urlEnd} = req.params

  Line.create(newLine)
    .then(line=>{
      console.log(line)
      Cadav.findOneAndUpdate({urlEnd}, { $push: { lines: line } })
       .then(cd=>{
         console.log(cd)
         res.status(200).json(cd)})
      .catch(e=>console.log(e))
    })

})



module.exports = router;
