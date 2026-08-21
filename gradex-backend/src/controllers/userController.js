import User from '../models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @route GET /api/users  (samo admin)
export const listaKorisnika = asyncHandler(async (req, res) => {
  const korisnici = await User.find().sort({ createdAt: -1 })
  res.json(korisnici)
})

// @route GET /api/users/:id
export const jedanKorisnik = asyncHandler(async (req, res) => {
  const korisnik = await User.findById(req.params.id)
  if (!korisnik) {
    res.status(404)
    throw new Error('Korisnik nije pronađen.')
  }
  res.json(korisnik)
})

// @route PUT /api/users/:id  (sopstveni profil ili admin)
export const izmeniKorisnika = asyncHandler(async (req, res) => {
  if (req.user.uloga !== 'admin' && req.user._id.toString() !== req.params.id) {
    res.status(403)
    throw new Error('Možete izmeniti samo sopstveni profil.')
  }

  const dozvoljenaPolja = ['ime', 'prezime', 'firma', 'telefon', 'licenca']
  const izmene = {}
  for (const polje of dozvoljenaPolja) {
    if (req.body[polje] !== undefined) izmene[polje] = req.body[polje]
  }

  const korisnik = await User.findByIdAndUpdate(req.params.id, izmene, {
    new: true,
    runValidators: true,
  })
  if (!korisnik) {
    res.status(404)
    throw new Error('Korisnik nije pronađen.')
  }
  res.json(korisnik)
})

// @route DELETE /api/users/:id  (samo admin)
export const obrisiKorisnika = asyncHandler(async (req, res) => {
  const korisnik = await User.findByIdAndDelete(req.params.id)
  if (!korisnik) {
    res.status(404)
    throw new Error('Korisnik nije pronađen.')
  }
  res.json({ poruka: 'Korisnik je obrisan.' })
})
