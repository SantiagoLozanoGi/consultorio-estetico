const express = require("express");
const router = express.Router();
const { pool } = require("../lib/db");
const verifyToken = require("../middlewares/verifyToken");
const requireRole = require("../middlewares/requireRole");

// POST /citas/:id/solicitar-reagenda
router.post(
  "/citas/:id/solicitar-reagenda",
  verifyToken,
  requireRole(["usuario"]),
  async (req, res) => {
    // código aquí
  }
);

// GET /reagendas
router.get(
  "/reagendas",
  verifyToken,
  requireRole(["admin", "developer"]),
  async (req, res) => {
    // código aquí
  }
);

// POST /reagendas/:id/aprobar
router.post(
  "/reagendas/:id/aprobar",
  verifyToken,
  requireRole(["admin", "developer"]),
  async (req, res) => {
    // código aquí
  }
);

// POST /reagendas/:id/rechazar
router.post(
  "/reagendas/:id/rechazar",
  verifyToken,
  requireRole(["admin", "developer"]),
  async (req, res) => {
    // código aquí
  }
);

module.exports = router;
