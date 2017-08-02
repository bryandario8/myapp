//File: controllers/recibos.js
var mongoose = require('mongoose');  
var Recibo  = mongoose.model('Recibo');

//GET - Return all recibos in the DB
exports.findAllRecibos = function(req, res) {  
    Recibo.find(function(err, recibo) {
        if(err) res.send(500, err.message);
        else {
            return res.render('../views/recibos/index', {title: 'Lista de Recibos', recibo: recibo});
        }
        console.log('GET /recibos');
            res.status(200).jsonp(recibo);
    });
};

//GET - Return a Recibos with specified ID
exports.findById = function(req, res) {  
    REcibo.findById(req.params.id, function(err, recibo) {
    if(err) return res.send(500, err.message);

    console.log('GET /recibo/' + req.params.id);
        res.status(200).jsonp(recibo);
    });
};

//POST - Insert a new Recibos in the DB
exports.addRecibo = function(req, res, next) {  
    console.log('POST');
    console.log(req.body);

    var recibo = new Recibo({
        num:      req.body.num,
        company:  req.body.company,
        time:     req.body.time,
	names:    req.body.names,
        debt:     req.body.debt,
        concept:  req.body.concept,
        summary:  req.body.summary
    });

    recibo.save(function(err, recibo) {
        if(err) return res.status(500).send( err.message);
        res.redirect('/');
        res.status(200).jsonp(recibo);
    });
};


exports.showEditRecibo = function(req, res) {  
    REcibo.findById(req.params.id, function(err, recibo) {
        
        if(err) return res.status(500).send(err.message);
        else return res.render('../views/recibos/show', {title: 'Editar Recibo', act: '/recibo/'+req.params.id, recibo:recibo});
        res.status(200).jsonp(recibo);
        
    });
};

//PUT - Update a register already exists
exports.updateRecibo = function(req, res, next) {  
    Recibo.findById(req.params.id, function(err, recibo) {
        num:      req.body.num;
        company:  req.body.company;
        time:     req.body.time;
	names:    req.body.names;
        debt:     req.body.debt;
        concept:  req.body.concept;
        summary:  req.body.summary;

        recibo.save(function(err) {
            if(err) return res.status(500).send(err.message);
            else res.render('../views/recibos/index', {title: 'Lista de Recibos', recibo: recibo});
            res.status(200).jsonp(recibo);

        });
    });
};

//DELETE - Delete a Recibo with specified ID
exports.deleteRecibo = function(req, res) {  
    Recibo.findById(req.params.id, function(err, recibo) {
        recibo.remove(function(err) {
            if(err) res.render('../views/recibos/index', {title: 'Lista de recibos', recibo: recibo});
            else res.redirect('/')
                //res.status(200).send();
            
        })
    });
};

exports.create = function (req, res, next) {
    
  return res.render('../views/recibos/show', {title: 'Nueva Recibo', act: '/recibos', recibo: {}})
}
