import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ReviewList from './pages/ReviewList.jsx'
import ReviewDetail from './pages/ReviewDetail.jsx'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to ="/">홈</Link>
        <Link to ="/reviews">리뷰 목록</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<ReviewList />} />
        <Route path="/reviews/:id" element={<ReviewDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App