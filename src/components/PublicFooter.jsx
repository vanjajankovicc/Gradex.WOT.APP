import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function PublicFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper/70">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Logo variant="light" />
            <p className="mt-3 text-sm leading-relaxed max-w-xs">
              Digitalni građevinski dnevnik za inženjere i izvođače radova. Projekat izrađen u
              okviru predmeta Veb orijentisane tehnologije i sistemi.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-paper mb-3">Aplikacija</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/kako-funkcionise" className="hover:text-paper">Kako funkcioniše</Link></li>
              <li><Link to="/prijava" className="hover:text-paper">Prijava</Link></li>
              <li><Link to="/registracija" className="hover:text-paper">Registracija</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-paper mb-3">Kontakt</h4>
            <ul className="space-y-2 text-sm">
              <li>podrska@gradex.rs</li>
              <li>Fakultet tehničkih nauka, Novi Sad</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-paper/10 text-xs flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Gradex — studentski projekat.</span>
          <span>Veb orijentisane tehnologije i sistemi</span>
        </div>
      </div>
    </footer>
  )
}
