import UsersService from "#root/adapters/UsersService";

interface Args {
  password: string;
  email: string;
}

const signupResolver = async (obj: any, { password, email }: Args) => {
  return await UsersService.signup({ password, email });
};

export default signupResolver;
