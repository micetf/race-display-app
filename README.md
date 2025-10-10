# 🏃 Application Cross Scolaire d'Annonay

Application web moderne pour gérer l'affichage en temps réel des courses du Cross Scolaire d'Annonay 2025.

## 🚀 Installation rapide

### 1. Prérequis

-   Node.js 18+ ([Télécharger](https://nodejs.org/))
-   pnpm (installé via `npm install -g pnpm`)

### 2. Créer le projet

```bash
# Créer le projet Vite + React
pnpm create vite cross-annonay-app --template react

# Accéder au dossier
cd cross-annonay-app

# Installer les dépendances
pnpm install

# Installer Tailwind CSS
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Installer les dépendances supplémentaires
pnpm install react-router-dom lucide-react
```

### 3. Configuration de Tailwind

**Fichier `tailwind.config.js` :**

```js
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

**Fichier `src/index.css` :**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Structure des fichiers

Créer la structure suivante et copier les fichiers fournis :

```
src/
├── main.jsx
├── App.jsx
├── index.css
├── data/
│   └── courses.js          ← Données des 14 courses
├── hooks/
│   └── useBroadcastChannel.js
├── pages/
│   ├── ControlPage.jsx     ← Interface de contrôle
│   └── DisplayPage.jsx     ← Onglet d'affichage
└── components/
    ├── ImageDisplay.jsx
    ├── RaceDisplay.jsx
    └── RaceForm.jsx (optionnel)
```

### 5. Ajouter l'image du Cross

Placer l'image fournie dans le dossier `public/` :

```
public/
└── cross-annonay.jpg       ← Image d'accueil
```

## ▶️ Lancement

```bash
# Démarrer le serveur de développement
pnpm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173) dans le navigateur.

## 📱 Utilisation

### Mode Image

1. Cliquer sur le mode "Image d'accueil"
2. L'URL par défaut pointe vers l'affiche du Cross
3. Cliquer sur "Afficher l'image"

### Mode Course

1. Cliquer sur "Ouvrir l'affichage" (ouvre un nouvel onglet)
2. **Appuyer sur F11 dans l'onglet d'affichage pour le plein écran (format 16:9 optimisé)**
3. Dans le panneau de contrôle, sélectionner "Informations Course"
4. Naviguer entre les 14 courses avec les flèches ◀️ ▶️
5. Sélectionner la course du podium dans le menu déroulant
6. Remplir le podium (5 positions par défaut, possibilité d'en ajouter)
7. Cliquer sur "Mettre à jour l'affichage"
8. L'onglet d'affichage se met à jour instantanément

### 📺 Affichage 16:9

L'affichage est optimisé pour le format 16:9, idéal pour :

-   Projecteurs
-   Écrans de télévision
-   Présentations professionnelles

**Recommandations :**

-   Utiliser F11 pour le mode plein écran
-   Brancher sur un écran/projecteur 1920x1080 ou 3840x2160
-   L'interface s'adapte automatiquement au ratio 16:9

## 🎯 Fonctionnalités

✅ **14 courses pré-configurées** avec toutes les informations  
✅ **Navigation facile** entre les courses  
✅ **Affichage en temps réel** via BroadcastChannel  
✅ **Format 16:9 optimisé** pour projecteurs et écrans  
✅ **Podium flexible** : 5 positions par défaut, ajout illimité possible  
✅ **Gestion des ex-aequo** avec positions personnalisables  
✅ **Sélection indépendante** de la course du podium  
✅ **Design moderne** adapté à l'événement  
✅ **Aperçu du prochain départ**  
✅ **Mode plein écran** pour l'affichage public

## 🏆 Gestion du Podium

### Fonctionnalités avancées du podium

**5 positions par défaut** avec possibilité d'en ajouter autant que nécessaire.

**Positions éditables** pour gérer les ex-aequo :

```
Position | Nom              | Temps    | Actions
---------|------------------|----------|--------
   1     | Premier          | 10:23    | [×]
   2     | Deuxième         | 10:45    | [×]
   3     | Ex-aequo A       | 11:02    | [×]
   3     | Ex-aequo B       | 11:02    | [×]  ← Même position
   5     | Cinquième        | 11:15    | [×]

[+ Ajouter une position]
```

**Sélection indépendante** : Le podium peut correspondre à n'importe quelle course, pas forcément celle en cours.

**Affichage intelligent** :

-   🥇 Or pour la 1ère place
-   🥈 Argent pour la 2ème place
-   🥉 Bronze pour la 3ème place
-   🔵 Bleu pour les autres positions
-   Scroll automatique si plus de 8-9 positions

## 🎨 Données des courses

Les 14 courses sont définies dans `src/data/courses.js` :

-   **Course 1** : BG 2013 - 13h10 - 2500m P3 - Blanc
-   **Course 2** : BF 2013 - 13h20 - 2000m P2 - Blanc
-   **Course 3** : BG 2013-2014 - 13h30 - 2500m P3 - Couleur
-   ... (11 autres courses)
-   **Course 14** : CG 2 + JG 2009 et avant - 16h05 - 3000 P4 - Blanc

## 🔧 Personnalisation

### Modifier une course

Éditer `src/data/courses.js` et modifier les propriétés souhaitées.

### Changer les couleurs

Dans `src/data/courses.js`, la fonction `getCouleurHex()` mappe les couleurs :

```js
'Blanc': '#ffffff',
'Couleur': '#3b82f6'  // Modifier cette valeur
```

### Adapter l'affichage

Modifier `src/components/RaceDisplay.jsx` pour personnaliser le layout.

## 📦 Build de production

```bash
# Créer le build optimisé
pnpm run build

# Prévisualiser le build
pnpm run preview
```

Les fichiers de production seront dans le dossier `dist/`.

## 🌐 Déploiement

Le dossier `dist/` peut être déployé sur :

-   Netlify
-   Vercel
-   GitHub Pages
-   Serveur web classique

## 💡 Conseils d'utilisation

1. **Affichage plein écran** : Appuyer sur F11 dans l'onglet d'affichage
2. **Écran secondaire** : Faire glisser l'onglet d'affichage sur un projecteur/TV
3. **Actualisation** : L'affichage se met à jour instantanément sans rechargement
4. **Navigation rapide** : Utiliser les flèches du clavier (si focus sur les boutons)

## 🐛 Résolution de problèmes

### Les onglets ne se synchronisent pas

-   Vérifier que les deux onglets sont ouverts depuis le même domaine
-   BroadcastChannel nécessite le même origine (protocole + domaine + port)
-   Ouvrir la console (F12) pour voir les messages de debug

### L'image ne s'affiche pas

-   Vérifier que l'image est bien dans `public/cross-annonay.jpg`
-   Vérifier l'URL dans le champ (doit commencer par `/` pour les fichiers locaux)

### Erreur au démarrage

```bash
# Nettoyer et réinstaller
rm -rf node_modules
pnpm install
```

## 📞 Support

Pour toute question, consulter la documentation :

-   [React](https://react.dev/)
-   [Vite](https://vitejs.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)

---

**Bon Cross ! 🏃‍♂️🏃‍♀️**
