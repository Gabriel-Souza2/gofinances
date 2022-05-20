import AsyncStorage from '@react-native-async-storage/async-storage';

import { TransactionsListProps } from '../../screens/Dashboard';

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}


interface PersistentTransancions {
    set: ( data: TransactionsListProps, user:  User ) => void;
    get: ( user:  User ) => Promise<TransactionsListProps[]>;
}

interface UserStore {
    set: ( data: User ) => void;
    get: () => Promise<User>;
    logout: () => Promise<void>;
}


export const StoreTransancions: PersistentTransancions = {
    async set( data: TransactionsListProps, user:  User) {
       
        const KEY = `@gofinances::transactions::${user.id}`
       
        const transactions = await AsyncStorage.getItem(KEY);

        const currentTransaction = transactions ? JSON.parse(transactions) : [];

        await AsyncStorage.setItem(KEY, JSON.stringify([
            ...currentTransaction, data
        ]));

    },
  
    async get( user:  User ): Promise<TransactionsListProps[]> {
        const KEY = `@gofinances::transactions::${user.id}`

        const transactions = await AsyncStorage.getItem(KEY);

        const response = transactions ? JSON.parse(transactions) : [];

        return response;
    }
}

const USER_KEY = '@gofinances::user';

export const UserStore: UserStore = {
    async set( data: User ) {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
    },

    async get(): Promise<User> {
        const user = await AsyncStorage.getItem(USER_KEY);
        const response = user ? JSON.parse(user) : {};
        return response;
    },
    
    async logout():  Promise<void> {
        await AsyncStorage.removeItem(USER_KEY);
    }
}