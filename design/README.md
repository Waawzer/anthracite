# 🎨 Design Assets - Anthracite Apps

Ce dossier contient les éléments visuels créés pour les réseaux sociaux d'Anthracite Apps.

## 📁 Fichiers disponibles

### 🔶 Logo X/Twitter
- **Fichier** : `logo-x.svg`
- **Dimensions** : 400x400px (format carré)
- **Usage** : Photo de profil X/Twitter
- **Caractéristiques** :
  - Fond sombre (#0a0a0a) cohérent avec le site
  - Design unifié avec hexagone central
  - Cercles orbitaux en constellation
  - Triangles internes animés en rotation
  - Lignes de connexion pulsantes
  - Gradients rose → violet → cyan
  - Effets de glow harmonieux

### 🔶 Bannière X/Twitter
- **Fichier** : `banniere-x.svg`
- **Dimensions** : 1500x500px (format bannière)
- **Usage** : Image de couverture X/Twitter
- **Caractéristiques** :
  - Design horizontal avec double hexagone central
  - Zones de glow colorées (gauche, droite, centre)
  - Grille de fond subtile
  - Cercles orbitaux en constellation
  - Triangles multiples en rotation
  - Lignes de connexion formant une toile
  - Design purement graphique sans texte

## 🎨 Palette de couleurs utilisée

```css
/* Gradients principaux */
Rose : #ec4899
Violet : #8b5cf6  
Cyan : #06b6d4

/* Couleurs secondaires */
Rose clair : #f0abfc
Bleu : #818cf8
Cyan clair : #7dd3fc

/* Arrière-plans */
Sombre : #0a0a0a
Sombre-violet : #1a1a2e
```

## 🔧 Formats et conversion

### SVG (Recommandé)
- Vectoriel, haute qualité à toute taille
- Animations intégrées
- Taille de fichier optimisée

### Conversion en PNG (si nécessaire)
Pour convertir en PNG haute résolution :

```bash
# Avec Inkscape
inkscape --export-png=logo-x.png --export-width=800 --export-height=800 logo-x.svg
inkscape --export-png=banniere-x.png --export-width=1500 --export-height=500 banniere-x.svg

# Avec ImageMagick
convert logo-x.svg -resize 800x800 logo-x.png
convert banniere-x.svg -resize 1500x500 banniere-x.png
```

## 📐 Spécifications techniques

### Logo X/Twitter
- **Format** : Carré 1:1
- **Dimensions recommandées** : 400x400px minimum
- **Fond** : Sombre (#0a0a0a) pour contraste optimal
- **Animations** : Oui (rotations hexagonales, pulsations orbitales, connexions)
- **Structure** : Hexagone central avec cercles orbitaux connectés

### Bannière X/Twitter  
- **Format** : Panoramique 3:1
- **Dimensions recommandées** : 1500x500px
- **Zone de sécurité** : Design centré sans texte pour éviter les coupures
- **Responsive** : Adapté aux différentes tailles d'écran
- **Structure** : Double hexagone avec constellation orbitale

## 🎯 Utilisation recommandée

1. **Télécharger les fichiers SVG** directement pour une qualité optimale
2. **Tester les animations** - certaines plateformes peuvent ne pas les supporter
3. **Prévoir des versions statiques** si nécessaire
4. **Respecter les dimensions** pour éviter les déformations

## 🌐 Changement de langue avec transition

Le site dispose d'un système de changement de langue avec transition fluide :

### 🔄 **Fonctionnalités :**
- **Bouton de langue** : Design épuré avec labels FR/EN (sans drapeaux)
- **Transition en fondu** : Effet de fondu fluide lors du changement de langue
- **Sauvegarde automatique** : Préférence de langue sauvegardée localement
- **Animations** : Effets de scale et couleur sur la langue active

### 🎨 **Design du bouton :**
- **Style** : Minimaliste avec fond semi-transparent
- **Séparateur** : Ligne verticale entre FR et EN
- **Feedback visuel** : Mise en évidence de la langue active
- **Transitions** : Animations fluides pour tous les changements d'état

## 🔄 Cohérence de marque

Ces designs reprennent fidèlement l'identité visuelle du site :
- ✅ Les couleurs du site Anthracite Apps
- ✅ Les formes géométriques des animations (hexagones, cercles, triangles)
- ✅ Les effets de glow et particules
- ✅ Le style unifié et harmonieux
- ✅ L'esthétique tech et moderne
- ✅ Design purement graphique adapté aux réseaux sociaux
- ✅ Transitions fluides et animations cohérentes

## 📞 Support

Pour toute modification ou adaptation de ces designs, référez-vous aux fichiers sources du site dans `/src/components/animations/` et `/src/app/globals.css`. 