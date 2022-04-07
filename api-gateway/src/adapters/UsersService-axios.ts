import config from "config";
import axios from "axios";

const USERS_SERVICE_URI = <string>config.get("USERS_SERVICE_URI");

export interface User {
  createdAt: string;
  id: string;
  email: string;
}

export interface UserSession {
  createdAt: string;
  expiresAt: string;
  id: string;
  user: any;
}

export default class UsersService {
  static async createUser({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) {
    try {
      const { data }: any = await axios.post(
        `${USERS_SERVICE_URI}/auth/register`,
        {
          password,
          email,
        }
      );
      console.log(data);

      return data.user;
    } catch (error: any) {
      console.log(error.message);
      return error;
    }
  }

  static async createUserSession({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) {
    const { data }: any = <UserSession>(
      await axios.post(`${USERS_SERVICE_URI}/auth/login`, { password, email })
    );
    // console.log("Data", data);

    return <UserSession>data;
  }

  static async deleteUserSession({ sessionId }: { sessionId: string }) {
    const { data }: any = await axios.delete(
      `${USERS_SERVICE_URI}/sessions/${sessionId}`
    );
    return data;
  }

  static async fetchUser({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<User | null> {
    const { data }: any = await axios.get(
      `${USERS_SERVICE_URI}/auth/currentuser`,
      {
        withCredentials: true,
        headers: {
          Cookie: `ACCESS_TOKEN=${accessToken};`,
        },
      }
    );
    if (!data) return null;
    return <User>data.user;
  }

  static async fetchUserSession({
    sessionId,
  }: {
    sessionId: string;
  }): Promise<UserSession | null> {
    console.log("ttt", sessionId);

    const { data }: any = await axios
      .get(`${USERS_SERVICE_URI}/currentuser`)
      .catch((err) => {
        if (err.response.statusCode === 404) return null;
        throw err;
      });
    if (!data) return null;
    return <UserSession>data.user;
  }
}
