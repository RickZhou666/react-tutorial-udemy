import React, { useEffect, useState, useCallback } from 'react'

import MoviesList from './components/MoviesList'
import './App.css'
import AddMovie from './components/AddMovie'

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false) // based on this to display spinning status
  const [error, setError] = useState(null) // null, initially we have no error

  const handleFetchMovies = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    // fetch('url', object)
    //    - default method is GET
    //    - return Promise
    //    - async task
    // .then() - get return value whenever we get response
    // .json() - transform to json object
    // .then(data) - get the data from Promise after the data transimission
    // fetch('http://10.176.22.192:9200/li/_count')

    // Form 2
    // when we working with aync, we use try{} catch{}. Otherwise .cath()
    try {
      const response = await fetch(
        'https://react-http-e68be-default-rtdb.firebaseio.com/movies.json'
      )
      // const response = await fetch('https://swapi.dev/api/films')
      // const response = await fetch('http://localhost:9200/li/_count')

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data = await response.json()

      console.log(data)

      const loadedMovies = []

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   }
      // })
      setMovies(loadedMovies)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    handleFetchMovies()
  }, [handleFetchMovies])

  async function handleAddMoive(movie) {
    const response = await fetch(
      'https://react-http-e68be-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    console.log(data)
  }

  // Form 1
  // function handleFetchMovies() {
  //   fetch('https://swapi.dev/api/films')
  //     // fetch('http://10.176.22.192:9200/li/_count')
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((data) => {
  //       // convert all result array to new object array
  //       const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         }
  //       })

  //       setMovies(transformedMovies)
  //     })
  // }

  // in more elegant way
  let content = <p>Found no movies.</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>error</p>
  }

  if (isLoading) {
    content = <p>Loading</p>
  }

  // connect handler to the button
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={handleAddMoive} />
      </section>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
