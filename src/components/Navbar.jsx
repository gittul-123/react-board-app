import { Link } from 'react-router-dom'

function Navbar() {
  return (
      <nav>
        <Link to ="/">홈</Link>
        <Link to ="/reviews">리뷰 목록</Link>
        <Link to ="/reviews/new">리뷰 작성</Link>
      </nav>
  )
}

export default Navbar