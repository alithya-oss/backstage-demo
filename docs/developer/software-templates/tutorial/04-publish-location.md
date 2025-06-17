---
title: Publier la localisation
description: Soumettre la pull-request et consulter l'indexation dans le catalogue du portail
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

![architecture](../../../diagrams/backstage-software-templates-reconcile-v1.drawio.svg){ align=right width="600"}

L'instance en environnement de développement inspecte continuellement les branches préfixées`PR-` générées par Github au moment de la soumission de [Pull-Request](https://docs.github.comen/pull-requests/collaborating-with-pull-requestsproposing-changes-to-your-work-with-pull-requests/about-pull-requests).
Il est préconisé d'activer le mode brouillon (ref. [Draft](https://docs.github.com/enpull-requests/collaborating-with-pull-requestsproposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests))lors de la soumission initiale afin neutraliser toutes fusion accidentelle avant la revue parles pairs.

## Tâches

Indexer les modifications du dépôt dans la file d'attente, puis enregister les modifications dans le journal Git.


```bash
git add .
git commit -m 'Création de la structure de dépôt de gabarits logiciels'
```

Pousser les modifications dans Github.

```bash
git push --set-upstream origin 'feature/init'
```

Créer la Pull-Request.

```bash
gh pr create --draft \
  --title "Initialisation du dépêt de gabarits" \
  --body "# Change log $(date +'%Y-%m-%d')\n\nInitialisation du dépôt de gabarits logiciels"
```

!!! tip "Remarques"

    Il est normal à ce stade que la PR ne contienne que le fichier `catalog-info.yaml`. Les dossiers vides ne sont pas enregistré dans l'historique de version de Git.

