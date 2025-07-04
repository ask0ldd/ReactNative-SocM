import FirebaseAuthService from '@/services/auth/FirebaseAuthService';
import GooglePlacesService from '@/services/GooglePlacesService';
import StorageService from '@/services/StorageService';
import FirebaseUserService from '@/services/user/FirebaseUserService';
import { createContext, ReactNode } from 'react';

export interface IServicesContext {
  authService: FirebaseAuthService,
  userService: FirebaseUserService,
  storageService : StorageService,
  googlePlacesService : GooglePlacesService
}

export const ServicesContext = createContext<IServicesContext|null>(null)

export function ServicesProvider({ children } : {children : ReactNode}) {

  return (
    <ServicesContext.Provider value={{
      authService : new FirebaseAuthService(), 
      userService : new FirebaseUserService(),
      storageService : new StorageService(),
      googlePlacesService : new GooglePlacesService()
    }}>
        {children}
    </ServicesContext.Provider>
  );
}