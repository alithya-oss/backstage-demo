---
title: Initialiser le manifeste du gabarit
description: Créer le manifeste selon la spécification Template et alimenter les métadonnées de base
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

!!! tips "Convention de nommage"
    * Les champs `name` DOIVENT être rédigés selon la norme [Camel Case](https://en.wikipedia.org/wiki/Camel_case).
    * Le champ `.metadata.name` DOIT commencer par un verbe à l'infinitif.
    * Le nom du propriétaire DOIT être nommé selon la liste des [groupes disponible depuis le portail](https://backstage.dev.alithya-mws.com/catalog?filters%5Bkind%5D=group&filters%5Buser%5D=all)
    * Le champs `type` DOIT sélectionné parmis la liste suivante:
      * **documentation**: modèles de documents Markdown ou de ressources catalog-info.yaml
      * **tool**: fournitures d'outils (e.g Github)
      * **service**: modèle de développement de services d'arrière plan applicatif / serveur API/RPC
      * **website**: modèle de développement de frontaux Web
      * **library**: modèle de développement librairie applives (npm, pip, jar, etc.)
      * **app**: modèle de développement d'application (client lourd, mobile, etc.)
      * **apis**: modèle de définition d'API (e.g OpenAPI spec)
      * **other**: _A éviter_

Créer un fichier nommé `template.yaml` dans le dossier `scaffolder-templates/create-fastapi-service/`.

```yaml title="scaffolder-templates/create-fastapi-service/template.yaml"
---
# doc: https://backstage.io/docs/features/software-catalog/descriptor-format#kind-template
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: createFastApiService
  title: Créer un service web FastAPI
  description: Création d'un dépôt de code conforme
  annotations:
    gitlab.com/project-slug: alithya-csna/{{ division}}/{{ équipe }}/software-templates
    backstage.io/techdocs-ref: dir:.
  tags: [tutorial, python, fastapi, github]
  links:
    - title: PEP-518
      icon: doc
      type: docs
      url: https://peps.python.org/pep-0518/
spec:
  owner: group:{{ nom du groupe dans le portail }}
  type: service
  parameters: []
  steps: []
  output: []
```
