import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ReviewList from './pages/ReviewList.jsx'
import ReviewDetail from './pages/ReviewDetail.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<ReviewList />} />
        <Route path="/reviews/:id" element={<ReviewDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App