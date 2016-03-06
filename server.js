var
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  app = express(),
  Album = require('./models/Album.js')
  Artist = require('./models/Artist.js')

/// Connect to Database server
mongoose.connect('mongodb://localhost/mongoose-relationships-practice', function(err){
  if(err) return console.log(err)
  console.log("Connected to MongoDB mongoose-relationships-practice")
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req,res){
  res.send('<h1>Home Sweet Home!</h1>') /// make sure connection works!
})

////////  ALBUMS ROUTES  ////////
/// Get all albums
app.get('/albums', function(req,res){
  Album.find({}, function(err,albums){
    if(err) return console.log(err)
    res.json(albums)
  })
})

/// Post a new album
app.post('/albums', function(req,res){
  Album.create(req.body, function(err,album){
    if(err) return console.log(err)
    res.json({success: true, album: album})
  })
})

/// Get a specific album
app.get('/albums/:id', function(req,res){
  Album.findOne({name: req.params.id}, function(err,album){
    if(err) return console.log(err)
    res.json(album)
  })
})

/// Update a specific album
app.put('/albums/:id', function(req,res){
  Album.findOneAndUpdate({_id: req.params.id},req.body, function(err,album){
    if(err) return console.log(err)
    res.json({success: true, message:"Successfully updated."})
  })
})

/// Delete a specific album
app.delete('/albums/:id', function(req,res){
  Album.findOneAndRemove({_id: req.params.id}, function(err){
    if(err) return console.log(err)
    res.json({success: true, message:"Successfully removed."})
  })
})

/// Get all songs in an album
app.get('/albums/:id/songs', function(req,res){
  Album.findOne({_id: req.params.id}, function(err, album){
    if(err) return console.log(err)
    res.json(album.songs)
  })
})

/// Post a new song to a specific album
app.post('/albums/:id/songs', function(req,res){
  Album.findOne({_id: req.params.id}, function(err,album){
    if(err) return console.lod(err)
    album.songs.push(req.body)
    album.save(function(err){
      if(err) return console.log(err)
      res.json(album)
    })
  })
})

/// Get a specific song from a specific album
app.get('/albums/:id/songs/:songId', function(req,res){
  Album.findOne({_id: req.params.id}, function(err,album){
    if(err) return console.log(err)
    if(album.songs.id(req.params.songId)){
      res.json(album.songs.id(req.params.songId))
    } else {
      res.json({message: "No such song found!"})
    }
  })
})
/////////  ARTIST ROUTES  /////////////
/// Get all artist
 app.get('/artists', function(req,res){
   Artist.find({}, function(err,artists){
     if(err) return console.log(err)
     res.json(artists)
   })
 })
/// Create artist
app.post('/artists', function(req,res){
  Artist.create(req.body, function(err,artist){
    if(err) return console.log(err)
    res.json({success: true, artist: artist})
  })
})
/// Get a specific artist
app.get('/artists/:id', function(req,res){
  Artist.findOne({_id: req.params.id}).populate('albums').exec(function(err, artist){
    if(err) return console.log(err)
    res.json(artist)
  })
})
/// Create a new album for the artist
app.post('/artists/:id/albums', function(req,res){
  /// Find the artist first
  Artist.findOne({_id: req.params.id}, function(err, artist){
    if(err) return console.log(err)

    /// Create a new album, and set the _by property to this artist's id:
    var newAlbum = new Album(req.body)
    newAlbum._by = artist._id

    /// Save the album
    newAlbum.save(function(err){
      if(err) return console.log(err)

      /// Add this album to the array of this artist's albums
      artist.albums.push(newAlbum)
      artist.save(function(err, album){
        if(err) return console.log(err)
        res.json(album)
      })
    })
  })
})

app.listen(3000, function(){
  console.log("Server running on 3000!!!!!!!!!!!!!!!!!")
})
