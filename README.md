# premiumanalytique.com — site statique (GitHub Pages)

Migration du site Wix, en français et en anglais (`/en/`). Les URL d'origine sont conservées.
Les programmes en ligne, la page Formations et les forfaits Wix ne font pas partie de ce site.

## 1. Récupérer les images (une seule fois)

Les images sont encore sur les serveurs de Wix. Avant d'annuler Wix, lancez :

- Windows : `powershell -ExecutionPolicy Bypass -File .\telecharger-images.ps1`
- macOS / Linux : `bash telecharger-images.sh`

Le script remplit le dossier `images/` à partir de `images/liste-images.txt`.

## 2. Tester localement

```
python -m http.server 8000
```
puis ouvrir http://localhost:8000

## 3. Publier sur GitHub Pages

1. Créer un dépôt (ex. `premiumanalytique-site`) et pousser le contenu de ce dossier.
2. *Settings → Pages* : Source = *Deploy from a branch*, branche `main`, dossier `/ (root)`.
3. Le fichier `CNAME` contient déjà `www.premiumanalytique.com`.

## 4. Changer le DNS (en dernier)

Chez le gestionnaire du domaine (Wix tant que le domaine y est) :

| Type  | Nom | Valeur |
|-------|-----|--------|
| A     | @   | 185.199.108.153 |
| A     | @   | 185.199.109.153 |
| A     | @   | 185.199.110.153 |
| A     | @   | 185.199.111.153 |
| CNAME | www | VOTRE-COMPTE.github.io |

**Ne touchez pas aux enregistrements MX, TXT (SPF/DKIM) et autodiscover** : ils font fonctionner les courriels.
Une fois le DNS propagé, cochez *Enforce HTTPS* dans *Settings → Pages*.

## Structure des URL

| Page | FR | EN |
|------|----|----|
| Accueil | `/` | `/en/` |
| À propos | `/a-propos/` | `/en/a-propos/` |
| Blogue | `/blog/` | `/en/blog/` |
| Articles | `/post/<slug>/` | `/en/post/<slug>/` |
| Services (hors menu) | `/raise-the-bar-of-your-corporate-pow/` | `/en/…` |
| Solutions commerce de détail (hors menu) | `/advanced-analytics-for-lightspeed-m/` | `/en/…` |

## Modifier le site

Les fichiers `index.html` sont du HTML simple : on peut les éditer directement.
Le style est dans `assets/style.css`.
