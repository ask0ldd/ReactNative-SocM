import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { router } from 'expo-router';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

export interface IAuthContext {
  authenticatedUser: FirebaseAuthTypes.User | null
}

export const AuthContext = createContext<IAuthContext|null>({authenticatedUser : null})

export function AuthProvider({ children } : {children : ReactNode}) {
  const [user, setUser] = useState<FirebaseAuthTypes.User|null>(null)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser ?? null)
        if(currentUser == null) router.push("/(auth)/login")
    })
    return unsubscribe; // Cleanup subscription on unmount
  }, [])

  return (
    <AuthContext.Provider value={{authenticatedUser : user}}>
        {children}
    </AuthContext.Provider>
  );
}