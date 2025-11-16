import jwt from "jsonwebtoken";

export const verifyTokenAndRole = (rolesPermitidos) => {
  return (req, res, next) => {
    const token = req.cookies.token; // el token está en la cookie

    if (!token) {
      return res
        .status(401)
        .json({ message: "Acceso denegado. No hay token." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!rolesPermitidos.includes(req.user.rol)) {
        return res
          .status(403)
          .json({ message: "No tienes permisos para esta acción." });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: "Token inválido o expirado." });
    }
  };
};
