//File: controllers/facturas.js
var mongoose = require('mongoose');  
var Facturas  = mongoose.model('Factura');

//GET - Return all facturas in the DB
exports.findAllFacturas = function(req, respuesta) {  
    Factura.find(function(err, facturas) {
    if(err) respuesta.send(500, err.message);

    console.log('GET /facturas')
        respuesta.status(200).jsonp(facturas);
    });
};

//GET - Return a Facturas with specified ID
exports.findById = function(req, res) {  
    Factura.findById(req.params.id, function(err, factura) {
    if(err) return res.send(500, err.message);

    console.log('GET /factura/' + req.params.id);
        res.status(200).jsonp(factura);
    });
};

//POST - Insert a new Facturas in the DB
exports.addFactura = function(req, respuesta) {  
    console.log('POST');
    console.log(req.body);

    var factura = new Factura({
        num:      req.body.num,
        company:  req.body.company,
        service:  req.body.service,
        time:     req.body.time,
        debt:     req.body.debt,
        state:    req.body.state,
        summary:  req.body.summary
    });

    factura.save(function(err, factura) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(factura);
    });
};

//PUT - Update a register already exists
exports.updateFactura = function(req, res) {  
    Factura.findById(req.params.id, function(err, factura) {
        num:      req.body.num;
        company:  req.body.company;
        service:  req.body.service;
        time:     req.body.time;
        debt:     req.body.debt;
        state:    req.body.state;
        summary:  req.body.summary;

        factura.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(factura);
        });
    });
};

//DELETE - Delete a Factura with specified ID
exports.deleteFactura = function(req, res) {  
    Factura.findById(req.params.id, function(err, factura) {
        factura.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};