import { useState, useEffect } from "react";
import { supabase } from '../lib/supabaseClient.js'

export function useReviews() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchReviews() {
            setLoading(true)
            const {data, error} = await supabase
                .from('reviews')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                setError(error.message)
            } else {
                setReviews(data)
            }
            setLoading(false)
        }

        fetchReviews()
    }, [])

    return { reviews, loading, error }
}