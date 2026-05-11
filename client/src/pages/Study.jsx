import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Study() {
  const [cards, setCards] = useState([])
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [known, setKnown] = useState(0)
  const [learning, setLearning] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem("flashcards")
    if (saved) setCards(JSON.parse(saved))
  }, [])

  function reveal() {
    setRevealed(true)
  }

  function next(isKnown) {
    if (isKnown) setKnown(k => k + 1)
    else setLearning(l => l + 1)
    setRevealed(false)
    setIndex(i => i + 1)
  }

  if (!cards.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-400 mb-4">No cards yet!</p>
        <button onClick={() => navigate("/generate")} className="bg-gray-800 text-white px-6 py-2 rounded-xl">
          Generate Cards
        </button>
      </div>
    )
  }

  if (index >= cards.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Round Complete!</h2>
        <p className="text-gray-400 mb-8">You studied {cards.length} cards</p>
        <div className="flex gap-6 mb-8">
          <div className="bg-green-50 rounded-2xl px-8 py-4 text-center">
            <div className="text-3xl font-bold text-green-600">{known}</div>
            <div className="text-sm text-green-500 mt-1">Got it</div>
          </div>
          <div className="bg-red-50 rounded-2xl px-8 py-4 text-center">
            <div className="text-3xl font-bold text-red-400">{learning}</div>
            <div className="text-sm text-red-400 mt-1">Still learning</div>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => { setIndex(0); setKnown(0); setLearning(0) }} className="bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition">
            Study Again
          </button>
          <button onClick={() => navigate("/generate")} className="border border-gray-200 text-gray-600 px-6 py-2 rounded-xl hover:bg-gray-50 transition">
            New Cards
          </button>
        </div>
      </div>
    )
  }

  const card = cards[index]
  const progress = Math.round((index / cards.length) * 100)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">

        {/* Progress */}
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{index + 1} / {cards.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
          <div className="bg-gray-800 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Card */}
        <div
          onClick={!revealed ? reveal : undefined}
          className="bg-white rounded-2xl shadow p-10 text-center cursor-pointer min-h-48 flex flex-col items-center justify-center mb-6"
        >
          <p className="text-xs text-gray-300 uppercase tracking-widest mb-4">Question</p>
          <p className="text-xl font-medium text-gray-800">{card.q}</p>

          {revealed && (
            <div className="mt-6 pt-6 border-t border-gray-100 w-full">
              <p className="text-xs text-gray-300 uppercase tracking-widest mb-3">Answer</p>
              <p className="text-gray-600">{card.a}</p>
            </div>
          )}

          {!revealed && (
            <p className="text-xs text-gray-300 mt-6">Tap to reveal answer</p>
          )}
        </div>

        {/* Buttons */}
        {revealed && (
          <div className="flex gap-4 justify-center">
            <button onClick={() => next(false)} className="bg-red-50 text-red-400 border border-red-100 px-8 py-3 rounded-xl hover:bg-red-100 transition">
              Still learning
            </button>
            <button onClick={() => next(true)} className="bg-green-50 text-green-600 border border-green-100 px-8 py-3 rounded-xl hover:bg-green-100 transition">
              Got it!
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Study