function StarRating({ rating }) {
    return(
        <span>
            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </span>
    )
}

export default StarRating