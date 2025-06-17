---
title: Catalogue produits
description: Concepts relatifs au Catalogue Produits du portail interne de développement Backstage
keywords:
  - backstage
  - software-catalog
  - templates
  - developpement
  - catalogue-logiciel
  - catalgue-produits
  - catalogue
  - rescencement
draft: true
---

Un Catalogue Produits _(Software Catalogue en anglais)_ est un service qui indexe les actifs technologiques; ici considérés comme des entités; de l'organisation et offre une vue synthétitique sur les différent maillons de la chaîne de livraison et les disposiftss de maintenance associés.

Les entités indexés dans le catalogue sont classifiées par leurs natures:

<div class="grid cards" markdown>

-   **Ressource**
    
    ---

    Infrastructure physique ou virtuelle permettant d’exécuter des composants

-   **Composant**

    ---

    Unité d’exécution déployé à l’aide d’un artéfact (Paquet, Conteneur, etc.)

-   **API**

    ---

    Contrat d’interface Applicative (OpenAPI, GraphQL, Grpc, etc.)

-   **Système**

    ---

    Application qui est composée d’un ensemble de composants, d’API et ressources fonctionnant de concert.

-   **Domaine**

    ---

    « Sphère » dans laquelle réside les systèmes d’un métier ou d’une activité commerciale.

-   **Groupe**

    ---

    Cercle d’intérêt commun (unité d’affaire, équipe de développement, Centre de coût, etc.).

-   **Utilisateur**

    ---

    Le personnel enregistré dans Active Directory (lecteur/rapporteur)  ou Github Enterprise (contributeur)

-   **Gabarit**

    ---

    Voir. [Gabarit logiciel](./software-templates.md)

-   **Localisation**

    ---

    Cible Source de données des entités à indexée dans le catalogue produits (Github, AWS, etc.)

</div>

!!! tip

    Consulter l'espace documentaire dédié de l'Architecture D'entreprise pour en apprendre plus sur le spécifités au sein Benenva.

![Modélisation du catalogue](./diagrams/catalog-system-model-v2.drawio.svg) 

