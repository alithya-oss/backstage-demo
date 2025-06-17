---
status: accepted  # {proposed | rejected | accepted | deprecated | … | superseded by [ADR-0005](0005-example.md)}
date: 2023-10-09  # {YYYY-MM-DD when the decision was last updated}
deciders: Florian JUDITH, Hani Rachdi # {list everyone involved in the decision}
consulted: Thomas ROUSSET  # {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
informed:  Aden Agaga De-Ralph Mvoula Moukouyou, Javier Prieto, Hani Rachdi  # {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---

# ADR-0003 Choisir la méthode d'intégration continue

## Historique technique

> _(Facultatif)_: Description ou URL du ticket.

L'offre de service AMWS dispose requiert que la base de code soit hébergé dans le sous-groupe Gitlab `amws` (https://gitlab.com/alithya-csna/amws) pour l'opérationnalisation du pipeline.

Le démonstrateur Backstage étant stocké dans un sous-groupe différent, nous devons répliquer les identifiants confidentiels afin que le pipeline puisse publier les artéfacts (i.e. conteneurs) dans Azure.

## Contexte et problématique

> Décrir le contexte et la problématique (e.g forme libre utilisant deux ou trois phrases. Vous pouvez articuler le problème sous la forme de questions/réponses)

L'équipe était partie de l'hypothèse que nous pourrions répliquer le pipeline en charge de la publication du Docusaurus "best-practice" du CSNA, qui est également déployé dans AMWS.

Cependant après analyse du code, ce pipeline n'est pas entierrement opérationnel, notamment dans la phase du publication de l'artfact dans Azure Registry.

## Facteurs de décision

> _(Facultatif)_: Force, Faibless, ou préocupatoin à prendre en compte.

- **Périmètre d'impact**: L'impact du changement doit avoir un impact minime sur les développements en cours
- **Délais de mise en oeuvre**: La mise en oeuvre doit être la plus rapide possible afin de ne pas retarder le chantier

## Options envisagées

- **Gitlab + ACR**: Déplacer le projet afin que les ingé. DevOps puisse mettre oeuvre un pipeline conforme à l'offre de service
- **Gitlab uniquement**: Développer un pipeline spécifique publiant les artéfacts dans Gitlab Registry.

## Résultat de la décision

- **Option choisie**: Gitlab uniquement
- **Dans le contexte du** démonstrateur Backstage
- **Faisant face à/au/aux** délais de livraison très court et la complexité de la migration
- **Nous avons retenu de** développeur la chaîne d'intégration et de stocker les artéfacts associés uniquement dans Gitlab
- **Pour parvenir à atteindre** date de démonstration de Backstage du 2023-10-13
- **En acceptant que:** la migration est nécessaire si le démonstrateur doit être mis en ligne sur le long terme

### Conséquences positives

> _(Facultatif)_: Amélioration, statisfaction d'un attribut qualité, décisions de suivi nécessaires, etc.

Nous savons que Backstage est un produit particulièrement lourd à intégrer (i.e 25/30 minutes d'exécution rien qu'en intégration).
Le développement spécifique nous offre l'occasion d'optimiser le pipeline afin d'augementer le nombre de livraison possible dans un journée.

### Conséquences négatives

> _(Facultatif)_: Dégradation, compromission d'un attribut qualité, décisions de suivi nécessaires, etc.

Du temps supplémentaire devra être alloué afin de mettre en conformité le pipeline.

## Evaluation concurrentiel

> _(Facultatif)_: Avantages et inconvénients de chaque option.

n/a

## Références

> _(Falcutatif)_: liens vers ADR, site Web, etc.

n/a