import { useReviewDetail } from '../hooks/useReviewDetail.js'
import ReviewCard from '../components/ReviewCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'


function ReviewDetail() {
  const { review, loading, error } = useReviewDetail()

    if (loading) return <LoadingState />
    if (error) return <ErrorState error={error} />
    if (!review) return <EmptyState />
    return (
        <div>
            <h1>리뷰 상세</h1>
            <ReviewCard
                title={review.title}
                category={review.category}
                rating={review.rating}
            />
            <p>{review.content}</p>
        </div>
    )
}

export default ReviewDetail