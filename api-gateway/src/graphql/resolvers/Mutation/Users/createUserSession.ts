import UsersService from "#root/adapters/UsersService";
import { ResolverContext } from "#root/graphql/types";

interface Args {
  password: string;
  email: string;
}
//login mutation
const createUserSessionResolver = async (
  obj: any,
  { password, email }: Args,
  context: ResolverContext
) => {
  const userSession: any = await UsersService.createUserSession({
    password,
    email,
  });

  // console.log("ttt", userSession.user.accessToken);

  context.res.cookie("accessToken", userSession.user.accessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  // console.log("context.res.cookie#", context.res.cookie("userSessionId"));
  return userSession;
};

export default createUserSessionResolver;
