import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import { UserStore } from '../../services/store';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    SignOut(): Promise<void>;
    loadUserStoreDate: boolean;
}

interface AutherizationResponse {
    params: {
        access_token: string;
    },
    type: string;
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [loadUserStoreDate, setLoadUserStoreDate] = useState(true);

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');
    
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    
            const {type, params} = await AuthSession.startAsync({ authUrl }) as AutherizationResponse;

            if (type === "success") {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();

                const userLogged = {
                    id: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    photo: userInfo.picture
                }

                setUser(userLogged);

                await UserStore.set(userLogged)
            }

            
           
        } catch (error) {
            throw new Error(error);
        }

    }
    async function SignOut() {
        setUser({} as User);
        await UserStore.logout();
    }
    useEffect(() => {
        async function loadUserStoregeDate() {
            const userLogged = await UserStore.get() as User;
            if(userLogged.id) {
                setUser(userLogged); 
            }

            setLoadUserStoreDate(false);
        }

        loadUserStoregeDate();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            signInWithGoogle,
            SignOut,
            loadUserStoreDate
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export {
    AuthContext,
    AuthProvider,
    useAuth
}