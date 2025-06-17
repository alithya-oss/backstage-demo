---
title: Ajouter des paramètres
description: Ajouter des paramètres de lancement modifiables par les utilisateurs
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

La séquence `.spec.parameters` déclare les paramètres de lancement du gabarit. Ces paramètres ce matérialisent sous la forme de champs de saisie dans l'interface du portail et de variables lors au sein des étapes rendu [Nunjucks](https://mozilla.github.io/nunjucks/templating.html).

Du point de vue de l'expérience utilisteur (UX), les paramètres reposent sur la spécification [React Json Schema Form](https://rjsf-team.github.io/react-jsonschema-form/) qui permet de restituer les formulaires simple, accéssibles, didactiques et agréable à utiliser. 

Ci-dessous les ressouces référence permettant de se familiariser avec les capacités de personnalistion des paramètres des gabarits logiciels:

Nom | Description | Référence
--- | --- | ---
**Snippets ExpDev** | Exemples de codage des paramètres fréquemment utilisé dans les Gabarits de Beneva | [doc](../02-quick-reference.md)
**Secrets** | Saisie de données confidentielles (Secrets) | [doc](https://backstage.io/docs/features/software-templates/writing-templates#using-secrets)
**RepoUrlPicker** | Ciblage de dépôt de code (Github, Gitlab, Azure DevOps, etc.) | [doc](https://backstage.io/docs/features/software-templates/writing-templates#the-repository-picker)
**user.entity** | Contexte contenant les information de l'utilisateur courant | [doc](https://backstage.io/docs/features/software-templates/writing-templates#accessing-the-signed-in-users-details)
**OwnerPicker** | Requête des données du catalogue dont l'uitlisateur courant est autorisé à consulter | [doc](https://backstage.io/docs/features/software-templates/ui-options-examples#ownerpicker)
**EntityPicker** | Requête de toutes les types entités du catalogue | [doc](https://backstage.io/docs/features/software-templates/ui-options-examples#entitypicker)
**MultiEntityPicker** | Requête simultanée de plusieurs type d'entités du catalogue | [doc](https://backstage.io/docs/features/software-templates/ui-options-examples#multientitypicker)


!!! tip "Conseil"

    Le liste des champs 
    Pour en savoir plus sur les possiblités d'agencement de page des gabarits, se référer à la documentation [React Schema Form](https://rjsf-team.github.io/react-jsonschema-form/docs/) et au [bac à sable associé](https://rjsf-team.github.io/react-jsonschema-form/).



Editer le manifeste `scaffolder-templates/create-fastapi-service/template.yaml`, puis modifier la section `.spec.parameters` afin de permettre aux utilisateus de saisr le nom du projet, selecitonner le demandeur, ainsi que son groupe d'appartenance.

> **Note**:
> L'exemple ci-dessous démontre comment créer des listes depuis le référentiel de du portail.
> Des exemples de paramètres sont disponibles dans la [documentation officielle de Backstage](https://backstage.io/docs/features/scaffolder-templates/input-examples)

!!! note "Guide de style"
    
    [Utiliser camel case pour nommer les paramètres](../01-style-guide.md#utiliser-camel-case-pour-nommer-les-paramètres-specparametersproperties)


```yaml title="scaffolder-templates/software-catalog/add-entities/template.yaml"
spec:
  parameters:
    - title: Information de base
      properties:
        target:
          title: "Cibler"
          description: "Définir le dépôt des sources de l'entité, ainsi que son propriétaire"
          type: object
          required: [entityOwner, locationExists]
          properties:
            entityRepoUrl:
              type: string
              ui:field: RepoUrlPicker
              ui:options:
                allowedHosts:
                  - gitlab.com
                allowedOwners:
                  - alithya-csna
                requestUserCredentials:
                  secretsKey: USER_OAUTH_TOKEN
            entityOwner:
              title: Propriétaire
              type: string
              ui:field: MyGroupsPicker
            locationExists:
              title: Localisation éxistante ?
              description: Le fichier catalog-info.yaml est-il déjà présent à la racine de ce dépôt ?
              type: boolean
              ui:widget: radio
```