const getTokenFromRequestHeader = (req: Request): string | null => {
  const authorizationKey = req.headers['authorization'];
  if (!authorizationKey) return null;

  const [type, token] = authorizationKey.split(' ');
  if (type !== 'Bearer' || !token) return null;
  return token;
};

const getPublicFbAvatarUrl = (userId: string, accessToken: string) =>
  `https://graph.facebook.com/${userId}/picture?type=large&access_token=${accessToken}`;

export { getTokenFromRequestHeader, getPublicFbAvatarUrl };
