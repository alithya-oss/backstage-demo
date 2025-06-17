---
title: Références rapides
description: Scripts et extraits de code facilitant le développement de gabarits logiciels
draft: false
---


Cette page contient les commandes et constructions YAML communément utilisés dans le gabarits logiciels.

## Données d'organisation

<div class="grid cards" markdown>

-   :material-recycle:{ .lg .middle } **Lifecycle**: Liste des cycle de vie/environnement  d'exéuction

    ---
  
    > `kind`: Group
    > `spec.type`: environnement
  
    Liste les cycles de vie approuvé par Alithya _(n. correspond également aux environnements d'exécution)_
  
    ```yaml
    spec:
      parameters:
        - title: Etape de cycle de vie
          properties:
            entityLifecycle:
              title: Cycle de vie
              description: Etat du composant
              type: string
              ui:field: EntityPicker
              ui:options:
                catalogFilter:
                  - kind: Group
                    spec.type: environnement
    ```

-   :material-code-json:{ .lg .middle } **Namespace**: Espace de nom

    ---
  
    > `kind`: Group
    > `spec.type`: namespace

    Liste les espaces de noms pour l'indexation des entités dans le catalogue du portail.

    ```yaml
    spec:
      parameters:
        - title: Espace de nom
          properties:
            entityLifecycle:
              title: Portefeuille
              description: Alloue l'entité à un namespace dans le catalogue
              type: string
              ui:field: EntityPicker
              ui:options:
                catalogFilter:
                  - kind: Group
                    spec.type: portefeuille
    ```

</div>

## Requête du catalogue

<div class="grid cards" markdown>

-   :material-account-group:{ .lg .middle } **Groupes auxquels l'utilisateur appartient** 
    
    ---

    > `ui:field:` MyGroupsPicker

    Liste les groupes dont l'utilisateur courant est membre au sein du portail.

    ```yaml
    spec:
      parameters:
        - title: Informations utilisateur
          properties:
            userGroup:
              title: Groupe utilisateur
              description: Groupes auxquels je suis membre dans le portail
              type: string
              ui:field: MyGroupsPicker
    ```

-   :material-account:{ .lg .middle } **Entités de charge de travail appartenant à l'utilisateur** 

    ---

    > `intput` user.entity

    Liste uniquement que les entités représentant une charge charge de travail, dont l'utiisateur courant est propriétaire.

    ```yaml
    spec:
      steps:
        - id: use-user-info
          name: Information utilisateur
          action: debug:log
            input:
              message: >
                Name:  ${{ user.entity.spec.profile.displayName | title }}
                Login: ${{ user.entity.metadata.name | lower }}
                Email: ${{ user.entity.spec.profile.email | lower }}
                Github login: ${{ user.entity.metadata.annotations.github.com/user-login | title }}
    ```

</div>

<div class="grid cards" markdown>

-   :material-shape:{ .lg .middle } **Entités de charge de travail appartenant à l'utilisateur** 

    ---

    > `ui:field:` OwnedEntityPicker

    Liste uniquement que les entités représentant une charge charge de travail, dont l'utiisateur courant est propriétaire.

    ```yaml
    spec:
      parameters:
        - title: Entité par type
          properties:
            ownWorkloadEntity:
              title: Entité de l'utilisateur
              description: Entités dont l'utilisateur est propriétaire
              type: string
              ui:field: OwnedEntityPicker
              ui:options:
                catalogFilter:
                  - kind: [Component, Resource, API]
                    metadata.namespace: { exists: true }
    ```

-   :material-shape-outline:{ .lg .middle } **Filtre les entités par type** 
    
    ---

    > `ui:field:` EntityPicker

    Liste ^^tous^^ les composants de type site Web du catalogue.

    ```yaml
    spec:
      parameters:
        - title: Informations utilisateur
          properties:
            websiteEntity:
              title: Site Web
              description: Entité liés à un site Web
              type: string
              ui:help: Seules les entités allouée à un espace de nom son listés.
              ui:field: EntityPicker
              ui:options:
                catalogFilter:
                  - kind: [Component]
                    metadata.namespace: { exists: true }
                    spec.type: website
    ```

</div>

## Gitlab

<div class="grid cards" markdown>

-   :simple-gitlab:{ .lg .middle } **Paramétrage de l'authentification utilisateur** 

    ---

    > `ui:field:` RepoUrlPicker

    Demande l'authentification Gitlab (`requestUserCredentials`) à utilisateur dans l'organisation cible.

    ```yaml
    spec:
      parameters:
        - title: Gitlab
          required:
            - repoUrl
          properties:
            repoUrl:
              title: Localisation du dépôt
              type: string
              ui:field: RepoUrlPicker
              ui:options:
                allowedHosts: [gitlab.com]
                allowedOrganizations: [alithya-csna]
                allowedOwners: [alithya-csna]
                requestUserCredentials:
                  secretsKey: USER_OAUTH_TOKEN
    ```

-   :simple-github:{ .lg .middle } **Soumettre une Pull-request** 

    ---

    Soumet la pull-request à l'aide jeton utilisateur en mode brouillon ( `draft:true`) afin de neutraliser l'exécution du pipeline.

    ```yaml
    spec:
      steps:
        - id: publish-pull-request
          name: Publication de la pull-request
          action: publish:github:pull-request
          input:
            draft: true
            repoUrl: ${{ parameters.repoUrl }}
            token: ${{ secrets.USER_OAUTH_TOKEN }}
            title: ${{ user.entity.metadata.name }} a soumis une PR
            description: Hello world de la part de ${{ user.entity.spec.profile.displayName }} !
            branchName: test/hello-from-${{ user.entity.spec.profile.displayName | replace(" ", "_") | lower }}
            targetBranchName: main
            sourcePath: skeleton
            targetPath: ./
            commitMessage: Déclaration initiale
    ```

</div>

<div class="grid cards" markdown>

-   :simple-github:{ .lg .middle } **Compléter une Pull-request** 

    ---

    Ajoute des fichiers complémentaires dans une Pull-Request éxistante.

    ```diff
    spec:
      steps:
        - id: updatePullRequest
          name: Mettre à jour la pull-request
          action: publish:github:pull-request
          input:
    +       update: true
    -       draft: true
    +       draft: false
            repoUrl: ${{ parameters.repoUrl }}
            token: ${{ secrets.USER_OAUTH_TOKEN }}
            title: ${{ user.entity.metadata.name }} a soumis une PR
            description: Hello world de la part de ${{ user.entity.spec.profile.displayName }} !
            branchName: test/hello-from-${{ user.entity.spec.profile.displayName | replace(" ", "_") | lower }}
            targetBranchName: main
            sourcePath: catalog-info.yaml
            targetPath: ./
    -       commitMessage: Déclaration initiale
    +       commitMessage: Complément d'information
    ```

-   :simple-github:{ .lg .middle } **Rapport d'exécution** 

    ---

    Renvoi le lien vers la pull-request, ainsi que des information complémentaires à l'utilisateur.

    > **Remarque**: La propriété `content` supporte Markdown.

    ```yaml
    spec:
      output:
        links:
          - url: ${{ steps['publish-pull-request'].output.remoteUrl }}
            title: 'Pull request'
        text:
          - title: Rapport d'exécution
            content: |
              Information | Description | Valeur
              --- | --- | ---
              Demandeur | Coordonnées du demandeur | ${{ user.entity.spec.profile.displayName | title }}
              Hyperlien | Lien vers la pull-request | ${{ steps['publish-pull-request'].output.remoteUrl }}
              Identifiant | Numéro de la pull-request | ${{ steps['publish-pull-request'].output.pullRequestNumber }}
              Cible | Branche ciblé par la pull-request | ${{ steps['publish-pull-request'].output.targetBranchName }}
    ```

</div>


## Formatage du texte

<div class="grid cards" markdown>

-   :material-format-font:{ .lg .middle } **Kebab case**

    ---

    Passe le texte en minuscule et remplace les espaces par des tirets `-`.
    
    > ex. `hello-world`

    ```yaml
    spec:
      steps:
        - id: write-kebab-case
          name: kebab-case
          action: debug:log
          input:
            message: Kebab case '${{ parameters.name }}'
            extra: ${{ parameters.name | lower | replace(" ", "-") }}
    ```

-   :material-format-font:{ .lg .middle } **Snake case**

    ---

    Passe le texte en minuscule et remplace les espaces par des tirets-bas `_`.
    
    > ex. `hello_world`

    ```yaml
    spec:
      steps:
        - id: write-snake-case
          name: Rendu snake_case
          action: debug:log
          input:
            message: Snake case '${{ parameters.name }}'
            extra: ${{ parameters.name | lower | replace(" ", "_") }}
    ```

</div>

<div class="grid cards" markdown>

-   :material-format-font:{ .lg .middle } **Upper camel case**

    ---

    Passe la première lettre de chaque mots en majuscule puis supprime les espaces.
    
    > ex. `HelloWorld`

    ```yaml
    spec:
      steps:
        - id: write-upper-camel-case
          name: Rendu UpperCamelCase
          action: debug:log
          input:
            message: Upper camel case for '${{ parameters.name }}'
            extra: ${{ parameters.name | title | replace (" ", "") }}
    ```

-   :material-format-font:{ .lg .middle } **Lower compact case**

    ---

    Passe le texte en minuscule puis supprime les espaces.
    
    > ex. `helloworld`

    ```yaml
    spec:
      steps:
        - id: write-lower-compact-case
          name: Rendu compactcase
          action: debug:log
          input:
            message: Lower compact case for '${{ parameters.name }}'
            extra: ${{ parameters.name | lower | replace (" ", "") }}
    ```
</div>

<div class="grid cards" markdown>

-   :material-format-font:{ .lg .middle } **Upper compact case**

    ---

    Passe le texte en minuscule, supprime les espaces, et ajoute une majuscule au début.
    
    > ex. `Helloworld`

    ```yaml
    spec:
      steps:
        - id: write-upper-compact-case
          name: Rendu Uppercompactcase
          action: debug:log
          input:
            message: Upper compact case for '${{ parameters.name }}'
            extra: ${{ parameters.name | replace (" ", "") | capitalize }}
    ```

-   :material-format-font:{ .lg .middle } **Bash variable case** `HELLO_WORLD`

    ---

    Passe le texte un majuscule et remplace les espaces par des tirets-bas `_`.
    
    > ex. `HELLO_WORLD`
    
    ```yaml
    spec:
      steps:
        - id: write-bash-variable-case
          name: Rendu BASH_VARIABLE_CASE
          action: debug:log
          input:
            message: Bash variable case for '${{ parameters.name }}'
            extra: ${{ parameters.name | upper | replace (" ", "_") }}
    ```
</div>