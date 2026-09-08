import StarRating from "./StarRating.jsx"
import CategoryBadge from "./CategoryBadge.jsx"

function ReviewCard({ title, category, rating }) {
  return (
    <div>
      <h3>{title}</h3>
      <CategoryBadge category={category} />
      <StarRating rating ={rating} />
    </div>
  )
}

export default ReviewCard