import conf from "../config/conf";
import { Client, Account, ID, Permission, Role } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    // this.client.headers['x-appwrite-key'] = conf.appWriteSecretKey;
    this.account = new Account(this.client);
    // this.account.create('testUser', 'email@example.com', '2345678987654');
    console.log("account ::", this.account);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call login method

        this.login({ email, password });
        return userAccount;
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Error in Create Account :: ", error);
    }
  }

  async login({ email, password }) {
    try {
      console.log("email in Login :", email);
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error in login :: ", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error in getCurrentUser : : ", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}
const authService = new AuthService();
export default authService;
