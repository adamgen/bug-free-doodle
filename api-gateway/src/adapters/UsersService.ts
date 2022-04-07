import config from "config";
import got from "got";

const USERS_SERVICE_URI = <string>config.get("USERS_SERVICE_URI");

export interface User {
  createdAt: string;
  id: string;
  email: string;
}

export interface UserSession {
  user: {
    id: string;
    email: string;
    iat: number;
    exp: number;
  };
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
    return <UserSession>body;
  }

  static async deleteUserSession({ sessionId }: { sessionId: string }) {
    const body = await got
      .delete(`${USERS_SERVICE_URI}/sessions/${sessionId}`)
      .json();
    return body;
  }

  static async fetchUser({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<User | null> {
    const body: any = await got
      .get(`${USERS_SERVICE_URI}/auth/currentuser`, {
        headers: {
          Cookie: `ACCESS_TOKEN=${accessToken};`,
        },
      })
      .json();
    if (!body) return null;
    return <User>body.user;
  }

  static async fetchUserSession({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<UserSession | null> {
    //{withCredentials:true}
    // console.log("ttt", accessToken);

    const body = await got
      .get(`${USERS_SERVICE_URI}/auth/currentuser/${accessToken}`)
      .json()
      .catch((err) => {
        if (err.response.statusCode === 404) return null;
        throw err;
      });
    if (!body) return null;
    return <UserSession>body;
  }
}

// static async fetchUserSession({
//   sessionId,
// }: {
//   sessionId: string;
// }): Promise<UserSession | null> {   //{withCredentials:true}
//   // console.log("ttt", sessionId);

//   const body = await got
//     .get(`${USERS_SERVICE_URI}/auth/currentuser/${sessionId}`, {
//       headers: {
//         Cookie: `ACCESS_TOKEN=${sessionId};`,
//       },
//     })
//     .json()
//     .catch((err) => {
//       if (err.response.statusCode === 404) return null;
//       throw err;
//     });
//   if (!body) return null;
//   return <UserSession>body;
// }
// }
//FIXME
//localoht/?bla=galdagan query param
//.get(`${USERS_SERVICE_URI}/auth/currentuser/${sessionId}`, {  // path/route paramater
