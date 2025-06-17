---
description: Choisir la base de code implémentée par défaut dans la cadre de la démonstration des capacités de Backstage
status: accepted  # {proposed | rejected | accepted | deprecated | … | superseded by [ADR-0005](0005-example.md)}
date: 2023-10-02  # {YYYY-MM-DD when the decision was last updated}
deciders: Florian JUDITH
consulted: Thomas ROUSSET
informed: Aden Agaga De-Ralph Mvoula Moukouyou, Javier Prieto, Hani Rachdi
---

# ADR-0002 Choisir de la base de code par défaut

## Contexte et problématique

> Décrire le contexte et la problématique (e.g forme libre utilisant deux ou trois phrases. Vous pouvez articuler le problème sous la forme de questions/réponses)

Nous devons selectionner une base de code permettant démontrer un maximum des capacité de Backstage, d'ici au 2023-10-13.

## Facteurs de décision

> _(Facultatif)_: Force, Faibless, ou préocupatoin à prendre en compte.

- **Intégration**: La base de code doit permettre de démontré les capacités d'alimentation automatique du catalogue de Backstage
- **CI/CD**: La base de code doit permettre de démontré l'exposition des données de livraison continue au sein du catalogue Backstage
- **Référentiel utilisateurs/groups**: La base de code doit permettre de démontré la capacité d'alimentation automatique de base utilisteur/groupe de Backstage
- **Déploiement continue**: La base de code doit être supporté par les dispositifs de déploiement continue
- **Techdocs**: La base de code doit permettre d'alimenter la documentation des entités enregistrés dans Backstage.
- **Authentification**: La base de code doit support OIDC/Oauth2 afin d'authentifier le personnel authorisé à accéder à Backstage.

## Options envisagées

- **Github**: Fournisseur de base de code démontré par défaut dans la documentation de Backstage. <https://github.com/alithya>
- **Gitlab.com**: Fournisseur de base code mis en oeuvre par l'équipe IO du CSNA d'Alithya. <https://gitlab.com/alithya-csna>
- **Azure DevOps**: Fournisseur de base de conde utilisé par de nombreux projets au sein d'Alithya et ses client.

De nombreuses autres intégrations sont supportés par Backstage (ref. https://backstage.io/docs/integrations/), cependant seules suscités répondent à l'ensemble facteurs de décision.

## Résultat de la décision

- **Option choisie**: Gitlab.com
- **Dans le contexte du** déploiement d'un démonstrateur Backstage
- **Faisant et à/au/aux** délais de construction du pipeline associé vers AMWS
- **Nous avons retenu de** recourir à Gitlab.com
- **Pour parvenir à atteindre** la butoire de livraison du 2023-10-13
- **En acceptant que:** Démontrer Azure DevOps et Github.com serait révalateur du contexte opérationnel d'Alithya

### Conséquences positives

> _(Facultatif)_: Amélioration, statisfaction d'un attribut qualité, décisions de suivi nécessaires, etc.

En retenant Gitlab.com nous bénéficions d'une expertise disponible pour nous accompagner dans la construction de la chaîne de livraison vers AMWS.

### Conséquences négatives

> _(Facultatif)_: Dégradation, compromission d'un attribut qualité, décisions de suivi nécessaires, etc.

n/a

## Evaluation concurrentiel

> _(Facultatif)_: Avantages et inconvénients de chaque option.

### AWS S3

- **Positif, car** permet de démontré les capacités d'alimentation automatique du catalogue de Backstage
- **Positif, car** permet d'alimenter la documentation des entités enregistrés dans Backstage
- _**Négatif, car**_ ne permet pas démontrer l'ensemble des facteurs de décision

### Bitbucket Cloud

- **Positif, car** permet de démontré les capacités d'alimentation automatique du catalogue de Backstage
- **Positif, car** permet d'alimenter la documentation des entités enregistrés dans Backstage
- _**Négatif, car**_ ne permet pas démontrer l'ensemble des facteurs de décision

### Bitbucket Server

- **Positif, car** permet de démontré les capacités d'alimentation automatique du catalogue de Backstage
- **Positif, car** permet d'alimenter la documentation des entités enregistrés dans Backstage
- _**Négatif, car**_ ne permet pas démontrer l'ensemble des facteurs de décision

### Gitea

- **Positif, car** permet d'alimenter la documentation des entités enregistrés dans Backstage
- _**Négatif, car**_ ne permet pas démontrer l'ensemble des facteurs de décision

### LDAP

- **Positif, car** permet de démontré la capacité d'alimentation automatique de base utilisteur/groupe de Backstage
- _**Négatif, car**_ ne permet pas démontrer l'ensemble des facteurs de décision

## Références

> _(Falcutatif)_: liens vers ADR, site Web, etc.

- https://backstage.io/docs/integrations/
- _Source B_
- _Source C_
- ...
