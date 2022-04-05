import UsersService from "#root/adapters/UsersService";
import { ResolverContext } from "#root/graphql/types";

interface Args {
  password: string;
  email: string;
}

const createUserSessionResolver = async (
  obj: any,
  { password, email }: Args,
  context: ResolverContext
) => {
  const userSession = await UsersService.createUserSession({ password, email });

  context.res.cookie("userSessionId", userSession.id, { httpOnly: true });

  return userSession;
};

export default createUserSessionResolver;
