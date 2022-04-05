import config from "config";
import got from "got";

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
  userId: string;
}

export default class UsersService {
  static async createUser({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) {
    const body: any = await got
      .post(`${USERS_SERVICE_URI}/auth/register`, { json: { password, email } })
      .json();

    return body.user;
  }

  static async createUserSession({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) {
    const body = <UserSession>await got
      .post(`${USERS_SERVICE_URI}/auth/login`, {
        json: { password, email },
      })
      .json();
    return body;
  }

  static async deleteUserSession({ sessionId }: { sessionId: string }) {
    const body = await got
      .delete(`${USERS_SERVICE_URI}/sessions/${sessionId}`)
      .json();
    return body;
  }

  static async fetchUser({ userId }: { userId: string }): Promise<User | null> {
    const body = await got.get(`${USERS_SERVICE_URI}/users/${userId}`).json();
    if (!body) return null;
    return <User>body;
  }

  static async fetchUserSession({
    sessionId,
  }: {
    sessionId: string;
  }): Promise<UserSession | null> {
    const body = await got
      .get(`${USERS_SERVICE_URI}/sessions/${sessionId}`)
      .json()
      .catch((err) => {
        if (err.response.statusCode === 404) return null;
        throw err;
      });
    if (!body) return null;
    return <UserSession>body;
  }
}
