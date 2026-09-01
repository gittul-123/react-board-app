import { useReviews} from '../hooks/useReviews.js'

function ReviewList() {
  const { reviews, loading, error } = useReviews()

    if (loading) return <p>로딩 중...</p>
    if (error) return <p>에러 발생: {error}</p>

    return (
        <div>
            <h1>리뷰 목록</h1>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        {review.title} - 별점 {review.rating}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ReviewList