function ReviewCard({ title, category, rating }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>카테고리: {category}</p>
      <p>별점: {rating}</p>
    </div>
  )
}

export default ReviewCard