import React, {useState , useEffect} from 'react';
// import logo from './logo.svg';
import Book from '../src/objects/Book'
import logic from './logic'
import utils from './utils'
import './App.css';

function App() {
  const [books , setBooks] = useState(undefined)

  useEffect(()=>{
    async function retrieveBooks(){
      try {
        let {items} = await logic.retrieveBooksFromAPI()

        setBooks(items.map(item => {
                            item.volumeInfo.publishedDate = utils.formatDate(item.volumeInfo.publishedDate)
                            return item
                          })
                      .sort((a,b)=>new Date(b.volumeInfo.publishedDate)-new Date(a.volumeInfo.publishedDate)))
      } catch (error) {
        console.log(error)
      }
    }
    retrieveBooks()
  } , [setBooks])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Books API</h1>
      </header>
      <section>
       {books && <div>{`Average rating on ${books[0].volumeInfo.categories} category:`} {utils.calculateAverage(books)}</div>}
        <ol className = "list">
          {books && books.map( ({volumeInfo} , index) => {
            let currentBook = new Book(volumeInfo.title, volumeInfo.subtitle, volumeInfo.authors, volumeInfo.publishedDate, volumeInfo.publisher, volumeInfo.categories)
            return (
              <li key={index} className="list__item">
                <div>
                  {<p>Title: {currentBook.title }</p>}
                  {currentBook.subtitle && <p>{currentBook.subtitle}</p>}
                </div>
                {<p>Authors: {currentBook.authors}</p>}
                {<p>Publisher: {currentBook.publisher}</p>}
                {<p>Publication date: {currentBook.publish_date}</p>}
                {<p>Category: {currentBook.categories}</p>}
              </li>)
        })}
      </ol>
      </section>
    </div>
  );
}

export default App;
