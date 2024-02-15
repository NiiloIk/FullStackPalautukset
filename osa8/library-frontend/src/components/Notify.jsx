import { useEffect } from "react"

const Notify = ({ errorMessage, setErrorMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }, [errorMessage])

  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default Notify