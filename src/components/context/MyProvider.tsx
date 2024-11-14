import { ReactNode, useState, createContext } from 'react';
import { ContextType } from '../../types/ContextType';

interface ProviderProps {
    children: ReactNode;
}

const MyProvider = createContext<ContextType | undefined>(undefined);

export default function Provider({ children }: ProviderProps) {
    const [data, setData] = useState<boolean>(false);

    return (
        <MyProvider.Provider value={{ data, setData }}>
            {children}
        </MyProvider.Provider>
    );
}