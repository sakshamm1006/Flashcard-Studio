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
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-gray-400 mb-4">No cards yet!</p>
        <button onClick={() => navigate("/generate")}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300">
          Generate Cards
        </button>
      </div>
    )
  }

  if (index >= cards.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 max-w-md w-full">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-2">Round Complete!</h2>
          <p className="text-gray-400 mb-8">You studied {cards.length} cards</p>
          <div className="flex gap-4 justify-center mb-8">
            <div className="bg-green-500/20 border border-green-500/30 rounded-2xl px-8 py-4 text-center">
              <div className="text-3xl font-bold text-green-400">{known}</div>
              <div className="text-sm text-green-400/70 mt-1">Got it</div>
            </div>
            <div className="bg-red-500/20 border border-red-500/30 rounded-2xl px-8 py-4 text-center">
              <div className="text-3xl font-bold text-red-400">{learning}</div>
              <div className="text-sm text-red-400/70 mt-1">Still learning</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setIndex(0); setKnown(0); setLearning(0) }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30">
              Study Again
            </button>
            <button onClick={() => navigate("/generate")}
              className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300">
              New Cards
            </button>
          </div>
        </div>
      </div>
    )
  }

  const card = cards[index]
  const progress = Math.round((index / cards.length) * 100)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">

        {/* Progress */}
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{index + 1} / {cards.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}></div>
        </div>

        {/* Card */}
        <div onClick={!revealed ? reveal : undefined}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 text-center cursor-pointer min-h-56 flex flex-col items-center justify-center mb-6 hover:bg-white/15 transition-all duration-300 group">
          <p className="text-xs text-purple-300 uppercase tracking-widest mb-4">Question</p>
          <p className="text-xl font-semibold text-white leading-relaxed">{card.q}</p>

          {revealed && (
            <div className="mt-6 pt-6 border-t border-white/10 w-full">
              <p className="text-xs text-blue-300 uppercase tracking-widest mb-3">Answer</p>
              <p className="text-gray-300 leading-relaxed">{card.a}</p>
            </div>
          )}

          {!revealed && (
            <p className="text-xs text-gray-500 mt-6 group-hover:text-gray-400 transition-colors">
              Click to reveal answer
            </p>
          )}
        </div>

        {/* Buttons */}
        {revealed && (
          <div className="flex gap-4 justify-center">
            <button onClick={() => next(false)}
              className="bg-red-500/20 border border-red-500/30 text-red-400 px-8 py-3 rounded-2xl font-semibold hover:bg-red-500/30 hover:scale-105 transition-all duration-300">
              Still learning
            </button>
            <button onClick={() => next(true)}
              className="bg-green-500/20 border border-green-500/30 text-green-400 px-8 py-3 rounded-2xl font-semibold hover:bg-green-500/30 hover:scale-105 transition-all duration-300">
              Got it! ✓
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Study