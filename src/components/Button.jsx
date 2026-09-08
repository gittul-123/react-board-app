function Button({ children, isLoading, loadingText, ...rest }) {
  return (
    <button disabled={isLoading} {...rest}>
      {isLoading ? loadingText : children}
    </button>
  )
}

export default Button