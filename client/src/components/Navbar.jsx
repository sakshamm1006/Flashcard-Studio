import { useNavigate, useLocation } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    { path: "/", label: "Home" },
    { path: "/generate", label: "Generate" },
    { path: "/study", label: "Study" },
    { path: "/browse", label: "Browse" },
  ]

  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <span
        onClick={() => navigate("/")}
        className="text-lg font-bold text-gray-800 cursor-pointer"
      >
        Flashcard Studio
      </span>
      <div className="flex gap-6">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`text-sm transition ${
              location.pathname === link.path
                ? "text-gray-800 font-semibold"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar