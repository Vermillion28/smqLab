import { createContext, useContext, useState } from 'react';
import { processusDataInitial } from '../pages/responsableQ/dataProcessus';

const ProcessusContext = createContext();

export function ProcessusProvider({ children }) {
    const [processus, setProcessus] = useState(processusDataInitial);

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