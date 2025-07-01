import TUser from "./TUser";

export interface UserService {

  /**
   * Finds a user by their unique identifier.
   * @param {string} uid - The unique identifier of the user.
   * @returns {Promise<TUser|null>} A promise that resolves to the user object if found, or null otherwise.
   */
  findByUID(uid : string) : Promise<TUser | null>

  /**
   * Retrieves all users.
   * @returns {Promise<TUser[]>} A promise that resolves to an array of user objects.
   */
  getAll() : Promise<TUser[]>

  /**
   * Finds a user by their email address.
   * @param {string} email - The email address of the user.
   * @returns {Promise<TUser|null>} A promise that resolves to the user object if found, or null otherwise.
   */
  findByEmail(email : string) : Promise<TUser | null>
  /*insert(user : Omit<IUser, 'id'>) : Promise<IUser>
  updateByUID(uid : string, user : Omit<IUser, 'id'>) : Promise<IUser>
  deleteByUID(uid : string) : Promise<void>*/
}