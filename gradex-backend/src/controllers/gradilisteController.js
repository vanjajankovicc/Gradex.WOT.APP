import Gradiliste from '../models/Gradiliste.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @route GET /api/gradilista
// Inženjer/izvođač vide samo gradilišta na kojima su angažovani, admin vidi sve
export const listaGradilista = asyncHandler(async (req, res) => {
  let filter = {}
  if (req.user.uloga === 'inzenjer') filter = { odgovorniInzenjerId: req.user._id }
  if (req.user.uloga === 'izvodjac') filter = { izvodjacId: req.user._id }

  const gradilista = await Gradiliste.find(filter)
    .populate('izvodjacId', 'ime prezime firma')
    .populate('odgovorniInzenjerId', 'ime prezime licenca')
    .sort({ createdAt: -1 })

  res.json(gradilista)
})

// @route GET /api/gradilista/:id
export const jednoGradiliste = asyncHandler(async (req, res) => {
  const gradiliste = await Gradiliste.findById(req.params.id)
    .populate('izvodjacId', 'ime prezime firma')
    .populate('odgovorniInzenjerId', 'ime prezime licenca')

  if (!gradiliste) {
    res.status(404)
    throw new Error('Gradilište nije pronađeno.')
  }
  res.json(gradiliste)
})

// @route POST /api/gradilista  (inženjer ili admin)
export const kreirajGradiliste = asyncHandler(async (req, res) => {
  const gradiliste = await Gradiliste.create(req.body)
  res.status(201).json(gradiliste)
})

// @route PUT /api/gradilista/:id  (inženjer/admin)
export const izmeniGradiliste = asyncHandler(async (req, res) => {
  const gradiliste = await Gradiliste.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!gradiliste) {
    res.status(404)
    throw new Error('Gradilište nije pronađeno.')
  }
  res.json(gradiliste)
})

// @route DELETE /api/gradilista/:id  (admin)
export const obrisiGradiliste = asyncHandler(async (req, res) => {
  const gradiliste = await Gradiliste.findByIdAndDelete(req.params.id)
  if (!gradiliste) {
    res.status(404)
    throw new Error('Gradilište nije pronađeno.')
  }
  res.json({ poruka: 'Gradilište je obrisano.' })
})
