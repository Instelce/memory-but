import type { Competence } from "$lib/types/Competence";


export const competences: Competence[] = [
    {
        name: "Réaliser le développement d’une application",
        number: "1",
        expectations: "Créer une application, faire évoluer une application, maintenir une application",
        goal: "Apprendre à réaliser efficacement une application informatique en équipe",
        detail: "Réaliser et implémenter des conceptions simples et efficaces qui respectent les principes d’accessibilité et d’ergonomie et les tester pour valider leur qualité.",
        projects: ["Sudoku en langage C", "Application de gestion d’une salle de spectacle en Java"],
        tecknologies: ["C", "CSS", "HTML", "Java", "JavaScript", "PHP"]
    },
    {
        name: "Optimiser une application informatique",
        number: "2",
        expectations: "Améliorer les performances des programmes, limiter l’impact environnemental d’une application, mettre en place des applications adaptées et efficaces.",
        goal: "Apprendre à optimiser n’importe quel critère d’une application informatique.",
        detail: "Analyser un algorithme et comprendre comment il fonctionne afin de l’améliorer suivant différents critères : temps d’exécution, mémoire...",
        projects: ["résolution de sudoku", "problème du cavalier"],
        tecknologies: ["C", "Python"]
    },
    {
        name: "Administrer un système informatique",
        number: "3",
        expectations: "Déployer une architecture technique, améliorer une interface existante et sécuriser les applications et les services.",
        goal: "Apprendre à installer et configurer un poste informatique et de déployer des servicres dans une architecture réseaue.",
        detail: "Prendre en main l’architecture UNIX, et se servir des commandes bash, avec la gestion des processus d’un ordinateur et la conteneurisation qui permet d’installer un environnement de travail plus rapidement.",
        projects: ["Un module automatisé de création de documentation de code sources en pdf.", "Installation d’un serveur avec base de données et pages web."],
        tecknologies: ["PHP", "Bash", "HTML", "CSS", "C", "Docker"]
    },
    {
        name: "Gérer une base de données",
        number: "4",
        expectations: "Modéliser et créer une base de données, la peupler et l’exploiter.",
        goal: "Apprendre à créer et administrer une base de données réaliste.",
        detail: "Réaliser un diagramme pour modéliser la base, puis la développer avant de l’implanter, la peupler et l’exploiter en faisant des requètes.",
        projects: ["modélisation et implantation d’une base sur le programme du but informatique et création", "peuplement, et exploitation des données avec les statistiques des collèges de france"],
        tecknologies: ["PostegreSQL", "UML"]
    },
    {
        name: "Conduire un projet",
        number: "5",
        expectations: "Lancer un nouveau projet, piloter le maintien d’un projet, faire évoluer un système d’information.",
        goal: "Apprendre à gérer et organiser efficacement un projet informatique.",
        detail: "Appréhender les besoins du client et de l’utilisateur, mettre en place des outils de gestion de projet, communiquer efficacement avec les différents acteurs d’un projet.",
        projects: ["Site internet de streaming en HTML/CSS"],
        tecknologies: ["CSS", "HTML", "JavaScript"]
    },
    {
        name: "Travailler dans une équipe",
        number: "6",
        expectations: "Acquérir et mobiliser les compétences interpersonnelles, assurer une veille technologique et informatique, apréhender un écosystème numérique.",
        goal: "Renforcer nos qualités humaines, permet d’intégrer ou d’organiser une équipe informatique saine et efficace.",
        detail: "Etre capable de s’intégrer efficacement au sein du milieu professionnel.",
        projects: ["Etudes des engagements RSE d’une entreprise", "Réalisation d’un évenement de team building avec film promotionnel"],
        tecknologies: ["Canva", "GitHub", "Teams"]
    }
]
