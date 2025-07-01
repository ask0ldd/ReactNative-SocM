import auth, { createUserWithEmailAndPassword, FirebaseAuthTypes, getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";
import type { AuthService } from "./interfaces/AuthService";
import type IAuthUser from "./interfaces/IAuthUser";

/**
   * @inheritdoc
*/
export default class FirebaseAuthService implements AuthService {

    auth : FirebaseAuthTypes.Module

    constructor(){
        this.auth = getAuth()
    }
    confirmPasswordReset(actionCode: string, newPassword: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    checkUserExists(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    /**
    * @inheritdoc
    */
    async signInWithGoogleCredential(credentials : FirebaseAuthTypes.AuthCredential): Promise<IAuthUser>{
        try {
            const userCredential : FirebaseAuthTypes.UserCredential = await this.auth.signInWithCredential(credentials)
            const user : FirebaseAuthTypes.User = userCredential.user
            return ({
                email : user.email,
                displayName : user.displayName,
                uid : user.uid,
                accessToken : await user.getIdToken()
            })
        } catch (error : unknown) {
            console.error(error)
            throw error
        }
    }

    /**
    * @inheritdoc
    */
    async signInWithEmailAndPassword(email: string, password: string): Promise<IAuthUser> {
        try {
            const userCredential : FirebaseAuthTypes.UserCredential = await signInWithEmailAndPassword(this.auth, email, password)
            const user : FirebaseAuthTypes.User = userCredential.user
            return ({
                email : user.email,
                displayName : user.displayName,
                uid : user.uid,
                accessToken : await user.getIdToken()
            })
        } catch (error : unknown) {
            console.error(error)
            throw error
        }
    }
    
    /**
    * @inheritdoc
    */
    async createUserWithEmailAndPassword(email : string, password : string) : Promise<IAuthUser>{
        try{
            const userCredential : FirebaseAuthTypes.UserCredential = await createUserWithEmailAndPassword(this.auth, email, password)
            const user = userCredential.user
            return ({
                email : user.email,
                displayName : user.displayName,
                uid : user.uid,
                accessToken : await user.getIdToken()
            })
        } catch (error : unknown) {
            console.error(error)
            throw error
        }
    }

    /*async isEmailRegistered(email : string) : Promise<boolean> {
        try {
            const methods = await this.auth.fetchSignInMethodsForEmail(email)
            console.log(JSON.stringify(methods))
            return methods.length > 0
        } catch (error) {
            console.error(error)
            return false
        }
    }*/

    /**
    * @inheritdoc
    */
    async sendPasswordResetEmail(email : string) : Promise<boolean>{
        try {
            await this.auth.sendPasswordResetEmail(email)
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    /**
    * @inheritdoc
    */
    async tryConfirmPasswordReset(actionCode : string, newPassword : string) : Promise<boolean>{
        try {
            await this.auth.confirmPasswordReset(actionCode, newPassword)
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    /**
    * @inheritdoc
    */
    async signOut() : Promise<void>{
        await this.auth.signOut()
    }

    get GoogleAuthProvider(){
        return auth.GoogleAuthProvider
    }
}