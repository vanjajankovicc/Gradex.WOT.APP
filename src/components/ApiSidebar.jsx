import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  HardHat,
  BookOpenText,
  UserCircle,
  ShieldCheck,
} from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'

const stavkeZaSve = [
  { to: '/app', label: 'Pregled', icon: LayoutDashboard, end: true },
  { to: '/app/gradilista', label: 'Gradilišta', icon: HardHat },
]

const stavkeAdmin = [{ to: '/app/admin', label: 'Administracija', icon: ShieldCheck }]

export default function AppSidebar({ open, onClose }) {
  const { user } = useAuth()

  const stavke = [
    ...stavkeZaSve,
    ...(user?.uloga === 'admin' ? stavkeAdmin : []),
    { to: '/app/profil', label: 'Profil', icon: UserCircle },
  ]

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed z-40 md:z-0 md:static inset-y-0 left-0 w-64 shrink-0 border-r border-paper-line bg-ink text-paper flex flex-col transition-transform md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-paper/10">
          <Logo variant="light" />
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {stavke.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-safety text-white'
                    : 'text-paper/70 hover:bg-paper/10 hover:text-paper'
                }`
              }
            >
              <item.icon size={18} strokeWidth={2} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-3">
          <div className="rounded-md bg-blueprint/40 border border-blueprint-line/20 p-3">
            <p className="flex items-center gap-2 text-xs font-mono text-blueprint-glow">
              <BookOpenText size={14} /> DNEVNIK v0.1
            </p>
            <p className="mt-1 text-[11px] text-paper/60 leading-relaxed">
              Frontend prikaz sa mock podacima — backend (Node/Express + MongoDB) povezuje se u
              sledećoj fazi projekta.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
