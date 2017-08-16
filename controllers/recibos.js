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
    Recibo.findById(req.params.id, function(err, recibo) {
    if(err) return res.send(500, err.message);

    console.log('GET /recibo/' + req.params.id);
        res.status(200).jsonp(recibo);
    });
};

//POST - Insert a new Recibos in the DB
exports.addRecibo = function(req, res) {  
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
    Recibo.findById(req.params.id, function(err, recibo) {
        
        if(err) return res.status(500).send(err.message);
        else return res.render('../views/recibos/show', {
            put: true,
            title: 'Editar Recibo',
            act: '/edit-recibo/'+req.params.id+'/edit',
            recibo:recibo});
        res.status(200).jsonp(recibo);
        
    });
};


//PUT - Update a register already exists
exports.updateRecibo = function(req, res, next) {  
    Recibo.findById(req.params.id, function(err, recibo) {
        var num = req.body.num;
        var company = req.body.company;
        var time = req.body.time;
	var names = req.body.names;
        var debt = req.body.debt;
        var concept = req.body.concept;
        var summary = req.body.summary;

        recibo.update({
            num: num,
            company: company,
            time: time,
	    names: names,
            debt: debt,
            concept: concept,
        },function(err) {
            if(err) res.send("There was a problem updating the information to the database: " + err);
            else res.redirect('/');

        });
    });
};

//DELETE - Delete a Recibo with specified ID
exports.deleteRecibo = function(req, res) {  
    Recibo.remove({_id: req.params.id}, function(err) {
        if(err) res.send('Error al intentar eliminar el recibo.');
        else res.redirect('/');
        
    });
};

exports.create = function (req, res) {
    
  return res.render('../views/recibos/show', {
    put: false,
    title: 'Nuevo Recibo',
    act: '/recibos',
    recibo: {}})
}
