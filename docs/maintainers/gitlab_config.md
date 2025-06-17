---
title: Configuration des identifiants Gitlab
description: Configuration des identifiants pour l'intégration Gitlab dans Backstage
date: 2023-10-13T02:33:48.194Z
keywords:
  - backstage
  - gitlab
  - deploy
  - key
  - app
  - token
slug: gitlab-configuration
---

## Avant-Propos

Ce guide décrit pas-à-pas les étapes de configuration de l'intégration Gitlab dans Backstage.

### Audience

Ce document ne s'adresse qu'aux Mainteneurs, Développeurs, et Ingénieurs de l'application Backstage.

### Périmètre

Les intructions décrites dans ce document s'applique à l'exécution locale (i.e devmode) et en tant que service en ligne.

> **Attention**:
> Les opérateurs sous Windows doivent **obligatoirement** utiliser WSL2 pour être en mesure de déployer les services.

## Mode Opératoire

### Pré-requis

- Un compte Gitlab personnel; ou fournie par l'entreprise.
- Secret Operations <https://github.com/getsops/sops/releases> (MacOS, Linux)

### Génération des identitifiants

La configuration Gitlab Token autorise la collecte de données et l'interaction avec la plate-forme Gitlab depuis Backstage de (i.e. Base de code, Workflow, Pull requests, etc.)

=== "PAT local (devmode)"

    Naviguer vers le gestionnaire de profile utilisateurs Gitlab <https://gitlab.com/-/user_settings/profile>.

    Dans le panneau de gauche, selectionner **Access tokens** puis cliquer sur le bouton **Add new token**.

    Compléter le formulaire tels qu'indiqué ci-dessous:

    * **Token name**: Backstage (localhost)
    * **Expiration**: _vide_
    * **Select Scopes**:
      * `read_user`
      * `read_api`
      * `read_repository`
      * `write_repository`

=== "PAT MWS (dev)"

    Naviguer vers le gestionnaire de jetons d'accès groupe Gitlab <https://gitlab.com/groups/alithya-csna/-/settings/access_tokens>.

    Cliquer sur le bouton **Add new token**.

    Compléter le formulaire tels qu'indiqué ci-dessous:

    * **Token name**: Backstage (dev.alithya-mws.com)
    * **Expiration**: _vide_
    * **Role**: **Developer**
    * **Select Scopes**:
      * `read_api`
      * `read_repository`
      * `write_repository`

=== "PAT MWS (qa)"

    Naviguer vers le gestionnaire de jetons d'accès groupe Gitlab <https://gitlab.com/groups/alithya-csna/-/settings/access_tokens>.

    Cliquer sur le bouton **Add new token**.

    Compléter le formulaire tels qu'indiqué ci-dessous:

    * **Token name**: Backstage (qa.alithya-mws.com)
    * **Expiration**: _vide_
    * **Role**: **Developer**
    * **Select Scopes**:
      * `read_api`
      * `read_repository`
      * `write_repository`
