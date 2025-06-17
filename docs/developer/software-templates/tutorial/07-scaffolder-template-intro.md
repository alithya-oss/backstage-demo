---
title: Le manifeste du gabarit
description: Concepts relatifs à la rédaction des gabarits
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

Un gabarit se conrétise par un manifeste créé à l'aide du schéma de données [`scaffolder.backstage.io/v1beta3`](https://github.com/backstage/backstage/blob/master/plugins/scaffolder-common/src/Template.v1beta3.schema.json). 4 specifications majeures sont à distinguer:

Spécification | Description
--- | ---
`.metadata` | Spécifie métadonnées adjointes au gabarit. Permet notamment d'ajouter des données de classification ([labels](https://backstage.io/docs/features/software-catalog/descriptor-format#labels-optional), [tags](https://backstage.io/docs/features/software-catalog/descriptor-format#tags-optional)), des références croisées pour les plugins du catalogue logiciel ([annotations](https://backstage.io/docs/features/software-catalog/descriptor-format#annotations-optional)), des liens de référence ([links](https://backstage.io/docs/features/software-catalog/descriptor-format#links-optional))
`.spec.parameters` | Spécifie la séquence des paramètres de lancement du gabarie. Il servent de variables lors de l'exécution du rendu et se martérialisent sous la forme de champs de saisie lorsque le formulaire est publié dans le portail.
`.spec.steps` | Spécifie la séquence d'exécution des tâches d'adminission, de rendu, et de publication des fichiers finaux poussés dans le dépôt Git distant.
`spec.output` | Spécifie la séquence de données du rapport utilisateur suite au succès de la publication. Exemple: URL résultant d'une pull-request.
