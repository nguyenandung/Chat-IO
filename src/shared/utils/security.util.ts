import * as bcrypt from 'bcrypt';

export const handleHashPassword = async (
  rawPassword: string,
): Promise<string> => {
  return await bcrypt.hash(rawPassword, await bcrypt.genSalt());
};

export const checkMatchPassword = async (
  rawPassword: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(rawPassword, hashPassword);
};
