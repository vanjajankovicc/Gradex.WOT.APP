export function notFound(req, res, next) {
  res.status(404)
  next(new Error(`Ruta nije pronađena: ${req.originalUrl}`))
}

export function errorHandler(err, req, res, next) {
  // Ako je status ostao 200 uprkos grešci, postavi 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  // Mongoose: nevalidan ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404
    message = 'Resurs sa datim ID-jem nije pronađen.'
  }

  // Mongoose: duplikat unique polja (npr. email, redniBroj)
  if (err.code === 11000) {
    statusCode = 400
    const polje = Object.keys(err.keyValue || {}).join(', ')
    message = `Vrednost za polje "${polje}" već postoji.`
  }

  // Mongoose: validation error
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(' ')
  }

  res.status(statusCode).json({
    poruka: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  })
}
