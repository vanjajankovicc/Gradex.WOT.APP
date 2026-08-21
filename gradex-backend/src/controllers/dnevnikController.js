import DnevnikUnos from '../models/DnevnikUnos.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @route GET /api/dnevnik?gradilisteId=...
export const listaUnosa = asyncHandler(async (req, res) => {
  const filter = {}
  if (req.query.gradilisteId) filter.gradilisteId = req.query.gradilisteId

  const unosi = await DnevnikUnos.find(filter)
    .populate('autorId', 'ime prezime uloga')
    .populate('overioId', 'ime prezime uloga')
    .sort({ redniBroj: -1 })

  res.json(unosi)
})

// @route GET /api/dnevnik/:id
export const jedanUnos = asyncHandler(async (req, res) => {
  const unos = await DnevnikUnos.findById(req.params.id)
    .populate('autorId', 'ime prezime uloga')
    .populate('overioId', 'ime prezime uloga')

  if (!unos) {
    res.status(404)
    throw new Error('Unos u dnevnik nije pronađen.')
  }
  res.json(unos)
})

// @route POST /api/dnevnik  (izvođač ili inženjer piše unos)
export const kreirajUnos = asyncHandler(async (req, res) => {
  const unos = await DnevnikUnos.create({
    ...req.body,
    autorId: req.user._id,
    status: req.body.status || 'nacrt',
  })
  res.status(201).json(unos)
})

// @route PUT /api/dnevnik/:id
export const izmeniUnos = asyncHandler(async (req, res) => {
  const unos = await DnevnikUnos.findById(req.params.id)
  if (!unos) {
    res.status(404)
    throw new Error('Unos u dnevnik nije pronađen.')
  }

  // Overen unos se ne sme dalje menjati (osim od strane admina)
  if (unos.status === 'overeno' && req.user.uloga !== 'admin') {
    res.status(400)
    throw new Error('Overen unos se ne može menjati.')
  }

  Object.assign(unos, req.body)
  await unos.save()
  res.json(unos)
})

// @route PATCH /api/dnevnik/:id/overi  (samo odgovorni inženjer)
export const overiUnos = asyncHandler(async (req, res) => {
  if (req.user.uloga !== 'inzenjer' && req.user.uloga !== 'admin') {
    res.status(403)
    throw new Error('Samo odgovorni inženjer može overiti unos.')
  }

  const { odluka } = req.body // 'overeno' ili 'odbijeno'
  if (!['overeno', 'odbijeno'].includes(odluka)) {
    res.status(400)
    throw new Error('Odluka mora biti "overeno" ili "odbijeno".')
  }

  const unos = await DnevnikUnos.findByIdAndUpdate(
    req.params.id,
    { status: odluka, overioId: req.user._id, datumOverenja: new Date() },
    { new: true }
  )
  if (!unos) {
    res.status(404)
    throw new Error('Unos u dnevnik nije pronađen.')
  }
  res.json(unos)
})

// @route DELETE /api/dnevnik/:id
export const obrisiUnos = asyncHandler(async (req, res) => {
  const unos = await DnevnikUnos.findByIdAndDelete(req.params.id)
  if (!unos) {
    res.status(404)
    throw new Error('Unos u dnevnik nije pronađen.')
  }
  res.json({ poruka: 'Unos je obrisan.' })
})
