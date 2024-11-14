import { Dispatch, SetStateAction } from 'react';

export interface ContextType {
    data: boolean;
    setData: Dispatch<SetStateAction<boolean>>;
}