import mongoose from 'mongoose'

const dnevnikUnosSchema = new mongoose.Schema(
  {
    gradilisteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gradiliste', required: true },
    redniBroj: { type: Number, required: true },
    datum: { type: Date, required: true },
    vremenskiUslovi: { type: String, default: '' },
    brojRadnika: { type: Number, default: 0 },
    izvedeniRadovi: { type: String, required: true },
    utrosenMaterijal: { type: String, default: '' },
    napomene: { type: String, default: '' },
    autorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['nacrt', 'poslato', 'overeno', 'odbijeno'],
      default: 'nacrt',
    },
    overioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    datumOverenja: { type: Date, default: null },
  },
  { timestamps: true }
)

// Redni broj unosa je jedinstven po gradilištu
dnevnikUnosSchema.index({ gradilisteId: 1, redniBroj: 1 }, { unique: true })

export default mongoose.model('DnevnikUnos', dnevnikUnosSchema)
