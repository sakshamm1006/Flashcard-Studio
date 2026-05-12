function Home({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Badge */}
      <div className="mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-purple-200 backdrop-blur-sm">
        ✦ AI Powered Flashcards
      </div>

      {/* Heading */}
      <h1 className="text-6xl font-bold text-white mb-4 leading-tight">
        Study Smarter with
        <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          AI Flashcards
        </span>
      </h1>

      <p className="text-gray-400 text-lg mb-10 max-w-md">
        Paste your notes, let AI generate study cards instantly. Master any topic faster than ever.
      </p>

      {/* CTA Button */}
      <button
        onClick={onStart}
        className="group bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
      >
        Get Started
        <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
      </button>

      {/* Stats */}
      <div className="mt-16 flex gap-12 text-center">
        <div>
          <div className="text-3xl font-bold text-white">AI</div>
          <div className="text-gray-400 text-sm mt-1">Powered</div>
        </div>
        <div className="w-px bg-white/10"></div>
        <div>
          <div className="text-3xl font-bold text-white">3</div>
          <div className="text-gray-400 text-sm mt-1">Study Modes</div>
        </div>
        <div className="w-px bg-white/10"></div>
        <div>
          <div className="text-3xl font-bold text-white">∞</div>
          <div className="text-gray-400 text-sm mt-1">Topics</div>
        </div>
      </div>
    </div>
  )
}

export default Home