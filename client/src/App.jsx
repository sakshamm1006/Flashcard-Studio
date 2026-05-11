import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Generate from "./pages/Generate"
import Study from "./pages/Study"
import Browse from "./pages/Browse"

function HomeWrapper() {
  const navigate = useNavigate()
  return <Home onStart={() => navigate("/generate")} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/study" element={<Study />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App