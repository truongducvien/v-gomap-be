const getTokenFromRequestHeader = (req: Request): string | null => {
  const authorizationKey = req.headers['authorization'];
  if (!authorizationKey) return null;

  const [type, token] = authorizationKey.split(' ');
  if (type !== 'Bearer' || !token) return null;
  return token;
};

export { getTokenFromRequestHeader };
