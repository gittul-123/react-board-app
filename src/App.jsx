import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ReviewList from './pages/ReviewList.jsx'
import ReviewDetail from './pages/ReviewDetail.jsx'
import ReviewForm from './pages/ReviewForm.jsx'
import NotFound from './pages/NotFound.jsx'
import ReviewEdit from './pages/ReviewEdit.jsx'

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
        <Route path="/reviews/new" element={<ReviewForm />} />
        <Route path="/reviews/:id/edit" element={<ReviewEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App