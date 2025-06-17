---
title: Utilisation de SOPS avec Kubernetes
description: Guide d'utilisation de SOPS avec les client Kubernetes et Helm
date: 2023-10-13T02:33:48.194Z
keywords:
  - sops
  - age
  - secops
  - security
  - kubernetes
  - helm
slug: sops-kubernetes
---

## Avant-Propos

Ce guide décrit les méthodes d'utilisation de SOPS dans le cadre de Kubernetes.

### Audience

Ce document s'adresse à tout personnel impliqué dans la manipulation d'identifiants confidentiels dans le cadre de déploiements dans Kubernetes à l'aide des clients `kubectl` et `helm`.

### Périmètre & limitations

Les opérateurs sous Windows doivent **obligatoirement** utiliser WSL2 pour être en mesure de déployer les services.

## Mode Opératoire

### Pré-requis

* AGE et SOPS installés [doc](./sops_install.md)

### Kubernetes

#### Clé partagée 

Si la clé est partagé avec le personnel accrédité pour la gestion des déploiements.

```bash
export SOPS_AGE_KEY_FILE=".sops/key.txt"

# Consultation
sops --decrypt db-secret.enc.yaml

# Déploiement
sops --decrypt db-secret.enc.yaml | kubectl apply -f -
```

#### Clé personnel

```bash
export SOPS_AGE_KEY_FILE="~/.sops/$(id -un)"  # Par sécurité on recharge la variable

# Consultation
sops --decrypt db-secret.enc.yaml

# Déploiement
sops --decrypt db-secret.enc.yaml | kubectl apply -f -
```

#### Helm

// TODO