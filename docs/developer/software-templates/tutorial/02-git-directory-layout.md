---
title: Créer les répertoires de base
description: Créer la structure hiérarchique des répertoires stockage des fichiers
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
  - fhs
draft: true
---


Suivant le principe de séparation des préocupation, la structure de stocakge des gabaritcomprend plusieurs dossier permettant d'identifier leurs natures et favoriser la réutilisation par références croisées.

!!! Note Guide de style

    [Organiser les répertoires racines](../01-style-guide.md#organiser-les-répertoires-racines)


Télécharger localement la branche `main` du dépôt créé lors de l'[étape précédente](../step2/README.md).

> Remplacer **{{ nom équipe }}** par l'acronyme votre équipe.

```bash
git clone --fetch-single-branch --branch 'main' \
https://gilab.com/alithya-csna/{{ division }}/{{ nom équipe }}/software-templates
```

Créer une branche depuis la branche `main`.

```bash
git checkout --b feature/init
```

à la racine du dépôt, créer la structure de répertoire suivante:

```bash
cd {{ nom équipe }}-templates

mkdir --parents \
  'docs' \
  'actions' \
  'documentation-templates' \
  'skeletons' \
  'scaffolder-templates'
```
