var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var ReciboSchema = new Schema({  
  num:    { type: String },
  company:     { type: String },
  time:  { type: Date },
  names: { type: String },
  debt:   { type: Number },
  concept:  { type: String },
  summary:  { type: String }
});

module.exports = mongoose.model('Recibo', ReciboSchema);  
