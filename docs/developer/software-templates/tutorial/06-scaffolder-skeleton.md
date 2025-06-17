---
title: Créer le squelette de dépôt
description: Créer le squelette de dépôt
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

Un squelette est un dossier stockant une structure de fichiers devant être livré dans le dépôt Git distant. Ces fichiers peuvent contentir du texte statiques et/ou des modèles formatté selon le language de rendu [Mozilla Nunjucks](https://mozilla.github.io/nunjucks).

Le rendu des modèles est assuré par l'action `fetch:template` qui mappe les variables dans unique index nommé `values`. Cet index peut employer à la fois pour:

1. Nommer des répertoires
2. Nommer des fichiers
3. Modifier du contenu

!!! tip Squelette dédié ou partagé
    ###### Squelette dédié
    
    La structure de fichiers du squelette doit être stockée dans un sous-répertoire du gabarit logiciel nommé `skeleton`

    > Exemple: `scaffolder-templates/create-fastapi-service/skeleton`

    ###### Squelette partagé

    La structure de fichiers du squelette doit être stockée dans un sous-répertoire de la racine `skeletons` nommé selon l'outis, le language, ou la technologie mise en oeuvre.
    
    > Exemple: `skeletons/python3/fastapi`

Par défaut la structure du squelette est sockée dans le répertoire du gabarit (e.g. `scaffolder-templates/create-fastapi-service/`)


Exemple de structure MonoRepo conforme à la spécification PEP-517.

```bash title="scaffolder-templates/create-fastapi-service/skeleton"
├── containers
│   └── ${{ values.kebabName }}
│       └── Dockerfile
├── .gitattributes
├── .gitignore
├── pytests.ini
├── README.md
└── src
    └── ${{ values.compactName }}
        ├── catalog-info.yaml
        ├── pyproject.toml
        ├── setup.cfg
        └── src
            ├── ${{ values.snakeName }}
            │   ├── app.py
            │   ├── config.py
            │   ├── controllers
            │   │   ├── ${{ values.compactName }}.py
            │   │   ├── health.py
            │   │   ├── __init__.py
            │   │   └── status_codes.py
            │   ├── database.py
            │   ├── __init__.py
            │   ├── loader.py
            │   ├── models
            │   │   ├── crud.py
            │   │   ├── __init__.py
            │   │   ├── postgres.py
            │   │   ├── schemas.py
            │   │   └── sqlite.py
            │   └── utils
            │       ├── __init__.py
            │       ├── logging.py
            │       ├── telemetry.py
            │       └── userid.py
            └── asgi.py
```
