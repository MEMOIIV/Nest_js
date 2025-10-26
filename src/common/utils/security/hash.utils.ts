import bcrypt from 'bcrypt';

export const generateHash = async ({
  plainText,
  saltRound = Number(process.env.SALT_ROUND),
}: {
  plainText: string;
  saltRound?: number;
}) => {
  return await bcrypt.hash(plainText, saltRound);
};

export const compareHash = async ({
  plainText,
  hash,
}: {
  plainText: string;
  hash: string;
}) => {
  return await bcrypt.compare(plainText, hash);
};
