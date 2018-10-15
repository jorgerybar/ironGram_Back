const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const cadavSchema = new Schema({
  urlEnd: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  title: {
    type: String,
  },
  lines: [{
    type: Schema.Types.ObjectId,
    ref: 'Line'
  }],
  likes: [
    {
        type: Schema.Types.ObjectId,
        ref:"User"
    }],
 status: {
      type: String,
      enum : ['IN_PROGRESS', 'DONE'],
      default: 'IN_PROGRESS'
  },
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
})

module.exports = mongoose.model('Cadav', cadavSchema)