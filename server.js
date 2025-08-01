const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, 'interns.json');

// Helper: Read interns from file
function getInterns() {
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]');
  const data = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(data);
}

// Helper: Save interns to file
function saveInterns(interns) {
  fs.writeFileSync(dataFile, JSON.stringify(interns, null, 2));
}

// POST new intern (Signup)
app.post('/api/interns', (req, res) => {
  const { internName, referralCode } = req.body;
  let interns = getInterns();

  const existing = interns.find(i => i.internName === internName);
  if (existing) return res.status(400).json({ message: 'Intern Name already exists' });

  const newIntern = {
    id: interns.length + 1,
    internName,
    referralCode,
    amountRaised: Math.floor(Math.random() * 15000)
  };

  interns.push(newIntern);
  saveInterns(interns);
  res.status(201).json(newIntern);
});
// GET all interns (Leaderboard)
app.get('/api/interns/top', (req, res) => {
  const interns = getInterns();
  const top3 = interns
    .sort((a, b) => b.amountRaised - a.amountRaised)
    .slice(0, 3);
  res.json(top3);
});
// GET intern by internName (Login)
app.get('/api/interns/:internName', (req, res) => {
  const interns = getInterns();
  const intern = interns.find(i => i.internName === req.params.internName);
  intern ? res.json(intern) : res.status(404).json({ message: 'Intern not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
