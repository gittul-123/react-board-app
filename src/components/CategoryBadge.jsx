function CategoryBadge({ category }) {
  const color = category === '영화' ? 'blue' : 'green'

  return (
    <span style={{ 
      backgroundColor: color, 
      color: 'white', 
      padding: '2px 8px', 
      borderRadius: '4px' 
    }}>
      {category}
    </span>
  )
}

export default CategoryBadge