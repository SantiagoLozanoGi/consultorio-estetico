function requireRole(allowedRoles = []) {
  if (!Array.isArray(allowedRoles)) {
    throw new Error("requireRole espera un array de roles");
  }

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        ok: false,
        error: "Usuario no autenticado",
      });
    }

    const { rol } = req.user;

    // developer = super rol
    if (rol === "developer") {
      return next();
    }

    if (!allowedRoles.includes(rol)) {
      return res.status(403).json({
        ok: false,
        error: "Acceso denegado para este rol",
      });
    }

    next();
  };
}

module.exports = requireRole;
