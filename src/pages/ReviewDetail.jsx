import { useReviewDetail } from '../hooks/useReviewDetail.js'
import ReviewCard from '../components/ReviewCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'
import Button from '../components/Button.jsx'


function ReviewDetail() {
  const { review, loading, error } = useReviewDetail()
  const navigate = useNavigate()

  async function handleDelete() {
        const confirmed = window.confirm('정말 삭제하시겠습니까?')
        if (!confirmed) return

        const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', review.id)


        if (error) {
            console.error(error.message)
        } else {
            navigate('/reviews')
        }
    }

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
            <Button onClick={handleDelete}>삭제</Button>
        </div>
    )
}

export default ReviewDetail