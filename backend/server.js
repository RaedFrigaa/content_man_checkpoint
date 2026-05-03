const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const dbPath = path.join(__dirname, "cms.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to SQLite database");
    initializeDatabase();
  }
});

// Initialize database
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS contents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Routes

// Get all contents
app.get("/api/contents", (req, res) => {
  db.all("SELECT * FROM contents ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get single content
app.get("/api/contents/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM contents WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Content not found" });
      return;
    }
    res.json(row);
  });
});

// Create content
app.post("/api/contents", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({ error: "Title and description are required" });
    return;
  }

  db.run(
    "INSERT INTO contents (title, description) VALUES (?, ?)",
    [title, description],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, title, description });
    },
  );
});

// Update content
app.put("/api/contents/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({ error: "Title and description are required" });
    return;
  }

  db.run(
    "UPDATE contents SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [title, description, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: "Content not found" });
        return;
      }
      res.json({ id, title, description });
    },
  );
});

// Delete content
app.delete("/api/contents/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM contents WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Content not found" });
      return;
    }
    res.json({ message: "Content deleted successfully" });
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) console.error(err);
    console.log("Database closed");
    process.exit(0);
  });
});
