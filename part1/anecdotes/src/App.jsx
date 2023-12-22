import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ title, onClick }) => {
  return(
    <button onClick={onClick}>
      {title}
    </button>
  )
}

const Anecdote = ({ item }) => {
  console.log(item)
  return(
    <>
      <p>{item.anecdote}</p>
      <p>This anecdote has {item.likes} likes</p>
    </>
  )
}

const AnecdoteWithMostLikes = ({ anecdotes }) => {
  const anecdoteWithMostLikes = anecdotes.reduce((maxlikesAnecdote, currentAnecdote) => {
    return currentAnecdote.likes > maxlikesAnecdote.likes ? currentAnecdote : maxlikesAnecdote;
  }, anecdotes[0]);

  console.log('Anecdote with the most likes', anecdoteWithMostLikes)

  return(
    <>
      <p> {anecdoteWithMostLikes.anecdote} </p>
      <p> with {anecdoteWithMostLikes.likes} likes</p>
    </>
  )
}

const App = () => {
  const anecdotes_default = [
    {
      anecdote: 'If it hurts, do it more often.',
      likes : 0
    },
    {
      anecdote: 'Adding manpower to a late software project makes it later!',
      likes : 0
    },
    {
      anecdote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      likes : 0
    },
    {
      anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      likes : 0
    },
    {
      anecdote: 'Premature optimization is the root of all evil.',
      likes : 0
    },
    {
      anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      likes : 0
    },
    {
      anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      likes : 0
    },
    {
      anecdote: 'The only way to go fast, is to go well.',
      likes : 0
    }
  ]
   
  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState(anecdotes_default)

  const updateSelectedAnecdote = () => {
    // generate random number
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    // log the random number
    console.log("Generated the following number: ", randomIndex)
    // update the selected anecdote
    setSelected(randomIndex)
  }

  const updateAnecdotes = () => {
    const updateAnecdotes = [...anecdotes]

    // Update the specific anecdote
    updateAnecdotes[selected] = {
      ...updateAnecdotes[selected],
      likes: updateAnecdotes[selected].likes +1
    }

    // log to console
    console.log(updateAnecdotes)
    setAnecdotes(updateAnecdotes)
  }

  return (
    <div>
      <Header title="Anecdote of the day" />
      <Anecdote item={anecdotes[selected]}/>
      <Button title="next anecdote" onClick={updateSelectedAnecdote}/>
      <Button title="Like" onClick={updateAnecdotes}/>

      <Header title="Anecdote with most likes" />
      <AnecdoteWithMostLikes anecdotes={anecdotes} />
      
    </div>
  )
}

export default App