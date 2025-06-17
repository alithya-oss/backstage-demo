---
title: Guide de style des Gabarits Logiciels
description: Directives de nommage et de formattage des gabarits logiciels
---

Cette page fournie des directives de style d'écriture au sein des fichier et répertoire des gabarits logiciels développé par Alithya.
Il s'agit de lignes directrices, pas de règles. Il important de faire preuve de discernement et de ne pas hésiter à proposer des modification à ce document à l'aide d'une pull-request.

!!! note

    Ce document est formatté de manière à être publié dans le module [Techdocs](https://backstage.io/docs/features/techdocs/) du Portail Développeur et enrichie à l'aide du module [MkDocs Material](https://squidfunk.github.io/mkdocs-material/reference/) pour la mise en page.

## Language

La documentation du portail développeur utilise le français comme langue de référence.
Cependant les éléments de code source sont essentiellement rédigés en anglais afin d'éviter les problème d'injestion des caractères spéciaux au sein du portail.

## Normes de formattage des gabarits

### Nommer correctement le dépôt Git

Le moteur de découverte et d'importation des gabarits locigiels intégré au portail scane continuellement les dépôts de l'organisation Gitlab `alithya-csna`.
Pour que l'importation soit effective il est important de respecter la convention de nommage suivante:

1. Le nom du dépôt de gabarit ne peut contenir que des caractères **minuscule** séparé par des tirets `-`
2. Le nom du dépôt doit se terminer par le suffixe `-templates`
3. Le nom du dépôt dépôt de gabarits doit être préfixé avec l'acronyme du nom de l'équipe qui maintient le code
4. Le dépôt de gabaritS doit être publiés dans un dépôt Gitlab dans l'organisation `alithya-csna`

A faire | A éviter
--- | ---
`alithya-csna/cloud/aws/software-templates` | `alithya-csna/cloud/aws/AWS-templates`
`csna-aws-templates` | `Gabarits-AWS-Du-CSNA`

### Utiliser pour kebab case pour les dossiers et fichiers

!!! warning
    Cette norme ne s'applique pas aux squellettes de dépôt (`skeleton`) où il est préconisé d'utiliser la convention syntaxique en vigueur dans le language employé (ex. Snake case pour Python).

La convention de nommage Kebab Case est en vigueur au sein du dépôt de gabarit logiciel.

1. Le nom des dossier et fichiers ne peut contenir que des caractères **minuscule** séparé par des tirets `-`
2. les caratère spéciaux sont interdit (ex. é, è, a, etc).

A faire | A éviter
--- | ---
`scaffolder-templates/lambda/create-lambda-typescript/template.yaml` | `scaffolder-templates/LambdaTypeScript/template.yaml`
`skeletons/python3/fastapi/${{ moduleName }}/app.py` | `Skeletons/Python3/FastAPI/${{ moduleName }}/app.py

### Organiser les répertoires racines

Suivant le principe de séparation des préocupations, le code et la documentation des gabarits logiciels doit être écrit dans l'un des répertoires suivant:

| Répertoire | Description | Obligatoire
| --- | --- | --- |
| `docs/` | Stocke la documentation; au format Markdown/[Mkdocs Material](https://squidfunkgithub.io/mkdocs-material/reference/); ingérée, puis restituée par le portail. | **oui**
| `scaffolder-templates/` | Stocke les gabarits publié dans le portail. Notamment les manifestesd'exécution des gabarits `template.yaml`, mais aussi; selon le cas d'usage; des squelettes(`skeleton`) spécifiques. | **oui**
| `skeletons/` | Stocke les structure de répertoires , les modèles de document Markdown, lesscripts et fichiers de code source réutilisable entre les dépôts de code source lessoumissions de processus d'approvisionnement. | non
| `documentation-templates/` | Modèles de documents génériques au format Markdownréutilisablespar les gabarits | non
| `actions/` | Stocke les modules Typescript achevant des étapes spécifiques dans le flux derendu des gabarits. | non

**Exemple**

```
actions/
docs/
documentation-templates/
scaffolder-templates/
skeletons/
```

### Organiser les données au sein d'une même catégorie

Dans le cas où des structures de données communes à plusieurs gabarits doivent être partagées à l'aide de la fonction des [substitutions `$text`, `$yaml` ou `$json`](https://backstage.io/docs/features/software-catalog/descriptor-format/#substitutions-in-the-descriptor-format), le fichier doit être stocké dans un **sous-répertoire nommé `common`**.

**Exemple**

```
skeletons/
    common/
        catalog-info.yaml  # Contient une ressource "Kind: Location"
    react-app/
        template.yaml
    lambda/
        template.ayml
```

A faire | A éviter
--- | ---
`scaffolder-templates/common/parameters/finops.yaml` | `common/finops-parameters.yaml`
`scaffolder-templates/common/stages/environments.yaml` | `scaffolder-templates/lib/stages/env.yaml`

### Préfixer le dossier gabarits avec un verbe

Un gabarit peut être utilisé pour créer, mettre à jour, ou supprimer des fichiers.

Utiliser un des verbes suivants comme préfix du nom du dossier du projet de gabarit logiciel.

* **`create`**: Créer des ressources ou fichiers dans un nouveau dépôt
* **`add`**: Ajouter des ressources ou fichiers dans un dépôt existant
* **`update`**: Modifier ou actualiser des ressources ou fichiers dans un dépôt existant
* **`replace`**: Remplacer ou actualiser des ressources ou fichiers dans un dépôt existant
* **`delete`**: Supprimer des ressources ou fichier dans un dépôt existant

A faire | A éviter
--- | ---
`scaffolder-templates/create-lambda-typescript/template.yaml` | `scaffolder-templates/lambda-typescript/template.yaml`
`scaffolder-templates/update-adr-template/template.yaml` | `scaffolder-templates/update-adr-template/template.yaml`

### Définir le nom du gabarit (`metadata.name`)

Le champ `metadata.name` doit correspondre au [nom du dossier de gabarit](#préfixer-le-dossier-gabarits-avec-un-verbe) selon la norme [Utiliser pour kebab case pour les dossiers et fichiers](#utiliser-pour-kebab-case-pour-les-dossiers-et-fichiers)

A faire | A éviter
--- | ---
`create-lambda-typescript` | `CreateLambdaTypecript`
`add-github-workflow` | `add_github_workflow`
`replace-jenkins-by-github-actions` | `replaceJenkinsByGithubActions`

### Définir le titre du Gabarit (`metadata.title`)

Le champs `metadata.title` est utilisé pour alimenter la barre de titre de la carte dans le magasin, ainsi dans le nom affiché dans le catalogue logiciel.

1. Utiliser un verbe à l'infinitif en début de titre: (ex. Créer, Ajouter, Modifier, etc.)
2. Hormis les noms propres, seul le premier mot prend une majuscule.
4. Utiliser un titre le plus court possible
3. Privilégier la séquence `metadata.tags` pour renseigner le cadre technologique de la livraison

A faire | A éviter
--- | ---
Créer une fonction TypeScript | Lambda Typescript
Créer un dépôt Github | Gabarit de création d'un repo Github

### Marquer de cycle de vie (`metadata.tags[]<recommended | experimental>`)

Le champs `metadata.tags` est utilisé au sein du magasin pour classifier les cartes selon de niveau de stabilité estimé par le développeur du gabarit.

* **recomended**: Informe les utilisateurs que le gabarit logiciel est stable et prêt pour la production régulière.
* **preview**: Informe les utilisateur que le gabarit est en phase d'acceptation.
* **experimental**: Informe les utilisateus que le gabarit est instable, en phase d'acceptation, ou succéptible de changer

!!! note
    L'instance du portail en production n'affiche que les cartes des marqué

A faire | A éviter
--- | ---
experimental | lab
experimental | dev
preview | test
preview | uat
recommended | prod

### Définir le type de gabarit (`spec.type`)

Le champ `spec.type` des gabarits logiciels se réfert au **livrable**. La couleur de la carte dans le magasin varie selon le type de gabarit retenu.

Utiliser la liste suivante pour définir le type de ressource livrée par le gabarit logiciel.

* **documentation**: modèles de documents Markdown ou de ressources catalog-info.yaml
* **tool**: fournitures d'outils (e.g Github)
* **service**: modèle de développement de services d'arrière plan applicatif / serveur API/RPC
* **website**: modèle de développement de frontaux Web
* **library**: modèle de développement librairie applives (npm, pip, jar, etc.)
* **app**: modèle de développement d'application (client lourd, mobile, etc.)
* **apis**: modèle de définition d'API (e.g OpenAPI spec)
* **other**: _A éviter_

A faire | A eviter
--- | ---
Créer d'un dépôt Github (`spec.type: tool`) | Créer d'un dépôt Github (`spec.type: service`)
Ajouter d'un schéma OpenAPI (`spec.type: apis`) | Ajout d'un schéma Open API (`spec.type: documentation`)
Ajouter un gestionnaire d'ADR (`spec.type: documentation`) | Ajouter un gestionnarie d'ADR (`spec.type: library`)


### Utiliser camel case pour nommer les paramètres (`spec.parameters[].properties`)

Le champ `spec.parameters[].properties.<variableName>` spécifie le nom des variables utilisé au sein des étapes de rendu du gabarit dans le contexte `parameters`.

**Exemple**

```yaml
spec:
  parameters:
    - title: Identité
      required: ['firstName', 'lastName']
      properties:
        firstName:  # Ici
          title: Prénom
        lastName:  # Et là
          title: Nom de famille
  steps:
    - id: render-skeleton
      name: Génération du dépôt
      action: fetch:template
      intput:
        url: ./skeleton
        values:
          fullName: ${{ parameters.firstName }} {{ parameters.lastName }}
```

A faire | A éviter
--- | ---
`firstName` | `firstname`
`lastName` | `Lastname`
`costCenter` | `cost_center`

### Utiliser kebab case pour l'identifiant d'étape

Le champ `spec.steps[].id` spécifie l'identifiant d'une tâche et initialise le dictionnaire de données de sortie dans l'objet `output`.

**Exemple**

```yaml
spec:
  steps:
    - id: publish-pull-request  # Ici
      name: Publication de la pull-request
      action: publish:github:pull-request
      input:
        draft: true
        repoUrl: ${{ parameters.repoUrl }}
        token: ${{ secrets.USER_OAUTH_TOKEN }}
        title: Hey! ${{ user.entity.spec.profile.displayName }} souhaite cataloguer un entité !
        description: |
          # Catalogue logiciel
          ## Ajout
          - Enregistrement de l'entité '${{ parameters.entity.title }}'"
        branchName: docs/${{ user.entity.metadata.name | lower }}
        targetBranchName: main
        targetPath: ./
        commitMessage: "Enregistrement de l'entité '${{ parameters.entity.title }}'"

  output:
    links:
      - title: Pull-Request
        url: ${{ steps['publish-pull-request'].output.remoteUrl }}  # Comme ça
```
