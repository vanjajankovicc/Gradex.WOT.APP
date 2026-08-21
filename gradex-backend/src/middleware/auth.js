import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// Proverava JWT token iz "Authorization: Bearer <token>" headera
// i kači ulogovanog korisnika na req.user
export const zastiti = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    res.status(401)
    throw new Error('Niste prijavljeni — token nedostaje.')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    if (!req.user) {
      res.status(401)
      throw new Error('Korisnik povezan sa ovim tokenom više ne postoji.')
    }
    next()
  } catch (err) {
    res.status(401)
    throw new Error('Token nije validan ili je istekao.')
  }
})

// dozvoli(['inzenjer', 'admin']) — propušta samo navedene uloge
export function dozvoli(...uloge) {
  return (req, res, next) => {
    if (!req.user || !uloge.includes(req.user.uloga)) {
      res.status(403)
      throw new Error(`Uloga "${req.user?.uloga}" nema pristup ovoj ruti.`)
    }
    next()
  }
}
