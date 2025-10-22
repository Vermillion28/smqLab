export const processusDataInitial = [
    {
        id: 1,
        name: "Contrôle Qualité Produits Finis",
        description: "Processus de vérification visuelle, dimensionnelle et fonctionnelle des produits en fin de ligne d'assemblage, avant leur expédition vers le client.",
        status: "Actif",
        author: "Marie Dubois",
        copilote: "Jean Martin",
        lastUpdate: "2025-06-15",
        dateCreation: "2024-01-10",
        documents: "5",
        tasks: "3",
        progressValue: 30,
        type: "Opérationnel",
        finalité: "Garantir que seuls les produits conformes aux spécifications client et aux normes internes sont livrés, afin de minimiser les retours et de maintenir la satisfaction client.",
        champs_application: "S'applique à toutes les gammes de produits finis manufacturés sur le site de production de Lyon.",

        // Utilisation de tableaux pour plus de clarté et de cohérence
        objectifs: [
            { id: 1, libelle: "Réaliser 100% des contrôles définis dans le plan de contrôle." },
            { id: 2, libelle: "Maintenir un taux de non-conformité inférieur à 0.5%." },
            { id: 3, libelle: "Traiter 100% des non-conformités détectées dans les 24h." }
        ],
        exigences: [
            { id: 1, libelle: "Conformité aux normes ISO 9001:2015" },
            { id: 2, libelle: "Respect du plan de contrôle qualité REF-PC-045" },
            { id: 3, libelle: "Spécifications techniques du produit (document ST-XXX)" }
        ],
        ressources_associees: [
            { id: 1, libelle: "Poste de contrôle équipé (palpeur, caméra vision)" },
            { id: 2, libelle: "Logiciel de saisie des résultats (SQlite)" },
            { id: 3, libelle: "Personnel qualifié 'Contrôleur Qualité'" }
        ],
        element_entres: [
            { id: 1, libelle: "Produit fini en attente de contrôle" },
            { id: 2, libelle: "Bon de travail et gamme de contrôle" },
            { id: 3, libelle: "Spécifications client mises à jour" }
        ],
        element_sortis: [
            { id: 1, libelle: "Produit étiqueté 'Conforme' et dirigé vers l'expédition" },
            { id: 2, libelle: "Fiche de contrôle remplie et archivée" },
            { id: 3, libelle: "Fiche de non-conformité (le cas échéant)" }
        ],
        beneficiare: [
            { id: 1, libelle: "Client final" },
            { id: 2, libelle: "Service Commercial" },
            { id: 3, libelle: "Direction Générale" }
        ],
        // Référence à d'autres processus par leur ID ou nom
        processus_amont: [
            { id: 2, name: "Assemblage Final" } // Référence à un autre objet processus
        ],
        processus_aval: [
            { id: 3, name: "Emballage et Expédition" } // Référence à un autre objet processus
        ],
        risque_actions: [
            {
                id: 1,
                risque_cle: "Défaut non détecté lors du contrôle",
                action_corrective: "Étalonnage hebdomadaire des équipements de mesure et double contrôle aléatoire"
            },
            {
                id: 2,
                risque_cle: "Surcharge de l'atelier entraînant un bypass du contrôle",
                action_corrective: "Intégration du temps de contrôle dans le temps de cycle produit. Alerte automatique si délai non respecté."
            }
        ],
        indicateur_performance: [
            {
                id: 1,
                indicateur: "Taux de conformité des produits",
                frequence: "Quotidienne",
                valeur_cible: "> 99.5%",
                valeur_actuelle: "99.7%"
            },
            {
                id: 2,
                indicateur: "Temps de traitement moyen d'une non-conformité",
                frequence: "Hebdomadaire",
                valeur_cible: "< 24h",
                valeur_actuelle: "18h"
            },
        ],
    },

    {
        id: 2,
        name: "Gestion des Commandes Clients",
        description: "Traitement des commandes depuis la réception jusqu'à la livraison",
        status: "en cours",
        author: "Jean Martin",
        lastUpdate: "2025-09-15",
        documents: "5",
        tasks: "3",
        progressValue: 50,
    },
]