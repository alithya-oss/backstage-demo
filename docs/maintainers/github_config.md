---
title: Configuration des identifiants Github
description: Configuration des identifiants pour l'intégration Github dans Backstage
date: 2023-10-13T02:33:48.194Z
keywords:
  - backstage
  - github
  - oauth2
  - token
slug: github-configuration
---

## Avant-Propos

Ce guide décrit pas-à-pas les étapes de configuration de l'intégration Github dans Backstage.

### Audience

Ce document ne s'adresse qu'aux Mainteneurs, Développeurs, et Ingénieurs de l'application Backstage.

### Périmètre

Les intructions décrites dans ce document s'applique à l'exécution locale (i.e devmode) et en tant que service.

> **Attention**:
> Les opérateurs sous Windows doivent **obligatoirement** utiliser WSL2 pour être en mesure de déployer les services.

## Mode Opératoire

### Pré-requis

* Un compte Github personnel; ou fournie par l'entreprise.
* Secret Operations <https://github.com/getsops/sops/releases> (MacOS, Linux)

### Génération des identifiants

La configuration Github Apps et Github Token (classic) permet de récupérer les données et d'interagir avec la plate-forme Github depuis Backstage (i.e. Base de code, Workflow, Pull requests, etc.)

Naviguer vers le gestionnaire de profile utilisateurs Github <https://github.com/settings/profile>.

Dans le panneau de gauche, naviguer vers **Developper settings/Github Apps** puis cliquer sur le bouton **New Github App**.

=== "Github App locale (devmode)"

    * **Application name**: Backstage (localhost)
    * **Homepage URL**: http://localhost:3000
    * **Authorization callback URL**: http://localhost:7007/api/auth/github/handler/frame
    * **Expire user authorization tokens**: _désactivé_
    * **Webhook**: _désactivé_
    * **Repository**:
      * **Action**: Read/Write
      * **Commit**: Read-only
      * **Contents**: Read/Write
      * **Issue**: Read/Write
      * **Metadata**: Read-only
      * **Pull request**: Read/Write
      * **Secrets**: Read/Write
      * **Variables**: Read/Write
      * **Workflows**: Read/Write
    * **Organization**:
      * **Members**: Read-only
    * **Where can this Github App be installed ?**: Any Account

=== "Github App MWS (dev.mws)"

    * **Application name**: Backstage (dev.mws)
    * **Homepage URL**: https://backstage.dev.alithya-mws.com
    * **Authorization callback URL**: https://backstage.dev.alithya-mws.com/api/auth/github/handler/frame
    * **Expire user authorization tokens**: _activé_
    * **Webhook**: _désactivé_
    * **Repository**:
      * **Action**: Read/Write
      * **Commit**: Read-only
      * **Contents**: Read/Write
      * **Issue**: Read/Write
      * **Metadata**: Read-only
      * **Pull request**: Read/Write
      * **Secrets**: Read/Write
      * **Variables**: Read/Write
      * **Workflows**: Read/Write
    * **Organization**:
      * **Members**: Read-only
    * **Where can this Github App be installed ?**: Any Account

Dans le panneau de gauche, naviguer vers **Developper settings/Personnal Access Token (classic)** puis cliquer sur le bouton **New Token**.

=== "PAT locale (devmode)"

    * **Name**: backstage (localhost)
    * **Scopes**:
      * `repo`
      * `workflow`
      * `read:org`
      * `read:user`
      * `user:email`

=== "PAT MWS (dev)"

    * **Name**: backstage (localhost)
    * **Scopes**:
      * `repo`
      * `workflow`
      * `read:org`
      * `read:user`
      * `user:email`

### Sécurisation des identifiants

Sauvegarder les données dans un coffre fort sécurisé pour une réutililsation future (i.e. KeeWeb, KeePass, etc.), puis valoriser les fichier de variables selon le cas d'usage.

=== "Exécution locale (devmode)"

    Ajouter les variables dans le fichier `.env` à la racine du dépôt.

    ```bash
    GITHUB_INTEGRATION_TOKEN=ghp_***
    AUTH_GITHUB_CLIENT_ID=lv1.***
    AUTH_GITHUB_CLIENT_SECRET=***
    ```

    Dans le cas où les scripts `hack/config.sh` ou `hack/run.sh` ne sont pas utilisés, ajouter les données suivante dans le fichier `app-config.local.yaml`.

    ```yaml
    integrations:
      github:
        - host: github.com
          token: ${GITHUB_INTEGRATION_TOKEN}
    auth:
      environment: development
      providers:
        github:
          development:
            clientId: ${AUTH_GITHUB_CLIENT_ID}
            clientSecret: ${AUTH_GITHUB_CLIENT_SECRET}
    ```

=== "Exécution en tant que service MWS (dev)"

    Générer un manifest Kubernetes Secret dans le répertoire `deploy/kubernetes/`.

    ```bash
    GITHUB_INTEGRATION_TOKEN=ghp_***
    AUTH_GITHUB_CLIENT_ID=lv1.***
    AUTH_GITHUB_CLIENT_SECRET=***

    kubectl -n backstage create secret generic github-env \
      --from-literal="GITHUB_INTEGRATION_TOKEN=${GITHUB_INTEGRATION_TOKEN}" \
      --from-literal="AUTH_GITHUB_CLIENT_ID=${AUTH_GITHUB_CLIENT_ID}" \
      --from-literal="AUTH_GITHUB_CLIENT_SECRET=${AUTH_GITHUB_CLIENT_SECRET}" \
      --dry-run=client -o yaml | tee -a deploy/kubernetes/backstage-github-env-secret.yaml

    kubectl apply -f deploy/kubernetes/backstage-github-env-secret.yaml
    ```

    > **Attention**:
    > Exécuter le script `hack/sops.sh` pour chiffrer les données du manifeste afin d'éviter toute fuite des identifiants.

    Ajouter le secret, ainsi que la configuration Backstage associée dans les valeurs Helm de l'application Argo-CD Backstage `deploy/argo-cd/backstage-app.  yaml`.

    ```yaml
    spec:
      source:
        helm:
          valuesObject:
            backstage:
              extraEnvVarsSecrets:
                - github-env
              appConfig:
                integrations:
                  github:
                    - host: github.com
                      token: ${GITHUB_INTEGRATION_TOKEN}
                auth:
                  environment: production
                  providers:
                    github:
                      production:
                        clientId: ${AUTH_GITHUB_CLIENT_ID}
                        clientSecret: ${AUTH_GITHUB_CLIENT_SECRET}
    ```

    Lancer la mise à jour de l'application.

    ```bash
    argocd app create backstage -f deploy/argo-cd/backstage-app.yaml --upser
    ```
