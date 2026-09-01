import { useReviews } from '../hooks/useReviews.js'
import ReviewCard from '../components/ReviewCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'


function ReviewList() {
  const { reviews, loading, error } = useReviews()

    if (loading) return <LoadingState />
    if (error) return <ErrorState error={error} />
    if (reviews.length === 0) return <EmptyState />

    return (
        <div>
            <h1>리뷰 목록</h1>
            <ul>
                {reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        title={review.title}
                        category={review.category}
                        rating={review.rating}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ReviewList