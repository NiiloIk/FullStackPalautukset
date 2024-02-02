import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { changedAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    // console.log("anecdotes", anecdotes, "filter", filter)
    if ( filter === '' ) return anecdotes 
    
    return anecdotes.filter(anecdote => 
      anecdote.content.includes(filter)
    )
  })

  const vote = (anecdote) => {
    dispatch(changedAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 1))
  }
  return (
    <div>
      {[...anecdotes]
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )
      }
    </div>
  )
}

export default AnecdoteList