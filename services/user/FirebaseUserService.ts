import userSchema from "@/zod/userSchema";
import { collection, doc, FirebaseFirestoreTypes, getDoc, getDocs, getFirestore, query, where } from "@react-native-firebase/firestore";
import type TUser from "./interfaces/TUser";
import type { UserService } from "./interfaces/UserService";

export default class FirebaseUserService implements UserService{

    firestore : FirebaseFirestoreTypes.Module

    constructor(){
        this.firestore = getFirestore()
    }
    
    /**
    * @inheritdoc
    */
    async findByUID(uid: string): Promise<TUser | null> {
        try{
            const usersCollectionRef = collection(this.firestore, "users");
            const userDocRef = doc(usersCollectionRef, uid)
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                throw new Error("No user document found for the requested user.")
            }

            const userData = userDocSnap.data()
            const user = userSchema.omit({ uid: true }).parse(userData)

            return {
                uid: userDocSnap.id,
                firstname: user.firstname,
                lastname: user.lastname,
                displayName: user.displayName,
            }
        }catch(error : unknown){
            if (error instanceof Error && error.name === "ZodError") {
                console.error(`The data returned by firebase for the user with the uid ${uid} is malformed :`, error)
                //throw new Error("Validation failed: " + error.message)
            } else {
                console.error(`Error finding the user ${uid} : `, error)
                //throw error
            }
            return null
        }
    }

    /**
    * @inheritdoc
    */
    async findByEmail(email: string): Promise<TUser | null> {
        try{
            const usersCollectionRef = collection(this.firestore, "users");
            const q = query(usersCollectionRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return null
            }

            const userDocSnap = querySnapshot.docs[0]
            const userData = userDocSnap.data()
            const user = userSchema.omit({ uid: true }).parse(userData)

            return {
                uid: userDocSnap.id,
                firstname: user.firstname,
                lastname: user.lastname,
                displayName: user.displayName,
            }
        }catch(error : unknown){
            if (error instanceof Error && error.name === "ZodError") {
                console.error(`The data returned by firebase for the user with the email ${email} is malformed :`, error)
                //throw new Error("Validation failed: " + error.message)
            } else {
                console.error(`Error finding the user with the email ${email} : `, error)
                //throw error
            }
            return null
        }
    }


    /**
    * @inheritdoc
    */
    async getAll(): Promise<TUser[]> {
        try{
            const snapshot = await getDocs(collection(this.firestore, "users"));
            const users = snapshot.docs.map(doc => {
                
                const userData = doc.data()
                // validating data with zod
                const user = userSchema.parse(userData)

                return {
                id: doc.id,
                ...user,
                }
            })
            return users
        }catch(error : unknown){
            if (error instanceof Error && error.name === "ZodError") {
                console.error(`The data returned by firebase for the users is malformed :`, error)
                return []
                //throw new Error("Validation failed: " + error.message)
            } else {
                console.error(`Error finding any user : `, error)
                return []
                //throw error
            }
        }
    }

}