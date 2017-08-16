var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    http = require("http"),
    server = http.createServer(app),
    mongoose = require('mongoose'),
    favicon = require('serve-favicon'),
    path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());


//import Models and Controllers
var models = require('./models/facturas')(app,mongoose);
var FacturaCtrl = require('./controllers/facturas');

var models = require('./models/recibos')(app,mongoose);
var ReciboCtrl = require('./controllers/recibos');


//Exmaple Route
var router = express.Router();
router.get('/', function(req, res) {  
   res.send("Hello World!");
});


// API routes
var facturas = express.Router();
var recibos = express.Router();

// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


//Routes Facturas
facturas.get('/',FacturaCtrl.findAllFacturas);
facturas.get('/nueva-factura', FacturaCtrl.create);
facturas.post('/facturas',FacturaCtrl.addFactura);
facturas.get('/edit-factura/:id',FacturaCtrl.showEditFactura);
facturas.post('/edit-factura/:id/edit',FacturaCtrl.updateFactura);
facturas.post('/facturas/:id',FacturaCtrl.deleteFactura);

//Routes Recibos
recibos.get('/',ReciboCtrl.findAllRecibos);
recibos.get('/nuevo-recibo', ReciboCtrl.create);
recibos.post('/recibos',ReciboCtrl.addRecibo);
recibos.get('/edit-recibo/:id',ReciboCtrl.showEditRecibo);
recibos.post('/edit-recibo/:id/edit',ReciboCtrl.updateRecibo);
recibos.post('/recibos/:id',ReciboCtrl.deleteRecibo);


// No utilizadas
facturas.route('/factura/:id')  
  .get(FacturaCtrl.findAllFacturas)
  .post(FacturaCtrl.updateFactura);

recibos.route('/recibo/:id')  
  .get(ReciboCtrl.findAllRecibos)
  .post(ReciboCtrl.updateRecibo);


// Ruta General
app.use('/api', facturas);
app.use(facturas);

//app.use('/api', recibos);
//app.use(recibos);


mongoose.connect('mongodb://localhost/facturas', function(error, respuesta) {
	if (error) {
		console.log('ERROR: connecting to Database ' +  error);
	}
  
});

app.listen(8080, function() {  
  console.log("Node server running on http://localhost:8080");
});



