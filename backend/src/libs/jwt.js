import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, // el payload puede incluir id, rol, email, etc.
      TOKEN_SECRET,
      {
        expiresIn: "1d", // token válido por 1 día
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
