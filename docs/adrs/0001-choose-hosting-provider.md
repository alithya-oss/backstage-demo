---
description: Choisir l'hébergeur du démonstrateur Backstage
status: superseded by [ADR-0004](0004-choose-hosting-provider.md)  # {proposed | rejected | accepted | deprecated | … | superseded by [ADR-0005](0005-example.md)}
date: 2023-10-02  # {YYYY-MM-DD when the decision was last updated}
deciders: Florian JUDITH, Aden Agaga De-Ralph Mvoula Moukouyou
consulted: Thomas ROUSSET
informed: Javier Prieto, Hani Rachdi
---

# ADR-0001 Choisir l'hébergeur du démonstrateur Backstage

## Context

> Quel est le problème que nous constatons qui motive cette décision ou ce changement?

Le CSNA Ingénierie Logiciel souhaites organisaser une démonstration interactive des capacité de Backstage couvrant les aspect suivants:

- Ingestion du catalogue logiciel
- Ingestion des utilisateurs et groupes
- Ingestion de la documentation (techdocs)
- Relation entre la chaîne CI/CD associée aux entitées enregistré dans le catalogue
- Relation entre les ressources en cours d'exécution et les entités enregistrés dans le catalogue.

Le CSNA IO supporte AWS et Azure pour hébergement de démonstrateurs.

L'un ou l'autre doivent être selectionné en tenant compte du délais de 9 jours ouvrés séparant le démarrage du projet et la première démonstration

## Decision

> Quel est le changement que nous proposons et / ou faisons?

Azure a été retenu car il bénéficie déjà d'une offre de service dédiée non seulement à l'hébergement de prototype ou services produit en interne par Alithya. L'offre de service se nome Alithya Managed Web Service (AMWS) et dispose de ressources mobilisable pour accompagner l'équipe dans industrialisation de la livraison du démonstrateur (IaC, CI/CD, Opérationnalisation, etc.)

## Consequences

> Qu'est-ce qui devient plus facile ou plus difficile à faire à cause de ce changement?

AWS a été désigné comme cible secondaire permettant de démontrer dans le future les capactités Multi-Cloud de Backstage.