import { useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

function ReviewForm() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  async function handleSubmit(e) {
    e.preventDefault()
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <p>지금 입력된 값 : {title}</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
           <label>카테고리</label>
           <p>지금 입력된 값 : {category}</p>
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
        </div>
        <div>
            <label>내용</label>
            <p>지금 입력된 값 : {content}</p>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
        <div>
            <label>평점</label>
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

export default ReviewForm