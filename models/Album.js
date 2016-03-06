var mongoose = require('mongoose')

var songSchema = new mongoose.Schema({
  name: String,
  rating: Number
})

var albumSchema = new mongoose.Schema({
  name: {type: String,unique: true,require: true},
  _by: {type: mongoose.Schema.Types.ObjectId, ref:'Artist'},
  label: String,
  songs: [songSchema]
})

var Album = mongoose.model('Album', albumSchema)

module.exports = Album

////// Album.js Data Sample //////
// {
//   "name"="Help!",
// "label":"EMI",
// "songs":[
//   {
//   "name":"I need you",
//   "rating": 5
// }]
// }
