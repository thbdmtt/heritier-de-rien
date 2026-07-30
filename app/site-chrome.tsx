import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Héritier de rien — accueil">
        <span>Héritier de rien</span>
        <span>Gilbert Myotte</span>
      </Link>

      <nav className="main-nav" aria-label="Navigation principale">
        <Link className="nav-secondary" href="/le-livre/">
          Le livre
        </Link>
        <Link className="nav-secondary" href="/a-propos/">
          L’auteur
        </Link>
        <Link className="nav-secondary" href="/extrait/">
          Extrait
        </Link>
        <Link className="nav-primary" href="/acheter/">
          Acheter le livre <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Héritier de rien</p>
      <p>Les petits cailloux du tacot</p>
      <p>Gilbert Myotte</p>
    </footer>
  );
}
