import type { Competence } from "$lib/types/Competence";


export const competences: Competence[] = [
    {
        name: "Réaliser le développement d’une application",
        number: 1,
        detail: "Réaliser et implémenter des conceptions simples et efficaces qui respectent les principes d’accessibilité et d’ergonomie et les tester pour valider leur qualité.",
        technologies: ["C", "CSS", "HTML", "Java", "JavaScript", "PHP"],
        goal: "Apprendre à réaliser efficacement une application informatique en équipe",
        fields: {
            expectations: ["Créer une application", "Faire évoluer une application", "Maintenir une application"],
            projects: ["Sudoku en langage C", "Application de gestion d’une salle de spectacle"],
        }
    },
    {
        name: "Optimiser une application informatique",
        number: 2,
        detail: "Analyser un algorithme et comprendre comment il fonctionne afin de l’améliorer suivant différents critères : temps d’exécution, mémoire...",
        technologies: ["C", "Python"],
        goal: "Apprendre à optimiser n’importe quel critère d’une application informatique.",
        fields: {
            expectations: ["Améliorer les performances des programmes", "Limiter l’impact environnemental d’une application", "Mettre en place des applications adaptées et efficaces"],
            projects: ["Algorithme de résolution de sudoku", "Algorithme qui modélise un problème mathématiques"],
        }
    },
    {
        name: "Administrer un système informatique",
        number: 3,
        detail: "Prendre en main l’architecture UNIX, et se servir des commandes bash, avec la gestion des processus d’un ordinateur et la conteneurisation qui permet d’installer un environnement de travail plus rapidement.",
        technologies: ["Docker", "Bash", "PHP"],
        goal: "Installer et configurer un poste informatique et de déployer des services dans une architecture réseau.",
        fields: {
            expectations: ["Déployer une architecture technique", "Améliorer une interface existante", "Sécuriser les applications et les services"],
            projects: ["Générateur de documentation de code en PDF", "Installation d’un serveur(BDD et pages web)"],
        }
    },
    {
        name: "Gérer une base de données",
        number: 4,
        detail: "Réaliser un diagramme pour modéliser la base, puis la développer avant de l’implanter, la peupler et l’exploiter en faisant des requètes.",
        technologies: ["PostegreSQL", "UML"],
        goal: "Apprendre à créer et administrer une base de données réaliste.",
        fields: {
            expectations: ["Modéliser et créer une base de données", "Peupler et exploiter une base de données"],
            projects: ["Modélisation d’une base de données", "Peuplement et exploitation des données", "Statistiques sur une base de données"],
        }
    },
    {
        name: "Conduire un projet",
        number: 5,
        detail: "Appréhender les besoins du client et de l’utilisateur, mettre en place des outils de gestion de projet, communiquer efficacement avec les différents acteurs d’un projet.",
        technologies: ["JIRA", "SCRUM", "methodologie agile"],
        goal: "Gérer et organiser efficacement un projet informatique.",
        fields: {
            expectations: ["Lancer un nouveau projet" ,"Piloter le maintien d’un projet", "Faire évoluer un système d’information"],
            projects: ["Mise en place d'un environnement pour le suivi d'un projet"],
        }
    },
    {
        name: "Travailler dans une équipe",
        number: 6,
        detail: "Etre capable de s’intégrer efficacement au sein du milieu professionnel.",
        technologies: ["Canva", "GitHub", "Teams"],
        goal: "Renforcer nos qualités humaines, permet d’intégrer ou d’organiser une équipe informatique saine et efficace.",
        fields: {
            expectations: ["Acquérir et mobiliser les compétences interpersonnelles", "Assurer une veille technologique et informatique", "Apréhender un écosystème numérique"],
            projects: ["Etudes des engagements RSE d’une entreprise", "Réalisation d’un évenement de team building"],
        }
    }
]


export function getCompetenceColor(competence: Competence) {
    switch (competence.number) {
        case 1:
            return "rgb(79, 70, 229)"; // indigo
        case 2:
            return "rgb(5, 150, 105)"; // emerald
        case 3:
            return "rgb(253, 223, 18)"; // yellow
        case 4:
            return "rgb(247, 141, 17)"; // orange
        case 5:
            return "rgb(219, 39, 119)"; // pink
        case 6:
            return "rgb(239, 68, 68)"; // red
    }
}

export function getCompetence(number: number): Competence {
    return competences.find(competence => competence.number === number) as Competence;
}