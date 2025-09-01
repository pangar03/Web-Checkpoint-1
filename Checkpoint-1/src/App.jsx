import { useEffect, useState } from 'react'
import './App.css'
import BookCard from './components/bookCard/bookCard';
import LikedCard from './components/likedCard/likedCard';

function App() {
  const [displayBooks, setDisplayBooks] = useState([]);

  const [likedBooks, setLikedBooks] = useState([]);

  const [id, setId] = useState(0);

  const [bookQuery, setBookQuery] = useState('');
  const [buildQuery, setBuildQuery] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true);
        const data = await fetch(`https://openlibrary.org/search.json?q=${bookQuery}&limit=10`).then(res => res.json());
        console.log("DATA", data.docs)
        setDisplayBooks(data.docs);
      } catch(error) {
        setError(error);
      } finally {
        setLoading(false);
      }
      
    }

    getBooks();
  }, [bookQuery]);

  return(
    <>
      <section className='form-section'>
        <form onSubmit={(e) => {
            e.preventDefault();
            setBookQuery(buildQuery)
          }}>
          <input type='text' required onChange={(e) => setBuildQuery(e.target.value)} />
          <button type='submit'>Search</button>
        </form>
      </section>
      <section className='display-list'>
        {loading && <p>Loading...</p>}
        {error !== '' && !loading &&<p>There was an error: {error}</p>}
        {displayBooks < 1 && !loading &&<p>No books were found</p>}
        {displayBooks.length > 0 && !loading && displayBooks.map((book) => <BookCard key={book.cover_i} bookData={book} setLikedBooks={setLikedBooks} likedBooks={likedBooks} id={id} setId={setId}/>)}
      </section>
      <section className='liked-list'>
        <h3>Liked Books</h3>
        {likedBooks.length < 1 && <p>No books saved on liked</p>}
        {likedBooks.length > 0 && likedBooks.map((book) => <LikedCard key={book.id} data={book} likedBooks={likedBooks} setLikedBooks={setLikedBooks}/>)}
      </section>
    </>
  )
};

export default App
