const express = require("express")
const router = express.Router()
const Deck = require("../models/Deck")
const auth = require("../middleware/auth")

// Save a deck
router.post("/save", auth, async (req, res) => {
  try {
    const { topic, cards } = req.body
    const deck = await Deck.create({ userId: req.userId, topic, cards })
    res.json(deck)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get all decks for a user
router.get("/", auth, async (req, res) => {
  try {
    const decks = await Deck.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(decks)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// Delete a deck
router.delete("/:id", auth, async (req, res) => {
  try {
    await Deck.findByIdAndDelete(req.params.id)
    res.json({ message: "Deck deleted" })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router