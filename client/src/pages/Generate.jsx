import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Generate() {
  const [notes, setNotes] = useState("")
  const [cardCount, setCardCount] = useState(8)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const navigate = useNavigate()

  async function handleGenerate() {
    if (!notes.trim()) {
      setStatus("Please enter some notes or a topic first.")
      return
    }

    setLoading(true)
    setStatus("AI is generating your flashcards...")

    const prompt = `You are a flashcard creator. Generate exactly ${cardCount} high-quality study flashcards from the following notes/topic.

Notes/Topic:
${notes}

Respond ONLY with a valid JSON array, no markdown, no explanation. Format:
[{"q":"question here","a":"concise answer here"},...]

Make questions clear and specific. Answers should be 1-3 sentences.`

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000,
        }),
      })

      const data = await res.json()
      const text = data.choices[0].message.content
      const clean = text.replace(/```json|```/g, "").trim()
      const cards = JSON.parse(clean)

      localStorage.setItem("flashcards", JSON.stringify(cards))
      setStatus(`${cards.length} cards created!`)
      setLoading(false)
      navigate("/study")
    } catch (e) {
      setStatus("Something went wrong. Try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Generate Flashcards</h1>
          <p className="text-gray-400">Paste your notes or just type a topic</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm resize-none focus:outline-none focus:border-purple-500/50 placeholder-gray-500 mb-6 transition-all duration-200"
            rows={6}
            placeholder="e.g. Photosynthesis is the process by which plants convert sunlight into food...

Or just type a topic like: French Revolution"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Cards:</span>
            <select
              className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              value={cardCount}
              onChange={(e) => setCardCount(e.target.value)}
            >
              <option value={5} className="bg-slate-800">5 cards</option>
              <option value={8} className="bg-slate-800">8 cards</option>
              <option value={12} className="bg-slate-800">12 cards</option>
            </select>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="ml-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 disabled:opacity-40 disabled:scale-100"
            >
              {loading ? "✨ Generating..." : "✨ Generate Cards"}
            </button>
          </div>

          {status && (
            <p className={`text-sm mt-4 ${status.includes("created") ? "text-green-400" : "text-gray-400"}`}>
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
export default Generate