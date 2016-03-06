var mongoose = require('mongoose')

var artistSchema = new mongoose.Schema({
  name: String,
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref:'Album'}]
})

var Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist
