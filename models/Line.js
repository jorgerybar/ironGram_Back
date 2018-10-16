const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const lineSchema = new Schema({
 
  writer: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
  }
},{
  timestamps:{
      createdAt:"created_at",
      updatedAt:"updated_at"
  }
})

module.exports = mongoose.model('Line', lineSchema)