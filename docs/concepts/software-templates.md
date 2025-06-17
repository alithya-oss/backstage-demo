---
title: Gabarit Logiciel
description: Concepts relatifs aux Gabarits Logiciel dans le portail interne de développement Backstage
keywords:
  - backstage
  - software-templates
  - templates
  - developpement
  - gabarit-logiciel
  - gabarit
  - development
draft: true
---

Un Gabarit Logiciel _(Software Templates en anglais)_ est un service permettant de déclencher des processus de configuration et d'approvisionnement des ressources des Technologie de l'Information (TI). En général un Gabarit Logiciel à la capacité de télécharger un squelette de code (i.e. Skeleton, Scaffolder), de réaliser un rendu selon un ensemble de variables, et de publier le résulat dans une localisation tels que Github ou Gitlab.

!!! tip
    * **Un Gabarit Logiciel est** un moteur d'admission, de rendu et publication de fichiers.
    * **Un Gabarit Logiciel n'est pas** un automate de flux de travail, tels qu'un ordonanceur ou un moteur de pipeline (e.g. Control-M, Airflow, Jenkins, etc.).

Le diagramme ci-dessous démontre le positionnement d'un Gabarit dans la chaîne d'approvisionnement TI de Beneva et expose le découplage entre le portail et l'outillage d'approvisionnement.

```kroki-mermaid
sequenceDiagram
  actor User
  box rgb(229, 225, 222) Backstage
  participant Frontend
  participant Backend
  end
  box Technologies de l'information
  participant Github
  participant Jenkins
  participant AWS
  end

  Frontend -->> User: Exposition du Gabarit
  User ->> Frontend: Soumission
  activate Frontend
  Frontend ->> Backend: Transfert des paramètres d'entrée
  Frontend ->> Backend: Lancement de l'exécution
  activate Backend
  Backend ->> Github: Téléchargement du Gabarit
  Github -->> Backend: Manifestes, Fichiers, Scripts
  Backend ->> Backend: Rendu des fichiers finaux
  Backend -->> Frontend: Statut d'avancement de l'éxécution
  Backend ->> Github: Publication des fichiers finaux (i.e Push, PR)
  activate Github
  Backend ->> Frontend: Succès ou échec de l'exécution
  deactivate Backend
  Frontend ->> User: Statut d'éxécution
  deactivate Frontend
  Github ->> Jenkins: Déclencement de l'approvisionnement
  activate Jenkins
  Jenkins ->> AWS: Approvisionnement
  activate AWS
  AWS -->> Jenkins: Statut de l'approvisionnement
  AWS ->> Jenkins: Fin de l'approvisionnement
  deactivate AWS
  deactivate Jenkins
  
  Backend ->> Github: Découverte des nouvelles entités
  activate Backend
  Github -->> Backend: Fichier "catalog-info.yaml"
  Backend ->> Backend: Enregistrement dans le catalogue logiciel
  activate Frontend
  User ->> Frontend: Consultation des entités (e.g composants)
  Frontend ->> Backend: Requête des entités
  Backend -->> Frontend: Données des entitiés
  Frontend -->> User: Restitution visuelle
  deactivate Backend
  deactivate Frontend
```
