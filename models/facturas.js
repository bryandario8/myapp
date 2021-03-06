var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var facturaSchema = new Schema({  
  num:    { type: String },
  company:     { type: String },
  service: { type: String, enum:
  ['Agua Potable', 'Luz Eléctrica', 'Teléfono'] 
		},
  time:  { type: Date },
  debt:   { type: Number },
  state:  { type: String, enum:
  ['Pagado', 'Pendiente', 'Acumulado']
        },
  summary:  { type: String }
});

module.exports = mongoose.model('Factura', facturaSchema);  