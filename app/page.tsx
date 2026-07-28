const Arrow = () => (
  <span className="arrow" aria-hidden="true">
    ↘
  </span>
);

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>

      <header className="site-header">
        <a className="wordmark" href="#accueil" aria-label="Héritier de rien — accueil">
          <span>Héritier de rien</span>
          <span>Gilbert Myotte</span>
        </a>

        <nav className="main-nav" aria-label="Navigation principale">
          <a className="nav-secondary" href="#livre">
            Le livre
          </a>
          <a className="nav-secondary" href="#auteur">
            L’auteur
          </a>
          <a className="nav-primary" href="#extrait">
            Lire un extrait <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </header>

      <main id="contenu">
        <section className="hero" id="accueil" aria-labelledby="titre-livre">
          <div className="hero-copy">
            <p className="eyebrow">Une autobiographie · Gilbert Myotte</p>
            <h1 id="titre-livre">
              Héritier
              <span>de rien</span>
            </h1>
            <p className="subtitle">Les petits cailloux du tacot</p>

            <div className="hero-intro">
              <p>On ne choisit pas d’où l’on vient.</p>
              <a className="text-link" href="#livre">
                Découvrir le livre <Arrow />
              </a>
            </div>
          </div>

          <figure className="cover-figure">
            <div className="book-object">
              <span className="book-edge" aria-hidden="true" />
              <img
                src="/images/heritier-de-rien-couverture.jpg"
                alt="Couverture du livre Héritier de rien, Les petits cailloux du tacot, de Gilbert Myotte"
                width="1200"
                height="1916"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>Récit autobiographique</span>
              <span>Gilbert Myotte</span>
            </figcaption>
          </figure>
        </section>

        <section className="preface" aria-labelledby="preface-titre">
          <div className="section-marker">
            <span>Préface</span>
            <span aria-hidden="true">01</span>
          </div>

          <blockquote>
            <p id="preface-titre">
              Il y a des livres qu’on écrit parce qu’on en a envie.
            </p>
            <p>
              Et il y a des livres qu’on écrit parce qu’on n’a plus le choix.
            </p>
            <footer>Celui-ci est du second type.</footer>
          </blockquote>
        </section>

        <section className="book-section" id="livre" aria-labelledby="livre-titre">
          <div className="section-intro">
            <p className="eyebrow">Le livre</p>
            <h2 id="livre-titre">Une vie sans raccourci.</h2>
          </div>

          <div className="book-copy">
            <p className="lead">
              Gilbert est né dans le fracas d’un orage, dans une maison de
              garde-barrière secouée par le vent.
            </p>
            <p>
              Son père partait travailler avant l’aube. Sa mère tenait la
              maison comme on tient une digue. Autour de lui, rien n’était
              donné&nbsp;: ni les codes, ni les appuis, ni la promesse d’un
              avenir plus doux.
            </p>
            <p>
              Alors il a appris seul. À l’école, dans les ateliers, à l’armée,
              sur les routes, dans l’effort et dans la fatigue. Il a connu les
              humiliations, les silences, les accidents, les corps usés trop
              tôt, les maladies qui surgissent lorsque l’on croit avoir déjà
              tout encaissé.
            </p>
          </div>
        </section>

        <div className="continuation" aria-label="Transition">
          <span aria-hidden="true" />
          <p>Pourtant, il a continué.</p>
          <span aria-hidden="true" />
        </div>

        <section className="about-book" aria-label="À propos du récit">
          <p className="about-book-title">Regarder sa vie en face</p>
          <div className="about-book-copy">
            <p>
              <i>Héritier de rien</i> est le récit sans détour d’un homme qui
              regarde sa vie en face. Une autobiographie brute, sincère et
              profondément humaine, où se dessine une France discrète&nbsp;:
              celle des travailleurs de l’ombre, des familles modestes, des
              enfances sans protection et des existences construites sans
              filet.
            </p>
            <p>
              Ce livre ne cherche ni à embellir, ni à régler des comptes. Il
              raconte ce que coûte une vie quand il faut tout apprendre par
              soi-même, tomber, se relever, recommencer, et prouver sans cesse
              que l’on a sa place.
            </p>
          </div>
        </section>

        <section className="excerpt" id="extrait" aria-labelledby="extrait-titre">
          <aside className="excerpt-meta">
            <p className="eyebrow">Extrait</p>
            <p>Prologue</p>
            <span aria-hidden="true" />
          </aside>

          <article className="excerpt-text">
            <h2 id="extrait-titre">
              Je viens d’un monde où l’on parlait peu.
            </h2>
            <p className="first-paragraph">
              Pas par élégance. Pas par sagesse. Par nécessité. Parce que, chez
              nous, les mots coûtaient plus cher que le silence et servaient
              moins souvent.
            </p>
            <p>
              J’ai vécu mon adolescence dans un petit appartement où l’air
              semblait toujours lesté de quelque chose de lourd, d’invisible,
              une gravité ancienne qui se déposait sur les meubles, sur les
              corps, sur les repas, sur les soirs.
            </p>
            <p>
              À table, on ne parlait ni de vocation, ni de projets, ni de ces
              grands lendemains qui fleurissent dans les familles sûres
              d’elles-mêmes. On parlait surtout de ce qu’il fallait faire pour
              tenir. Tenir le mois. Tenir au travail. Tenir debout quand même.
              Chez nous, la vie n’était pas une promesse. C’était une manière
              de résister sans bruit.
            </p>
            <span className="end-mark" aria-hidden="true">
              ●
            </span>
          </article>
        </section>

        <section className="author" id="auteur" aria-labelledby="auteur-titre">
          <figure className="portrait-figure">
            <div className="portrait-frame">
              <img
                src="/images/gilbert-myotte-editorial-v2.jpg"
                alt="Gilbert Myotte, auteur d’Héritier de rien"
                width="1122"
                height="1402"
                loading="lazy"
              />
            </div>
            <figcaption>
              <span>Gilbert Myotte</span>
              <span>Portrait de l’auteur</span>
            </figcaption>
          </figure>

          <div className="author-copy">
            <p className="eyebrow">L’auteur</p>
            <h2 id="auteur-titre">Raconter les vies que l’on raconte peu.</h2>
            <p>
              Pendant des années, Gilbert Myotte a porté cette histoire par
              bribes&nbsp;: des images, des scènes, des souvenirs revenant
              toujours au même endroit. Il pensait que ce n’était pas une
              histoire, seulement une vie ordinaire parmi d’autres.
            </p>
            <blockquote>
              «&nbsp;Puis j’ai compris que c’était précisément là le
              problème. On ne raconte pas assez ces vies-là.&nbsp;»
            </blockquote>
          </div>
        </section>

        <section className="closing" aria-labelledby="closing-titre">
          <p className="eyebrow">Héritier de rien</p>
          <h2 id="closing-titre">
            Une histoire pour ceux qui sont partis sans boussole.
          </h2>
          <div className="closing-lines">
            <p>Pour ceux qui ont tenu malgré tout.</p>
            <p>
              Et pour ceux qui veulent comprendre ce que signifie vraiment
              arriver au monde les mains vides.
            </p>
          </div>
          <a className="closing-link" href="#extrait">
            Lire le prologue <span aria-hidden="true">↑</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <p>Héritier de rien</p>
        <p>Les petits cailloux du tacot</p>
        <p>Gilbert Myotte</p>
      </footer>
    </>
  );
}
