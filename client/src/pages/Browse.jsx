import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Browse() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem("flashcards")
    if (saved) setCards(JSON.parse(saved))
  }, [])

  function toggleFlip(index) {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  if (!cards.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center">
        <p className="text-gray-400 mb-4">No cards yet! Generate some first.</p>
        <button
          onClick={() => navigate("/generate")}
          className="bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition"
        >
          Generate Cards
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Deck</h1>
            <p className="text-gray-400 mt-1">{cards.length} cards — tap any card to flip</p>
          </div>
          <button
            onClick={() => navigate("/generate")}
            className="bg-gray-800 text-white px-5 py-2 rounded-xl text-sm hover:bg-gray-700 transition"
          >
            + New Deck
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => toggleFlip(index)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition min-h-36 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs text-gray-300 uppercase tracking-widest mb-2">
                  {flipped[index] ? "Answer" : "Question"}
                </p>
                <p className={`text-sm font-medium leading-relaxed ${flipped[index] ? "text-gray-500" : "text-gray-800"}`}>
                  {flipped[index] ? card.a : card.q}
                </p>
              </div>
              <p className="text-xs text-gray-200 mt-4 text-right">
                {flipped[index] ? "tap to see question" : "tap to see answer"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Browse