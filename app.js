var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    http = require("http");
    server = http.createServer(app);
    mongoose = require('mongoose');
    path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());


//Import Models and Controllers
var models = require('./models/facturas')(app,mongoose);
var FacturaCtrl = require('./controllers/facturas');


//Exmaple Route
var router = express.Router();
router.get('/', function(req, res) {  
   res.send("Hello World!");
});


// API routes
var facturas = express.Router();
/*
facturas.get('/',(req,res) => {
  res.sendFile(__dirname + '/index.html')
  
});*/
//facturas.route('/')  
/*
facturas.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html')
  });

facturas.route('/agregar')
  .get( (req,res) => {
    res.sendFile(__dirname + '/agregar.html') 
  });
*/

facturas.get('/',FacturaCtrl.findAllFacturas);

facturas.get('/nueva-factura', FacturaCtrl.create);

facturas.get('/edit-factura/:id',FacturaCtrl.showEditFactura);

facturas.route('/')  
  .get(FacturaCtrl.findAllFacturas);

facturas.route('/factura/:id')  
  .get(FacturaCtrl.findAllFacturas)
  .post(FacturaCtrl.updateFactura);

facturas.route('/facturas')  
  .get(FacturaCtrl.findAllFacturas)
  .post(FacturaCtrl.addFactura);

facturas.route('/facturas/:id')  
  .get(FacturaCtrl.findById)
  .put(FacturaCtrl.updateFactura)
  .delete(FacturaCtrl.deleteFactura);

app.use('/api', facturas);

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(facturas);


mongoose.connect('mongodb://localhost/facturas', function(error, respuesta) {
	if (error) {
		console.log('ERROR: connecting to Database ' +  error);
	}
  /*
	app.listen(8080, function() {
		console.log("Node server running on http://localhost:5602");
	});*/
});

app.listen(8080, function() {  
  console.log("Node server running on http://localhost:8080");
});



