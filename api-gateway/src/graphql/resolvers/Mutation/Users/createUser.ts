import UsersService from "#root/adapters/UsersService";

interface Args {
  password: string;
  email: string;
}

const createUserResolver = async (obj: any, { password, email }: Args) => {
  return await UsersService.createUser({ password, email });
};

export default createUserResolver;
