# 💾 Système de Persistance des Podiums

## Fonctionnalités

Le système sauvegarde automatiquement tous les podiums dans le navigateur (localStorage). Les données persistent même après :

-   Rechargement de la page (F5)
-   Fermeture du navigateur
-   Redémarrage de l'ordinateur

## Comment ça fonctionne

### Sauvegarde automatique

-   ✅ **Chaque modification est sauvegardée instantanément**
-   Ajout/modification d'un nom ou temps
-   Changement de position
-   Ajout/suppression de lignes
-   Changement de course du podium

### Indicateurs visuels

**Dans le sélecteur de course :**

```
✓ Course 3 - BG 2013-2014 (13h30)  ← Podium déjà sauvegardé
  Course 4 - BF 2013-2014 (13h40)  ← Podium vide
```

**Sous le sélecteur :**

-   `💾 Sauvegardé` s'affiche si la course a des données

**En bas du formulaire :**

-   `💾 Sauvegarde automatique à chaque modification`

**En bas de page :**

-   Compteur : `X course(s) avec podium sauvegardé`

## Gestion des données

### Effacer un podium

Bouton **"🗑️ Effacer ce podium"** sous la liste des participants :

-   Efface uniquement le podium de la course sélectionnée
-   Demande confirmation
-   Remet 5 positions vides

### Effacer tous les podiums

Bouton **"🗑️ Effacer tous les podiums"** en bas de page :

-   ⚠️ Efface TOUS les podiums de TOUTES les courses
-   Demande double confirmation
-   À utiliser uniquement en fin d'événement ou pour recommencer

## Scénarios d'utilisation

### Scénario 1 : Saisie progressive

1. Vous saisissez le podium de la course 1
2. Vous passez à la course 2
3. **Le podium de la course 1 est conservé**
4. Vous pouvez revenir sur la course 1 : le podium est toujours là

### Scénario 2 : Après un crash

1. Le navigateur plante ou l'ordinateur redémarre
2. Vous relancez l'application
3. **Tous les podiums saisis sont toujours là**
4. Vous pouvez continuer où vous en étiez

### Scénario 3 : Correction

1. Vous affichez le podium de la course 5
2. Vous réalisez une erreur dans le podium de la course 3
3. Vous changez le sélecteur vers "Course 3"
4. **Le podium de la course 3 s'affiche automatiquement**
5. Vous corrigez l'erreur
6. Vous revenez sur la course 5
7. **Le podium de la course 5 est intact**

### Scénario 4 : Fin de journée

1. Fin de l'événement
2. Vous cliquez sur "Effacer tous les podiums"
3. Toutes les données sont supprimées
4. L'application est prête pour la prochaine utilisation

## Structure des données sauvegardées

Les données sont stockées dans le navigateur sous cette forme :

```json
{
    "course1": [
        { "position": "1", "name": "Jean Dupont", "time": "10:23" },
        { "position": "2", "name": "Marie Martin", "time": "10:45" },
        { "position": "3", "name": "Pierre Durand", "time": "11:02" }
    ],
    "course3": [
        { "position": "1", "name": "Sophie Bernard", "time": "8:45" },
        { "position": "2", "name": "Luc Petit", "time": "9:12" }
    ]
}
```

## Limites et considérations

### Capacité de stockage

-   localStorage peut stocker environ 5-10 MB
-   Largement suffisant pour les 14 courses avec podiums étendus
-   Pas de limite pratique pour cette application

### Sauvegarde par navigateur

-   Les données sont liées au navigateur utilisé
-   Si vous changez de navigateur ou d'ordinateur, les données ne suivent pas
-   Solution : utiliser toujours le même poste de contrôle

### Sécurité des données

-   Les données restent locales (pas d'envoi sur Internet)
-   Elles sont conservées indéfiniment jusqu'à suppression manuelle
-   Nettoyage recommandé après chaque événement

## Bonnes pratiques

### Pendant l'événement

✅ Saisissez les podiums au fur et à mesure  
✅ Vérifiez les données avant d'afficher  
✅ Utilisez F5 pour recharger si besoin (les données restent)  
✅ Corrigez les erreurs quand vous les voyez

### Après l'événement

✅ Exportez ou notez les résultats finaux si nécessaire  
✅ Cliquez sur "Effacer tous les podiums"  
✅ Vérifiez que le compteur indique "0 course(s)"

### En cas de problème

Si les données semblent corrompues ou incorrectes :

1. Ouvrir la console du navigateur (F12)
2. Onglet "Console"
3. Taper : `localStorage.removeItem('cross-annonay-podiums')`
4. Recharger la page (F5)
5. Recommencer la saisie

## Export manuel des données (si nécessaire)

Si vous souhaitez récupérer toutes les données :

1. Ouvrir la console (F12)
2. Taper :

```javascript
console.log(localStorage.getItem("cross-annonay-podiums"));
```

3. Copier le résultat JSON
4. Sauvegarder dans un fichier texte

## Questions fréquentes

**Q : Les données sont-elles synchronisées entre les onglets ?**  
R : Non, mais le BroadcastChannel synchronise l'affichage. La sauvegarde se fait dans l'onglet de contrôle.

**Q : Que se passe-t-il si je ferme le navigateur par erreur ?**  
R : Rien n'est perdu ! Relancez l'application, tout est sauvegardé.

**Q : Puis-je avoir plusieurs événements en parallèle ?**  
R : Non, car les données partagent le même espace de stockage. Utilisez des navigateurs différents ou effacez entre chaque événement.

**Q : Les données sont-elles sécurisées ?**  
R : Elles restent sur votre ordinateur, personne d'autre n'y a accès via Internet.

---

**Cette fonctionnalité vous permet de travailler en toute sérénité, sans risque de perdre vos saisies !** 💾✨
