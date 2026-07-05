const express = require("express")
const router = express.Router()
const multer = require("multer")
const pdfParse = require("pdf-parse")

// Store file in memory (not on disk)
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true)
    } else {
      cb(new Error("Only PDF files allowed"))
    }
  }
})

// POST /upload
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    // Extract text from PDF buffer
    const data = await pdfParse(req.file.buffer)
    const text = data.text.trim()

    if (!text) {
      return res.status(400).json({ message: "Could not extract text from PDF" })
    }

    res.json({
      text,
      pages: data.numpages,
      message: "PDF extracted successfully"
    })
  } catch (err) {
    res.status(500).json({ message: "Failed to process PDF" })
  }
})

module.exports = router