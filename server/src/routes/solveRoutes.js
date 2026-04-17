import express from 'express';
import { solveNodal } from '../solvers/nodalSolver.js';
import { solveMesh } from '../solvers/meshSolver.js';
import { solveThevenin } from '../solvers/theveninSolver.js';
import { solveAC } from '../solvers/acSolver.js';

const router = express.Router();

function handleSolve(fn) {
  return (req, res) => {
    try {
      const result = fn(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
}

router.post('/nodal', handleSolve(solveNodal));
router.post('/mesh', handleSolve(solveMesh));
router.post('/thevenin', handleSolve(solveThevenin));
router.post('/ac', handleSolve(solveAC));

export default router;
