import { createContext, useContext, useState } from 'react';

const ProcessusContext = createContext();

export const processusData = [
    {
        id: 1,
        name: "Controle Qualité Produits",
        description: "Processus de vérification et validation des produits finis",
        status: "Actif",
        author: "Marie Dubois",
        lastUpdate: "2025-06-15",
        documents: "5",
        tasks: "3",
        progressValue: 30,
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
];

export function ProcessusProvider({ children }) {
    const [processus, setProcessus] = useState(processusData);

    const getProcessusById = (id) => {
        return processus.find(p => p.id === parseInt(id));
    };

    return (
        <ProcessusContext.Provider value={{ processus, getProcessusById, setProcessus }}>
            {children}
        </ProcessusContext.Provider>
    );
}

export function useProcessus() {
    const context = useContext(ProcessusContext);
    if (!context) {
        throw new Error('useProcessus must be used within a ProcessusProvider');
    }
    return context;
}