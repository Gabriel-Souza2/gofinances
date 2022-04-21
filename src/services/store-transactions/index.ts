import AsyncStorage from '@react-native-async-storage/async-storage';

import { TransactionsListProps } from '../../screens/Dashboard';

interface PersistentTransancions {
    set: ( data: TransactionsListProps ) => void;
    get: () => Promise<TransactionsListProps[]>;
    //removeAll: () => void;
}

const DATA_KEY = '@gofinances::transactions';

export const StoreTransancions: PersistentTransancions = {
    async set( data: TransactionsListProps ) {
        const transactions = await AsyncStorage.getItem(DATA_KEY);

        const currentTransaction = transactions ? JSON.parse(transactions) : [];

        await AsyncStorage.setItem(DATA_KEY, JSON.stringify([
            ...currentTransaction, data
        ]));

    },
  
    async get(): Promise<TransactionsListProps[]> {
        const transactions = await AsyncStorage.getItem(DATA_KEY);
        const response = transactions ? JSON.parse(transactions) : [];
        return response;
    }
}