import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Generate from "./pages/Generate"
import Study from "./pages/Study"
import Browse from "./pages/Browse"

function HomeWrapper() {
  const navigate = useNavigate()
  return <Home onStart={() => navigate("/generate")} />
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {children}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><HomeWrapper /></Layout>} />
        <Route path="/generate" element={<Layout><Generate /></Layout>} />
        <Route path="/study" element={<Layout><Study /></Layout>} />
        <Route path="/browse" element={<Layout><Browse /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App