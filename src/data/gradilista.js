export const gradilista = [
  {
    id: 'g1',
    naziv: 'Stambeno-poslovni objekat "Vidik"',
    lokacija: 'Bulevar Oslobođenja 112, Novi Sad',
    vrstaObjekta: 'Stambeno-poslovni objekat, P+4+Pk',
    investitor: 'Investoria d.o.o.',
    izvodjacId: 'u2',
    odgovorniInzenjerId: 'u1',
    datumPocetka: '2026-02-10',
    rokZavrsetka: '2027-05-30',
    status: 'u toku',
    napredak: 62,
    budzet: 184000000,
    opis:
      'Izgradnja stambeno-poslovnog objekta spratnosti P+4+Pk sa podzemnom garažom. Radovi trenutno u fazi izvođenja instalacija i fasadnih radova.',
    brojDozvole: '353-02-1187/2025',
  },
  {
    id: 'g2',
    naziv: 'Rekonstrukcija mosta na Kanalu DTD',
    lokacija: 'Km 45+200, Kanal Novi Sad–Savino Selo',
    vrstaObjekta: 'Saobraćajnica — mostovska konstrukcija',
    investitor: 'JP Vode Vojvodine',
    izvodjacId: 'u5',
    odgovorniInzenjerId: 'u4',
    datumPocetka: '2025-09-01',
    rokZavrsetka: '2026-11-15',
    status: 'u toku',
    napredak: 38,
    budzet: 96500000,
    opis:
      'Sanacija i ojačanje nosećih stubova mosta, zamena ležišta i hidroizolacije kolovozne konstrukcije.',
    brojDozvole: '353-02-0642/2025',
  },
  {
    id: 'g3',
    naziv: 'Proizvodna hala "Panonija Logistika"',
    lokacija: 'Industrijska zona Jug, Subotica',
    vrstaObjekta: 'Proizvodno-skladišni objekat, P',
    investitor: 'Panonija Logistika d.o.o.',
    izvodjacId: 'u2',
    odgovorniInzenjerId: 'u1',
    datumPocetka: '2025-04-15',
    rokZavrsetka: '2026-02-28',
    status: 'završeno',
    napredak: 100,
    budzet: 142300000,
    opis:
      'Izgradnja proizvodno-skladišnog objekta bruto površine 6.200 m² sa pratećim upravnim delom.',
    brojDozvole: '353-02-0119/2025',
  },
  {
    id: 'g4',
    naziv: 'Sanacija fasade OŠ "Đura Jakšić"',
    lokacija: 'Ulica Đure Jakšića 5, Zrenjanin',
    vrstaObjekta: 'Javni objekat — obrazovanje',
    investitor: 'Grad Zrenjanin',
    izvodjacId: 'u5',
    odgovorniInzenjerId: 'u4',
    datumPocetka: '2026-06-01',
    rokZavrsetka: '2026-09-01',
    status: 'obustavljeno',
    napredak: 21,
    budzet: 18700000,
    opis:
      'Sanacija fasade i krovnog pokrivača školskog objekta. Radovi privremeno obustavljeni zbog vremenskih uslova.',
    brojDozvole: '353-02-0885/2026',
  },
]

export function getGradilisteById(id) {
  return gradilista.find((g) => g.id === id)
}
