import { Link } from 'react-router-dom'
import { HardHat, FileStack, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { gradilista } from '../../data/gradilista'
import { dnevnikUnosi } from '../../data/dnevnik'
import { users } from '../../data/users'
import StatCard from '../../components/StatCard'
import StatusBadge from '../../components/StatusBadge'
import { formatDatum } from '../../data/uloge'

export default function Dashboard() {
  const { user } = useAuth()
