import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'

export function useReviewDetail() {
  const { id } = useParams()
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchReview() {
      setLoading(true)
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', id)

      if (error) {
        setError(error.message)
      } else {
        setReview(data[0])
      }
      setLoading(false)
    }

    fetchReview()
  }, [id])

  return { review, loading, error }
}