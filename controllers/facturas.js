//File: controllers/facturas.js
var mongoose = require('mongoose');  
var Factura  = mongoose.model('Factura');

//GET - Return all facturas in the DB
exports.findAllFacturas = function(req, res) {  
    Factura.find(function(err, factura) {
        if(err) res.send(500, err.message);
        else {
            return res.render('../views/facturas/index', {title: 'Lista de Facturas', factura: factura});
        }
        console.log('GET /facturas');
            res.status(200).jsonp(factura);
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
exports.addFactura = function(req, res, next) {  
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
        res.redirect('/');
        res.status(200).jsonp(factura);
    });
};


exports.showEditFactura = function(req, res) {  
    Factura.findById(req.params.id, function(err, factura) {
        
        if(err) return res.status(500).send(err.message);
        else return res.render('../views/facturas/show', {title: 'Editar Factura', act: '/factura/'+req.params.id, factura:factura});
        res.status(200).jsonp(factura);
        
    });
};

//PUT - Update a register already exists
exports.updateFactura = function(req, res, next) {  
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
            else res.render('../views/facturas/index', {title: 'Lista de Facturas', factura: factura});
            res.status(200).jsonp(factura);

        });
    });
};

//DELETE - Delete a Factura with specified ID
exports.deleteFactura = function(req, res) {  
    Factura.findById(req.params.id, function(err, factura) {
        factura.remove(function(err) {
            if(err) res.render('../views/facturas/index', {title: 'Lista de Facturas', factura: factura});
            else res.redirect('/')
                //res.status(200).send();
            
        })
    });
};

exports.create = function (req, res, next) {
    
  return res.render('../views/facturas/show', {title: 'Nueva Factura', act: '/facturas', factura: {}})
}