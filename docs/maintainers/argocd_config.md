---
title: Configuration des identifiants Argo-CD
description: Configuration des identifiants pour l'intégration Argo-CD dans Backstage
date: 2023-10-13T02:33:48.194Z
keywords:
  - backstage
  - argocd
  - argo-cd
  - token
slug: argocd-configuration
---

## Avant-Propos

Ce guide décrit pas-à-pas les étapes de configuration de l'intégration Argo-CD dans Backstage.

### Audience

Ce document s'adresse exlusivement aux Ingénieurs GitOps de la plate-forme de déploiement continue Backstage.

### Périmètre

Les intructions décrites dans ce document s'applique à l'exécution locale (i.e devmode) et en tant que service.

## Mode Opératoire

### Pré-requis

* Permission d'accès au role RBAC `role:admin` ou identifiants du compte `admin` de Argo-CD.
* Client en ligne de commande Argo-CD CLI (ref. <https://argo-cd.readthedocs.io/en/stable/cli_installation/>)

### Création du compte de service

Ajouter les valeurs suivantes dans le fichier `values.yaml` associé au déploiement du Chart Helm d'Argo-CD, afin de créer un compte de service en **lecture seule** sur toutes les ressources API de Argo-CD.

```yaml
configs:
  cm:
    accounts.backstage: apiKey,login
  rbac:
    policy.csv: |
      g, backstage, role:readonly
```

Lancer la mise à jour du déploiement de Argo-CD.

```bash
helm upgrade --install -f values.yaml gitops ago/argo-cd
```

Relancer le pod `argo-server` afin que le nouveau ConfigMap soit pris en comptes.

```bash
kubectl -n argo-cd delete pod -l 'app.kubernetes.io/name=argo-server'
```

### Génération du jeton d'accès

S'authentifier auprès de l'instance Argo-CD cible.

```bash
argocd login argocd.example.com --grpc-web --sso

# Si non-SSO: argo login argocd.example.com --grpc-web --username="admin" --password="<àc ompléter>"
```

Générer le jeton d'accès pour le compte de service Backstage.

```bash
argocd account generate-token --account backstage
```

### Sécurisation du jeton d'accès

Sauvegarder les données dans un coffre fort sécurisé pour une réutililsation future (i.e. KeeWeb, KeePass, etc.), puis valoriser les fichier de variables selon le cas d'usage.

Générer un manifest Kubernetes Secret dans le répertoire `deploy/kubernetes/`.

```bash
ARGOCD_TOKEN=***

kubectl -n backstage create secret generic argocd-env \
  --from-literal="ARGOCD_AUTH_TOKEN=${ARGOCD_TOKEN}" \
  --dry-run=client -o yaml | tee deploy/kubernetes/backstage-argocd-env-secret.yaml

kubectl apply -f deploy/kubernetes/backstage-github-env-secret.yaml
```

> **Attention**:
> Exécuter le script `hack/sops.sh` pour chiffrer les données du manifeste afin d'éviter toute fuite des identifiants.

Ajouter le secret, ainsi que la configuration Backstage associée dans les valeurs Helm de l'application Argo-CD Backstage `deploy/argo-cd/backstage-app.yaml`.

```yaml
spec:
  source:
    helm:
      valuesObject:
        backstage:
          extraEnvVarsSecrets:
            - argocd-env
          appConfig:
            argocd:
              appLocatorMethods:
                - type: 'config'
                  instances:
                    - name: argocd
                      url: http://argocd-server.argo-cd
                      token: ${ARGOCD_AUTH_TOKEN}
```

Lancer la mise à jour de l'application.

```bash
argocd app create backstage -f deploy/argo-cd/backstage-app.yaml --upsert
```
