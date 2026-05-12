const mongoose = require("mongoose")

const deckSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  cards: [
    {
      q: String,
      a: String
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model("Deck", deckSchema)