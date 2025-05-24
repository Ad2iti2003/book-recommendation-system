import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Recommedation from "./Components/Recommedation"
import Contact from "./Components/Contact"


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reco" element={<Recommedation />} />
        <Route path="/con" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
