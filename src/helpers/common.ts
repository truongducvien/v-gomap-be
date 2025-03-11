import * as qs from 'qs';

const getTokenFromRequestHeader = (req: Request): string | null => {
  const authorizationKey = req.headers['authorization'];
  if (!authorizationKey) return null;

  const [type, token] = authorizationKey.split(' ');
  if (type !== 'Bearer' || !token) return null;
  return token;
};

const getPublicFbAvatarUrl = (userId: string, accessToken: string) =>
  `https://graph.facebook.com/${userId}/picture?type=large&access_token=${accessToken}`;

const generateRedirectUrl = (
  originalUrl: string,
  query: Record<string, string>
): string => {
  if (!originalUrl) return null;
  try {
    const { origin, pathname, search } = new URL(originalUrl);
    const searchParams = qs.parse(search.replace('?', ''));
    const newSearchParams = { ...searchParams, ...query };
    return `${origin}${pathname}?${qs.stringify(newSearchParams)}`;
  } catch (error) {
    return null;
  }
};

export { getTokenFromRequestHeader, getPublicFbAvatarUrl, generateRedirectUrl };
