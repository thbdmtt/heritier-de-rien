# Héritier de rien

Site officiel du récit autobiographique **Héritier de rien — Les petits
cailloux du tacot**, de Gilbert Myotte.

## Pages publiques

- `/` : présentation générale
- `/le-livre/` : présentation détaillée du livre
- `/extrait/` : extrait gratuit du prologue
- `/a-propos/` : page auteur
- `/robots.txt` et `/sitemap.xml` : exploration et indexation

Toutes les URL canoniques et sociales utilisent
`https://www.gilbertmyotte.fr`.

## Développement et validation

```bash
npm install
npm run dev
npm test
npm run lint
```

`npm test` compile le site, génère la version statique destinée à GitHub Pages
et vérifie les éléments SEO critiques : canonicals, métadonnées sociales,
données structurées, robots, sitemap et pages éditoriales.

## Après chaque mise en ligne

1. Vérifier le domaine dans Google Search Console avec une propriété de type
   Domaine.
2. Soumettre `https://www.gilbertmyotte.fr/sitemap.xml`.
3. Demander l’indexation de la page d’accueil, puis de `/le-livre/`,
   `/extrait/` et `/a-propos/`.
4. Importer la propriété Search Console dans Bing Webmaster Tools, ou y
   soumettre le même sitemap.
5. Surveiller les rapports Pages, Résultats enrichis et Signaux Web essentiels.

Quand l’ISBN, la date de publication, les liens d’achat, des avis vérifiés ou
des profils auteur officiels seront disponibles, les ajouter au contenu visible
et aux données structurées. Ne jamais publier de note, d’avis ou de
disponibilité qui ne soit pas vérifiable.
