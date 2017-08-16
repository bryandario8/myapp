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
exports.addFactura = function(req, res) {  
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
        else return res.render('../views/facturas/show', {
            put: true,
            title: 'Editar Factura',
            act: '/edit-factura/'+req.params.id+'/edit',
            factura:factura});
        res.status(200).jsonp(factura);
        
    });
};

//PUT - Update a register already exists
exports.updateFactura = function(req, res) {  
    Factura.findById(req.params.id, function(err, factura) {
        var num = req.body.num;
        var company = req.body.company;
        var service = req.body.service;
        var time = req.body.time;
        var debt = req.body.debt;
        var state = req.body.state;
        var summary = req.body.summary;

        factura.update({
            num: num,
            company: company,
            service: service,
            time: time,
            debt: debt,
            state: state,
        },function(err) {
            if(err) res.send("There was a problem updating the information to the database: " + err);
            else res.redirect('/');

        });
    });
};

//DELETE - Delete a Factura with specified ID
exports.deleteFactura = function(req, res) {  
    Factura.remove({_id: req.params.id}, function(err) {
        if(err) res.send('Error al intentar eliminar la factura.');
        else res.redirect('/');
        
    });
};

exports.create = function (req, res) {
    
  return res.render('../views/facturas/show', {
    put: false,
    title: 'Nueva Factura',
    act: '/facturas',
    factura: {}})
}
