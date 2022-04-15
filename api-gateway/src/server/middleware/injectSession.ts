import { NextFunction, Request, Response } from "express";

import UsersService, { UserSession } from "#root/adapters/UsersService";

const injectSession = async (
  // req: Request & { userSession: UserSession | null },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.cookies);

  // console.log("inject session req.cookie", req.cookies);
  // console.log("middleware", req.cookies.accessToken);
  //eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJmYmJlMTg5LWIwZDItNDNmZi04ZjhmLTQ2ZTNhNjdiMmQ5MiIsImVtYWlsIjoiemJiYmJAei5jb20iLCJpYXQiOjE2NDkzNTkwMDMsImV4cCI6MTY0OTM2MjYwM30.U3STVuLyZjLVZGi0pMDUhOhKWXle24tZtnhx-XqlgxFQMGpBqmQfsxq70wVnZMxMfFxLRoq9jOc6HW3R7ASw0A
  if (req.cookies.accessToken) {
    const userSession = await UsersService.fetchUserSession({
      accessToken: req.cookies.accessToken,
    });
    res.locals.userSession = userSession;
    // req.res
    // req.userSession = userSession;
    // if (userSession) console.log("userSession!!!", userSession.user.id);
  } else {
    // req.userSession = null;
    res.locals.userSession = null;
  }

  return next();
};

export default injectSession;
