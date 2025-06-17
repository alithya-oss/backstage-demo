---
title: Développement des gabarits logiciel
description: Tutoriel de développement des gabarits locigiels
draft: false
---

Ce tutoriel décit pas-à-pas les étapes q'un développeur doit réaliser afin de publier un Gabarit Logiciel (Software Template) dans le portail développeur d'Alithya.

## Objectifs d'apprentissage

L'objectif de ce tutoriel est d'apprendre comment:

1. Créer un dépôt Git
2. Initialiser la structure de dossiers conforme à la hiérarchie de sockage Alithya
3. Déclarer la localisation du dépôt pour l'ingestion dans le portail.
2. Explorer les opération (i.e `action`) supporté par le portail.
3. Initialiser un Gabarit Logiciel spécifiant les opérations à réaliser (i.e. `template.yaml`)
4. Ajouter une une structure de répertoire (i.e. `skeleton`) comprendant des fichiers statiques et des modèles au format [Mozilla Nunjucks](https://mozilla.github.io/nunjucks).

## Références:

* [Liste des actions disponibles](https://backstage.dev.alithya-mws.com/create/actions)
* [Spécification YAML des gabarits logiciels](https://backstage.io/docs/features/software-catalog/descriptor-format)
* [Rendu de fichiers Nunjucks](https://mozilla.github.io/nunjucks/templating.html)
* [Spécifités syntaxique de Beneva](../01-style-guide.md)