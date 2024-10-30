import express from 'express';
import { validateCodeWithJest } from '../controllers/validateController.js';

const router = express.Router();

router.post('/debugging', (req, res) => {
  const { userCode, testCases } = req.body;
  const result = validateCodeWithJest(userCode, testCases);

  if (result.success) {
    res.status(200).json({ success: true, results: result.results });
  } else {
    res.status(400).json({ success: false, results: result.results });
  }
});

export default router;
