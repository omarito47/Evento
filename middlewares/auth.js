import jwt from "jsonwebtoken";

export default async function auth(req, res, next) {
  const token = req.headers.access_token;
  if (!token) return res.status(401).send();

  try {
    const decodedUser = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser;
  } catch (error) {
    return res.status(401).send();
  }

  return next();
}
