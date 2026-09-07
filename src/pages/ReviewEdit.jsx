import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'

function ReviewEdit() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (review) {
      setTitle(review.title)
      setCategory(review.category)
      setContent(review.content)
      setRating(review.rating)
    }
  }, [review])
  

  function validate() {
    const newErrors = {}

    if (!title.trim()) {
        newErrors.title = '제목을 입력해주세요.'
    }
    if (!category.trim()) {
        newErrors.category = '카테고리를 입력해주세요.'
    }
    if (!content.trim()) {
        newErrors.content = '내용을 입력해주세요.'
    }
    if (rating < 1 || rating > 5) {
        newErrors.rating = '평점은 1에서 5 사이의 값이어야 합니다.'
    }

    return newErrors
  }


  async function handleSubmit(e) {
    e.preventDefault()

    const newErrors = validate()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
        return
    }

    setIsSubmitting(true)

    const { error } = await supabase
    .from('reviews')
    .insert([{
      title,
      category,
      content,
      rating
    }])

    if (error) {
        console.error(error.message)
    } else {
        console.log('등록 성공!')
        setTitle('')
        setCategory('')
        setContent('')
        setRating(0)
    }
    setIsSubmitting(false)
  }

  return (
    <div>
      <h1>리뷰 작성</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>제목</label>
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
          <p>지금 입력된 값 : {title}</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
           <label>카테고리</label>
           {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
           <p>지금 입력된 값 : {category}</p>
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
        </div>
        <div>
            <label>내용</label>
            {errors.content && <p style={{ color: 'red' }}>{errors.content}</p>}
            <p>지금 입력된 값 : {content}</p>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
        <div>
            <label>평점</label>
            {errors.rating && <p style={{ color: 'red' }}>{errors.rating}</p>}
            <p>지금 입력된 값 : {rating}</p>
            <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '등록 중...' : '등록'}
        </button>
      </form>
    </div>
  )
}

export default ReviewEdit