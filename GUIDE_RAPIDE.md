# 🏃 Guide Rapide - Cross Scolaire d'Annonay

## ⚡ Démarrage rapide

### 1. Préparation (15 min avant)

```bash
# Lancer l'application
cd cross-annonay-app
pnpm run dev
```

1. Ouvrir le navigateur : `http://localhost:5173`
2. Cliquer sur **"Ouvrir l'affichage"**
3. Dans l'onglet d'affichage : **Appuyer sur F11** (plein écran)
4. Déplacer l'onglet d'affichage vers le projecteur/écran
5. Afficher l'image d'accueil

### 2. Pendant l'événement

#### 🖼️ Afficher l'image d'accueil

1. Mode "Image d'accueil"
2. Cliquer sur "Afficher l'image"

#### 🏁 Démarrage d'une course

1. Mode "Informations Course"
2. Naviguer vers la course avec ◀️ ▶️
3. Vérifier que le prochain départ est correct
4. Cliquer sur "Mettre à jour l'affichage"

#### 🏆 Afficher un podium

1. Dans "Course du podium à afficher", sélectionner la course
2. Remplir les positions (nom + temps)
3. Pour un ex-aequo : mettre la même position (ex: 3, 3, 5)
4. Ajouter des positions si nécessaire (bouton "+")
5. Cliquer sur "Mettre à jour l'affichage"

## 📋 Checklist du jour J

-   [ ] Ordinateur branché et chargé
-   [ ] Projecteur/écran connecté
-   [ ] Application lancée (`pnpm run dev`)
-   [ ] Onglet d'affichage ouvert et en plein écran (F11)
-   [ ] Image d'accueil affichée
-   [ ] Test de synchronisation effectué
-   [ ] Liste des courses vérifiée

## 🎯 Scénarios courants

### Scénario 1 : Course en cours

**Objectif** : Afficher la course 5 qui démarre

1. ◀️ ou ▶️ jusqu'à "Course 5"
2. Vérifier l'heure et la catégorie
3. "Mettre à jour l'affichage"

### Scénario 2 : Podium d'une course terminée

**Objectif** : Afficher le podium de la course 3 alors que la course 5 est en cours

1. Naviguer jusqu'à la course 5 (en cours)
2. Dans "Course du podium", sélectionner "Course 3"
3. Remplir les résultats de la course 3
4. "Mettre à jour l'affichage"
5. L'écran affiche : Course 5 en cours + Podium de la course 3

### Scénario 3 : Ex-aequo en 2ème position

**Objectif** : Deux coureurs à égalité en 2ème

```
Position | Nom              | Temps
---------|------------------|-------
   1     | Sophie Martin    | 8:45
   2     | Jean Dupont      | 9:12
   2     | Luc Bernard      | 9:12  ← Même position
   4     | Marie Petit      | 9:25  ← On saute le 3
```

### Scénario 4 : Podium avec plus de 5 participants

**Objectif** : Afficher le top 10

1. Remplir les 5 premières lignes
2. Cliquer sur "+ Ajouter une position" 5 fois
3. Remplir les positions 6 à 10
4. "Mettre à jour l'affichage"

## 🚨 Dépannage rapide

### L'affichage ne se met pas à jour

1. Vérifier que les deux onglets sont ouverts
2. Ouvrir la console (F12) pour voir les messages
3. Fermer et rouvrir l'onglet d'affichage

### L'image ne s'affiche pas

1. Vérifier que l'image est dans `public/cross-annonay.jpg`
2. Essayer une URL complète : `https://...`

### Le format ne semble pas 16:9

1. Appuyer sur F11 pour le plein écran
2. Vérifier que le navigateur est en mode plein écran
3. Redimensionner la fenêtre si nécessaire

### Le podium ne s'affiche pas

1. Vérifier qu'au moins un nom est rempli
2. Cliquer sur "Mettre à jour l'affichage"
3. Vérifier dans l'onglet d'affichage

## ⌨️ Raccourcis utiles

| Touche | Action                                  |
| ------ | --------------------------------------- |
| F11    | Plein écran (dans l'onglet d'affichage) |
| F5     | Recharger la page                       |
| Ctrl + | Zoom avant                              |
| Ctrl - | Zoom arrière                            |
| Ctrl 0 | Réinitialiser le zoom                   |

## 📱 Organisation recommandée

**Configuration idéale :**

```
┌─────────────────┐         ┌─────────────────┐
│   Ordinateur    │         │  Projecteur     │
│   de contrôle   │  HDMI   │    16:9         │
│                 ├────────►│                 │
│  Panneau de     │         │   Affichage     │
│  contrôle       │         │   public        │
└─────────────────┘         └─────────────────┘
```

**Sur l'ordinateur :**

-   Écran principal : Panneau de contrôle
-   Écran secondaire (projecteur) : Affichage public en plein écran

## 💡 Astuces

1. **Préparer les podiums à l'avance** : Vous pouvez saisir les résultats au fur et à mesure sans les afficher
2. **Navigation rapide** : Utilisez ◀️ ▶️ plutôt que le menu déroulant
3. **Vérification visuelle** : Le badge à côté de "Classement Podium" montre quelle course correspond
4. **Bouton Sync** : Utilise-le pour synchroniser rapidement le podium avec la course en cours
5. **Image entre les courses** : Afficher l'image d'accueil entre deux courses

## 📞 Support

En cas de problème technique majeur :

1. Fermer complètement le navigateur
2. Relancer : `pnpm run dev`
3. Rouvrir les deux onglets
4. Tester avec une course simple

---

**Bon événement ! 🏃‍♂️🏃‍♀️🎉**
