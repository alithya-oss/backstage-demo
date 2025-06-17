---
title: Ajouter des étapes
description: Ajouter des étape de transformation et de publication
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

La séquence `parameters.steps` déclare les étapes _(actions)_ d'intégration, de transformation et de publication des fichiers dans le dépôt cible. Ces actions sont exécutés dans l'ordre dans lequel elle sont rédigées au sein du fichier `template.yaml`.

```mermaid
flowchart LR
    start([Début])
    stop([Fin])

    subgraph parameters
      param[Adminission
            des paramètres]
    end

    subgraph steps
      step1[Téléchargement
            et transformation
            du squelette
            de dépôt cible]
      
      step2[Téléchargement
            de fichiers
            statiques]
      step3[Fusion 
            de structures
            de données
            YAML/JSON]
      
      step4[Publication Pull-request
            dans le dépôt cible]
    end

    subgraph output
      out[Hyperlien vers la PR
          Hyperlien vers le catalogue
          Information]
    end

    start --> param
    param --> step1
    step1 --> step2
    step2 --> step3
    step3 --> step4
    step4 --> output
    output --> stop
```

L'exemple ci-dessous démontre le pipeline de livraison décrit ci-dessus, ainsi la mise oeuvre d'étapes:

- De champs optionnels sous le contrôle de l'utilisateur.
- De 




!!! tip "Conseils"

    La liste des actions supportées est disponible sein même du portail ([/create/actions](https://backstage.dev.alithya-mws.com/create/actions)).
    
    Afin d'acclérrer et uniformiser le développement des gabarits, l'équipe Expérience développeur maintient églement divers [extraits codes](../02-quick-reference.md) prêts à l'emploi.

