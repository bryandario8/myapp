var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    http = require("http");
    server = http.createServer(app);
    mongoose = require('mongoose');

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

facturas.route('/facturas')  
  .get(FacturaCtrl.findAllFacturas)
  .post(FacturaCtrl.addFactura);

facturas.route('/facturas/:id')  
  .get(FacturaCtrl.findById)
  .put(FacturaCtrl.updateFactura)
  .delete(FacturaCtrl.deleteFactura);

app.use('/api', facturas);  


app.use(router);

mongoose.connect('mongodb://localhost/facturas', function(error, respuesta) {
	if (error) {
		console.log('ERROR: connecting to Database ' +  error);
	}
	app.listen(8000, function() {
		console.log("Node server running on http://localhost:8000");
	});
});

app.listen(8000, function() {  
  console.log("Node server running on http://localhost:8000");
});



