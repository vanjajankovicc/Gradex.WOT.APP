import { Link } from 'react-router-dom'
import { HardHat, Users2, ClipboardCheck, ShieldCheck, ArrowRight, FileStack } from 'lucide-react'
import StampSeal from '../components/StampSeal'
import StatusBadge from '../components/StatusBadge'

export default function Landing() {
  return (
    <div>
      {/* HERO — blueprint tema */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 bg-grid-blueprint bg-grid-lg opacity-70" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blueprint-glow/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blueprint-line/40 bg-blueprint/40 px-3 py-1 text-xs font-mono text-blueprint-glow">
                Digitalni građevinski dnevnik
              </span>
              <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.08] tracking-tight">
                Dnevnik gradilišta,<br />vođen kao <span className="text-safety">projekat</span>,<br />ne kao papirologija.
              </h1>
              <p className="mt-6 text-paper/70 text-base sm:text-lg max-w-lg leading-relaxed">
                Gradex povezuje odgovornog inženjera i izvođača radova na jednom mestu: unos
                dnevnih izveštaja, pregled napretka gradilišta i formalna overa — sve digitalno,
                sa istorijom koja se ne gubi.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/registracija"
                  className="inline-flex items-center gap-2 rounded-md bg-safety px-5 py-3 text-sm font-medium text-white hover:bg-safety-dark transition-colors"
                >
                  Napravi nalog <ArrowRight size={16} />
                </Link>
                <Link
                  to="/kako-funkcionise"
                  className="inline-flex items-center gap-2 rounded-md border border-paper/25 px-5 py-3 text-sm font-medium text-paper hover:bg-paper/10 transition-colors"
                >
                  Kako funkcioniše
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6 text-xs font-mono text-paper/50">
                <span>ROLE: INŽENJER · IZVOĐAČ · ADMIN</span>
              </div>
            </div>

            {/* Mockup kartice dnevnika */}
            <div className="relative">
              <div className="corner-marks text-blueprint-glow/60 rounded-lg border border-blueprint-line/25 bg-ink-light/60 backdrop-blur p-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-mono text-blueprint-glow/70">DNEVNIK UNOS #47</p>
                    <p className="font-display font-medium mt-0.5">Stambeno-poslovni objekat "Vidik"</p>
                  </div>
                  <StatusBadge status="overeno" />
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono text-paper/60">
                  <div>
                    <dt className="opacity-60">Datum</dt>
                    <dd className="text-paper">11.08.2026.</dd>
                  </div>
                  <div>
                    <dt className="opacity-60">Broj radnika</dt>
                    <dd className="text-paper">18</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="opacity-60">Izvedeni radovi</dt>
                    <dd className="text-paper/90 font-body mt-1 leading-relaxed">
                      Montaža fasadne podkonstrukcije, severna strana (III sprat). Betoniranje
                      venca na Pk.
                    </dd>
                  </div>
                </dl>
                <div className="mt-5 flex items-center justify-between pt-4 border-t border-paper/10">
                  <span className="text-[11px] font-mono text-paper/50">Nemanja Vukić, odg. inženjer</span>
                  <StampSeal ime="N. Vukić" datum="11.08.2026." size={58} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZA KOGA JE GRADEX */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
        <div className="max-w-xl">
          <p className="text-xs font-mono uppercase tracking-wider text-safety">Dve uloge, jedan dnevnik</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-ink">Za koga je Gradex</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-ink/10 bg-white p-7">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-stamp-green/10 text-stamp-green">
              <ClipboardCheck size={20} />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">Odgovorni inženjer</h3>
            <p className="mt-2 text-sm text-ink/60 leading-relaxed">
              Pregleda dnevne unose izvođača, overava ih svojim digitalnim pečatom ili vraća na
              doradu uz napomenu, i prati napredak svih gradilišta pod nadzorom.
            </p>
          </div>
          <div className="rounded-lg border border-ink/10 bg-white p-7">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-safety/10 text-safety">
              <HardHat size={20} />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">Izvođač radova / investitor</h3>
            <p className="mt-2 text-sm text-ink/60 leading-relaxed">
              Unosi dnevne izveštaje sa gradilišta — vremenske uslove, broj radnika, izvedene
              radove i utrošeni materijal — i prati status overe u realnom vremenu.
            </p>
          </div>
        </div>
      </section>

      {/* KAKO FUNKCIONIŠE — sekvenca, brojevi opravdani */}
      <section className="bg-paper-dark border-y border-ink/10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
          <div className="max-w-xl">
            <p className="text-xs font-mono uppercase tracking-wider text-safety">Tok jednog unosa</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-ink">Kako funkcioniše</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            {[
              {
                br: '01',
                naslov: 'Izvođač unosi dnevnik',
                opis: 'Na kraju radnog dana unosi vremenske uslove, broj radnika, izvedene radove i materijal.',
              },
              {
                br: '02',
                naslov: 'Inženjer proverava',
                opis: 'Odgovorni inženjer pregleda unos, upoređuje sa projektom i dinamikom radova.',
              },
              {
                br: '03',
                naslov: 'Unos se overava',
                opis: 'Unos se overava digitalnim pečatom ili vraća izvođaču uz napomenu za ispravku.',
              },
            ].map((k) => (
              <div key={k.br}>
                <span className="font-mono text-sm text-safety">{k.br}</span>
                <h3 className="mt-2 font-display font-semibold text-ink">{k.naslov}</h3>
                <p className="mt-2 text-sm text-ink/60 leading-relaxed">{k.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNKCIONALNOSTI */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
        <div className="max-w-xl">
          <p className="text-xs font-mono uppercase tracking-wider text-safety">Funkcionalnosti</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-ink">Sve što je gradilištu potrebno</h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: FileStack, naslov: 'Digitalni dnevnik', opis: 'Hronološki unosi po gradilištu, bez papirnih obrazaca.' },
            { icon: ClipboardCheck, naslov: 'Overa unosa', opis: 'Status nacrt → poslato → overeno, sa tragom izmena.' },
            { icon: Users2, naslov: 'Uloge i pristup', opis: 'Inženjer, izvođač i administrator vide samo ono što im je potrebno.' },
            { icon: ShieldCheck, naslov: 'Administracija', opis: 'Upravljanje korisnicima i gradilištima na jednom mestu.' },
          ].map((f) => (
            <div key={f.naslov} className="rounded-lg border border-ink/10 bg-white p-6">
              <f.icon size={20} className="text-ink/70" />
              <h3 className="mt-3 font-display font-semibold text-ink text-sm">{f.naslov}</h3>
              <p className="mt-1.5 text-xs text-ink/55 leading-relaxed">{f.opis}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        <div className="rounded-xl bg-ink text-paper px-8 py-12 sm:px-14 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-semibold">Spremni da digitalizujete dnevnik?</h2>
            <p className="mt-2 text-paper/60 text-sm max-w-md">
              Napravite nalog kao inženjer ili izvođač radova i isprobajte tok unosa i overe.
            </p>
          </div>
          <Link
            to="/registracija"
            className="inline-flex items-center gap-2 rounded-md bg-safety px-6 py-3 text-sm font-medium text-white hover:bg-safety-dark transition-colors shrink-0"
          >
            Registruj se <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
