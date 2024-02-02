import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../notificationReducer"


const AnecdoteForm = () => {
  const NotificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      NotificationDispatch({
        type: 'CHANGE',
        payload: error.response.data.error
      })
      setTimeout(() => {
        NotificationDispatch({ type: 'EMPTY' })
      }, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    NotificationDispatch({
      type: 'CHANGE',
      payload: `anecdote '${content}' created`
    })
    setTimeout(() => {
      NotificationDispatch({ type: 'EMPTY' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
