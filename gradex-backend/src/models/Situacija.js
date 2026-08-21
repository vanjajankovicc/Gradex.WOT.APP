import mongoose from 'mongoose'

// "Situacija" — obračunska/naplatna dokumentacija u građevinarstvu
// (privremena ili okončana situacija koju izvođač ispostavlja investitoru)
const situacijaSchema = new mongoose.Schema(
  {
    gradilisteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gradiliste', required: true },
    brojSituacije: { type: Number, required: true },
    tip: {
      type: String,
      enum: ['privremena', 'okoncana'],
      default: 'privremena',
    },
    datum: { type: Date, required: true },
    iznos: { type: Number, required: true },
    opis: { type: String, default: '' },
    status: {
      type: String,
      enum: ['kreirana', 'poslata', 'odobrena', 'placena', 'odbijena'],
      default: 'kreirana',
    },
    izvodjacId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    odobrioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    datumOdobrenja: { type: Date, default: null },
    datumPlacanja: { type: Date, default: null },
  },
  { timestamps: true }
)

situacijaSchema.index({ gradilisteId: 1, brojSituacije: 1 }, { unique: true })

export default mongoose.model('Situacija', situacijaSchema)
