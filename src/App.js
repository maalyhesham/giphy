import TextList from './components/TextList'
import Error from './components/Error'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useState } from 'react'
import './App.css';

const giphy = new GiphyFetch(
  'YlWdAgN3tKrVAsopyDaGUQulnwEVwjxz'
)

function App() {
  const [text, setText] = useState('')
  const [results, setResults] = useState([])
  const [err, setErr] = useState(false)

  const handleInput = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    if (text.length === 0) {

      setErr(true)
      return
    }

    console.log(text)

    const apiCall = async () => {
      const res = await giphy.animate(text, { limit: 20 })

      setResults(res.data)
    }

    apiCall()
    setText('')
    setErr(false)

  }

  return (
    <div className="App">
      <h1>this is list of Animated </h1>
      <h3>Type text and submit</h3>
      <input className='input-field' value={text} onChange={handleInput} />
      <button className='submit-btn' onClick={handleSubmit}>Submit</button>
      <Error isError={err} text='need length longer than 0 for input' />
      {results && <TextList gifs={results} />}
    </div>
  );
}
export default App;