import { Routes, Route } from 'react-router-dom'
import {Navbar} from './components/Navbar'
import Home from './pages/Home'
import {Upload} from './pages/Upload'
import RandomShayari from './pages/RandomShayari'
import GenreExplore from './pages/GenreExplore'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/random" element={<RandomShayari />} />
          <Route path="/explore/:genre" element={<GenreExplore />} />
        </Routes>
      </main>
    </div>
  )
}

export default App