const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Helper to load JSON data
const loadData = (fileName) => {
  try {
    const dataPath = path.join(__dirname, '../data', fileName);
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (error) {
    console.error(`Error loading ${fileName}:`, error);
    return null;
  }
};

// Simple JSON API for University 1
router.get('/university1', (req, res) => {
  const data = loadData('university1.json');
  if (!data) return res.status(500).json({ error: 'Failed to load data' });
  res.json(data);
});

// Nested JSON API for University 2
router.get('/university2', (req, res) => {
  const data = loadData('university2.json');
  if (!data) return res.status(500).json({ error: 'Failed to load data' });
  res.json(data);
});

// Fees API (used in frontend modal) - Supports query param for filtering by course
router.get('/fees', (req, res) => {
  const data = loadData('fees.json');
  if (!data) return res.status(500).json({ error: 'Failed to load data' });

  const { course } = req.query; // e.g., /fees?course=B.Tech
  if (course) {
    const filtered = data.filter(f => f.course.toLowerCase() === course.toLowerCase());
    return res.json(filtered);
  }
  res.json(data);
});

// Additional Simple JSON API (e.g., for facilities)
router.get('/facilities', (req, res) => {
  const data = loadData('facilities.json');
  if (!data) return res.status(500).json({ error: 'Failed to load data' });
  res.json(data);
});

// Additional Nested JSON API (e.g., for placements)
router.get('/placements', (req, res) => {
  res.json({
    "stats": {
      "year": 2023,
      "placementRate": "95%",
      "highestPackage": 2500000
    },
    "companies": [
      { "name": "Google", "roles": ["Software Engineer", "Data Analyst"] },
      { "name": "Amazon", "roles": ["Product Manager", "DevOps Engineer"] }
    ]
  });
});

module.exports = router;