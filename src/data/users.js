// Mock korisnici — kasnije zameniti pozivom ka /api/users (Node/Express + MongoDB)
export const users = [
  {
    id: 'u1',
    ime: 'Nemanja',
    prezime: 'Vukić',
    email: 'inzenjer@gradex.rs',
    lozinka: 'gradex123',
    uloga: 'inzenjer',
    licenca: '401 0842 03',
    firma: 'ZIG Projekt d.o.o.',
    telefon: '065 112 2334',
    avatarBoja: '#2C6E4F',
  },
  {
    id: 'u2',
    ime: 'Milica',
    prezime: 'Radović',
    email: 'izvodjac@gradex.rs',
    lozinka: 'gradex123',
    uloga: 'izvodjac',
    firma: 'Radović Gradnja d.o.o.',
    telefon: '063 998 1123',
    avatarBoja: '#E2571F',
  },
  {
    id: 'u3',
    ime: 'Admin',
    prezime: 'Gradex',
    email: 'admin@gradex.rs',
    lozinka: 'admin123',
    uloga: 'admin',
    firma: 'Gradex',
    telefon: '021 555 0100',
    avatarBoja: '#10263F',
  },
  {
    id: 'u4',
    ime: 'Stefan',
    prezime: 'Jovanović',
    email: 'stefan.jovanovic@gradex.rs',
    lozinka: 'gradex123',
    uloga: 'inzenjer',
    licenca: '401 1023 07',
    firma: 'Projektbiro NS',
    telefon: '064 220 3391',
    avatarBoja: '#2C6E4F',
  },
  {
    id: 'u5',
    ime: 'Investoria',
    prezime: 'd.o.o.',
    email: 'investitor@gradex.rs',
    lozinka: 'gradex123',
    uloga: 'izvodjac',
    firma: 'Investoria d.o.o. (investitor)',
    telefon: '021 300 4410',
    avatarBoja: '#E2571F',
  },
]

export function findUserByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}
