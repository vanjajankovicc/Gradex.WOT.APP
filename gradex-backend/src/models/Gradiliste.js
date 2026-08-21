
import mongoose from 'mongoose'

const gradilisteSchema = new mongoose.Schema(
  {
    naziv: { type: String, required: true, trim: true },
    lokacija: { type: String, required: true },
    vrstaObjekta: { type: String, default: '' },
    investitor: { type: String, default: '' },
    izvodjacId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    odgovorniInzenjerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    datumPocetka: { type: Date, required: true },
    rokZavrsetka: { type: Date, required: true },
    status: {
      type: String,
      enum: ['u toku', 'završeno', 'obustavljeno'],
      default: 'u toku',
    },
    napredak: { type: Number, min: 0, max: 100, default: 0 },
    budzet: { type: Number, default: 0 },
    opis: { type: String, default: '' },
    brojDozvole: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Gradiliste', gradilisteSchema)
