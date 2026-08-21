import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    ime: { type: String, required: true, trim: true },
    prezime: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    lozinka: { type: String, required: true, select: false },
    uloga: {
      type: String,
      enum: ['inzenjer', 'izvodjac', 'admin'],
      required: true,
      default: 'izvodjac',
    },
    licenca: { type: String, default: null }, // relevantno za inženjere
    firma: { type: String, default: '' },
    telefon: { type: String, default: '' },
    avatarBoja: { type: String, default: '#5B6B78' },
  },
  { timestamps: true }
)

// Hešuj lozinku pre čuvanja, samo ako je izmenjena
userSchema.pre('save', async function (next) {
  if (!this.isModified('lozinka')) return next()
  const salt = await bcrypt.genSalt(10)
  this.lozinka = await bcrypt.hash(this.lozinka, salt)
  next()
})

userSchema.methods.uporediLozinku = function (uneta) {
  return bcrypt.compare(uneta, this.lozinka)
}

// Ne vraćaj lozinku u JSON odgovorima
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.lozinka
    return ret
  },
})

export default mongoose.model('User', userSchema)
