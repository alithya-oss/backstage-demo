---
title: Installation de SOPS
description: Installation de Secure Operation (SOPS) pour la protection des identifiants confidentiels dans les manifestes
date: 2023-10-13T02:33:48.194Z
keywords:
  - sops
  - age
  - secops
  - security
slug: sops-install
---

## Avant-Propos

Ce guide décrit les étapes d'installation et de configuration de SOPS afin de protéger les identifiants confidentiels renseigné dans les fichier de configuration et manifestes de déploiement associés historisés dans une base de code.

### Audience

Ce document s'adresse à tout personnel impliqué dans la manipulation d'identifiants confidentiels au sein d'une base de code.

### Périmètre & limitations

Les opérateurs sous Windows doivent **obligatoirement** utiliser WSL2 pour être en mesure de déployer les services.


## Mode Opératoire

### Installation des outils

Lancer les commandes suivantes pour installer l'outil de commande `sops` (n. Consulter <https://github.com/getsops/sops/releases/latest> pour obetenir la version la plus récente).

```bash
VERSION="3.8.1"

sudo mkdir -p /usr/local/sops/${VERSION}/

sudo curl \
  -o /usr/local/sops/${VERSION}/sops \
  -L https://github.com/getsops/sops/releases/download/v${VERSION}/sops-v${VERSION}.linux.amd64

sudo chmod +x /usr/local/sops/${VERSION}/sops

sudo ln -sf /usr/local/sops/${VERSION}/sops /usr/local/bin/sops
```

Sops ne réalise pas le chiffrement par lui même, il recourt à des technologies tiers tels que PGP, AGE, GGCP KMS, AWS KMS, Azure Key Vault, Hashicorp Vault, etc.

PGP étant considéré comme déprécié, il est préconisé d'installer sa nouvelle itération nommé **AGE**.

lancer les commandes suivantes pour installer les outils de commandes `age`. (n. Consulter <https://github.com/FiloSottile/age/releases/latest> pour obetenir la version la plus récente).

```bash
VERSION="1.1.1"

sudo mkdir -p /usr/local/age/${VERSION}/

curl \
  -L https://github.com/FiloSottile/age/releases/download/v${VERSION}/age-v${VERSION}-linux-amd64.tar.gz \
  | sudo tar -xzC /usr/local/age/${VERSION}/ 

sudo ln -sf /usr/local/age/${VERSION}/age/age /usr/local/bin/age
sudo ln -sf /usr/local/age/${VERSION}/age/age-keygen /usr/local/bin/age-keygen
```

### Génération de la pair de clés personnel

```bash
mkdir -vp ~/.sops
age-keygen -o ~/.sops/$(id -un)

cat <<EOF | tee -a ~/.bashrc
export SOPS_AGE_KEY_FILE=${HOME}/.sops/$(id -un)
EOF

source ~/.bashrc
```

## Validation

Exécuter les commandes suivantes pour valider le bon fonctionnement de SOPS.

```bash
# Création du fichier YAML
TEST_FILE="test-secret.yaml"
echo "mySecretVar: P4ssww0rd" > $TEST_FILE

# Chiffrement du fichier
KEY="$(cat ~/.sops/$(id -un) | grep -oP 'public key: \K(.*)')"
sops --encrypt \
  --age "${KEY}" \
  "${TEST_FILE}" > "${TEST_FILE/yaml/enc.yaml}"
cat ${TEST_FILE/yaml/enc.yaml}

# Déchiffrement du fichier
sops --decrypt "${TEST_FILE/yaml/enc.yaml}"

# Suppression des fichiers de tests
rm -vf *.yaml
```