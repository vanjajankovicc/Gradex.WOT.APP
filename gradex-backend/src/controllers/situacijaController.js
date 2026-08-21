import Situacija from '../models/Situacija.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @route GET /api/situacije?gradilisteId=...
export const listaSituacija = asyncHandler(async (req, res) => {
  const filter = {}
  if (req.query.gradilisteId) filter.gradilisteId = req.query.gradilisteId
  if (req.user.uloga === 'izvodjac') filter.izvodjacId = req.user._id

  const situacije = await Situacija.find(filter)
    .populate('izvodjacId', 'ime prezime firma')
    .populate('odobrioId', 'ime prezime')
    .sort({ brojSituacije: -1 })

  res.json(situacije)
})

// @route GET /api/situacije/:id
export const jednaSituacija = asyncHandler(async (req, res) => {
  const situacija = await Situacija.findById(req.params.id)
    .populate('izvodjacId', 'ime prezime firma')
    .populate('odobrioId', 'ime prezime')

  if (!situacija) {
    res.status(404)
    throw new Error('Situacija nije pronađena.')
  }
  res.json(situacija)
})

// @route POST /api/situacije  (izvođač ispostavlja situaciju)
export const kreirajSituaciju = asyncHandler(async (req, res) => {
  const situacija = await Situacija.create({
    ...req.body,
    izvodjacId: req.user._id,
    status: 'kreirana',
  })
  res.status(201).json(situacija)
})

// @route PATCH /api/situacije/:id/status  (inženjer odobrava, admin evidentira plaćanje)
export const promeniStatusSituacije = asyncHandler(async (req, res) => {
  const { status } = req.body
  const dozvoljeniStatusi = ['kreirana', 'poslata', 'odobrena', 'placena', 'odbijena']
  if (!dozvoljeniStatusi.includes(status)) {
    res.status(400)
    throw new Error('Nevalidan status situacije.')
  }

  const izmene = { status }
  if (status === 'odobrena') {
    izmene.odobrioId = req.user._id
    izmene.datumOdobrenja = new Date()
  }
  if (status === 'placena') {
    izmene.datumPlacanja = new Date()
  }

  const situacija = await Situacija.findByIdAndUpdate(req.params.id, izmene, { new: true })
  if (!situacija) {
    res.status(404)
    throw new Error('Situacija nije pronađena.')
  }
  res.json(situacija)
})

// @route DELETE /api/situacije/:id
export const obrisiSituaciju = asyncHandler(async (req, res) => {
  const situacija = await Situacija.findByIdAndDelete(req.params.id)
  if (!situacija) {
    res.status(404)
    throw new Error('Situacija nije pronađena.')
  }
  res.json({ poruka: 'Situacija je obrisana.' })
})
