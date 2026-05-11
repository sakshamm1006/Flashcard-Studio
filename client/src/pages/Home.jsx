function Home({ onStart }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Flashcard Studio</h1>
      <p className="text-gray-500 text-lg mb-8">Paste your notes, let AI generate study cards instantly</p>
      <button
        onClick={onStart}
        className="bg-gray-800 text-white px-8 py-3 rounded-xl text-lg hover:bg-gray-700 transition"
      >
        Get Started
      </button>
    </div>
  )
}

export default Home