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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Generate Flashcards</h1>
        <p className="text-gray-400 mb-6">Paste your notes or just type a topic</p>

        <textarea
          className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 text-sm resize-none focus:outline-none focus:border-gray-400 mb-4"
          rows={6}
          placeholder="e.g. Photosynthesis is the process by which plants convert sunlight into food..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-gray-500">Cards to generate:</span>
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"
            value={cardCount}
            onChange={(e) => setCardCount(e.target.value)}
          >
            <option value={5}>5 cards</option>
            <option value={8}>8 cards</option>
            <option value={12}>12 cards</option>
          </select>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="ml-auto bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition disabled:opacity-40"
          >
            {loading ? "Generating..." : "Generate Cards"}
          </button>
        </div>

        {status && (
          <p className="text-sm text-gray-500">{status}</p>
        )}
      </div>
    </div>
  )
}

export default Generate