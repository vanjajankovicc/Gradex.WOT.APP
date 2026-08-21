import mongoose from 'mongoose'

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`✅ MongoDB povezan: ${conn.connection.host}/${conn.connection.name}`)
  } catch (err) {
    console.error('❌ Greška pri povezivanju na MongoDB:', err.message)
    process.exit(1)
  }
}
