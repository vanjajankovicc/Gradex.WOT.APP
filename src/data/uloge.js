export const ULOGE = {
  inzenjer: { naziv: 'Odgovorni inženjer', kratko: 'Inženjer', boja: '#2C6E4F' },
  izvodjac: { naziv: 'Izvođač radova / Investitor', kratko: 'Izvođač', boja: '#E2571F' },
  admin: { naziv: 'Administrator', kratko: 'Admin', boja: '#10263F' },
}

export function nazivUloge(uloga) {
  return ULOGE[uloga]?.naziv || uloga
}

export function inicijali(user) {
  if (!user) return '?'
  return `${user.ime?.[0] || ''}${user.prezime?.[0] || ''}`.toUpperCase()
}

export function formatDatum(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatNovac(iznos) {
  if (iznos == null) return '—'
  return new Intl.NumberFormat('sr-RS').format(iznos) + ' RSD'
}
