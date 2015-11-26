var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('port', process.env.PORT|| 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Conexión a Mongoose.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/directores', function(error){
    if(error){
        throw error;
    }else{
        console.log('Conectado a MongoDB');
    }
});

//Creo esquema Director

var DirectorSchema = mongoose.Schema({
    nombre: String,
    apellidos: String,
    edad: Number,
    pelicula: String,
    sinopsis: String
});

    var Director = mongoose.model("Director",DirectorSchema);

app.get("/", function(req, res){
    res.sendfile('./public/views/agregarDirector.html')
});

app.get("/listar", function(req,res){
    Director.find({},function(err,directores){
        if(err){
            res.send("Error");
        }else{
            res.send(directores)
        }
    });
});
app.get("/recuperar" , function (req, res) {
    Director.findById(req.query._id, function(err,documento){
        if(err){
            res.send("Error");
        }else{
            res.send(documento)
        }
    });
});
app.post("/guardar", function (req, res) {
   var director = new Director({
       nombre:req.query.nombre,
       apellidos:req.query.apellidos,
       edad:req.query.edad,
       pelicula:req.query.pelicula,
       sinopsis:req.query.sinopsis
   }) ;
    director.save(function(err,documento){
       if(err){
           res.send("Error");
       } else{
           res.send(documento);
       }
    });
});

app.post("/eliminar", function (req,res){
    Director.remove({_id: req.query._id}, function(err){
        if(err){
            res.send("error");
        }else{
            res.send("OK")
        }
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
