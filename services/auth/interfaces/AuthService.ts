import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import type IAuthUser from "./IAuthUser"

/**
 * AuthService provides authentication methods for user sign-in, registration, and sign-out.
 */
export interface AuthService {
  /**
   * Signs in a user using their email and password.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<IAuthUser>} A promise that resolves to the authenticated user.
   */
  signInWithEmailAndPassword(email : string, password : string) : Promise<IAuthUser>

  /**
   * Creates a new user account with the given email and password.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<IAuthUser>} A promise that resolves to the newly created user.
   */
  createUserWithEmailAndPassword(email : string, password : string) : Promise<IAuthUser>

  /**
   * Signs in a user using Google authentication credentials.
   * @param {FirebaseAuthTypes.AuthCredential} credentials - The Google authentication credentials.
   * @returns {Promise<IAuthUser>} A promise that resolves to the authenticated user.
   */
  signInWithGoogleCredential(credentials : FirebaseAuthTypes.AuthCredential): Promise<IAuthUser>

  /**
   * Signs out the currently authenticated user.
   * @returns {Promise<void>} A promise that resolves when the user is signed out.
   */
  signOut() : Promise<void>

  /**
   * Sends a password reset email to the specified email address.
   *
   * @param {string} email - The email address to send the reset link to.
   * @returns {Promise<boolean>} A promise that resolves to true if the email was sent successfully, or false otherwise.
   */
  sendPasswordResetEmail(email : string) : Promise<boolean>

  /**
   * Confirms a password reset by verifying the action code and updating the password.
   *
   * @param {string} actionCode - The action code received from the password reset email.
   * @param {string} newPassword - The new password to set.
   * @returns {Promise<boolean>} A promise that resolves to true if the password reset was successful, or false otherwise.
   */
  tryConfirmPasswordReset(actionCode : string, newPassword : string) : Promise<boolean>
}