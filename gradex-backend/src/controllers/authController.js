import User from '../models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { generateToken } from '../utils/generateToken.js'

// @route POST /api/auth/register
export const registruj = asyncHandler(async (req, res) => {
  const { ime, prezime, email, lozinka, uloga, licenca, firma, telefon } = req.body

  if (!ime || !prezime || !email || !lozinka || !uloga) {
    res.status(400)
    throw new Error('Ime, prezime, email, lozinka i uloga su obavezni.')
  }

  const postoji = await User.findOne({ email: email.toLowerCase() })
  if (postoji) {
    res.status(400)
    throw new Error('Nalog sa ovom email adresom već postoji.')
  }

  const user = await User.create({
    ime,
    prezime,
    email,
    lozinka,
    uloga,
    licenca,
    firma,
    telefon,
    avatarBoja: uloga === 'inzenjer' ? '#2C6E4F' : '#E2571F',
  })

  res.status(201).json({
    user,
    token: generateToken(user._id),
  })
})

// @route POST /api/auth/login
export const prijavi = asyncHandler(async (req, res) => {
  const { email, lozinka } = req.body

  if (!email || !lozinka) {
    res.status(400)
    throw new Error('Email i lozinka su obavezni.')
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+lozinka')
  if (!user) {
    res.status(401)
    throw new Error('Nalog sa ovom email adresom ne postoji.')
  }

  const uparuje = await user.uporediLozinku(lozinka)
  if (!uparuje) {
    res.status(401)
    throw new Error('Pogrešna lozinka.')
  }

  res.json({
    user,
    token: generateToken(user._id),
  })
})

// @route GET /api/auth/me
export const trenutniKorisnik = asyncHandler(async (req, res) => {
  res.json(req.user)
})
