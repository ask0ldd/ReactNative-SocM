import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StorageService{
    async get(dataIdentifier : string){
        try{
            return await AsyncStorage.getItem(dataIdentifier)
        } catch(error){
            console.error(error)
        }
    }

    async set(dataIdentifier : string, data : string){
        try{
            await AsyncStorage.setItem(dataIdentifier, data)
        } catch(error){
            console.error(error)
        }
    }

    async flushItems(items : string[]){
        try{
            for(const item of items){
                await AsyncStorage.removeItem(item)
            }
        } catch(error){
            console.error(error)
        }
    }
}

// !!! verifier data avec zod