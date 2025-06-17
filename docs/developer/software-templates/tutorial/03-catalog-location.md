---
title: Déclarer la localisation du dépôt
description: Déclarer la localisisation du dépôt pour l'indexation dans le portail
keywords:
  - backstage
  - software-templates
  - templates
  - developpement
  - gabarit-logiciel
  - gabarit
  - development
  - git
  - github
draft: true
---

Le moteur de découverte et d'indexation du portail requête tous les dépôts contenant à la racine un fichier `catalog-info.yaml`.

Dans le cas des gabarits logiciels ce fichier doit contenir un manifeste de type [Location](https://backstage.io/docs/features/software-catalog/descriptor-format#kind-location) qui déclare la liste de fichiers et/ou hyperliens que le moteur doit importer individuellement dans le [magasin de gabarits](https://backstage.dev.alithya-mws.com/create). 

A la racine du dépôt, créer un fichier `catalog-info.yaml` déclarant la localisation des gabarits à publier dans le portails.

> Remplacer **{{ nom équipe }}** par l'acronyme votre équipe en **minusucule**.

```yaml
---
# https://backstage.io/docs/features/software-catalog/descriptor-format/#kind-location
apiVersion: backstage.io/v1alpha1
kind: Location
metadata:
  name: {{ nom équipe }}-templates
  namespace: alithya-csna
  title: Gabratis logiciels {{ nom équipe}}
  description: Gabarits logiciels de l'équipe {{ nom équipe }}
spec:
  targets: []
```

!!! tip "Remarques"

    A ce stade, la liste des fichiers cible `spec.targets` est vide. Elle sera alimentée une fois le gabarit prêt pour la publication dans portail.