import React, {useState , useEffect} from 'react';
// import logo from './logo.svg';
import Book from '../src/objects/Book'
import AvailableBook from '../src/objects/AvailableBook'
import logic from './logic'
import utils from './utils'
import './App.css';

function App() {
  const [books , setBooks] = useState(undefined)

  useEffect(()=>{
    async function retrieveBooks(){
      try {
        let {items} = await logic.retrieveBooksFromAPI()

        console.log('items' , items)
  
        setBooks(items.map(item => {
                            item.volumeInfo.publishedDate = utils.formatDate(item.volumeInfo.publishedDate)
                            return item
                          })
                      .sort((a,b)=>new Date(b.volumeInfo.publishedDate)-new Date(a.volumeInfo.publishedDate)))
      } catch (error) {
        console.log('Missing query')
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
       {books !== undefined && <div className="rating-box"><p>{`Average rating on ${books[0].volumeInfo.categories} category:`}</p><p> {`${utils.calculateAverage(books)}/5`}</p></div>}
        <ol className = "list">
          {books && books.map( ({saleInfo , volumeInfo} , index) => {
            let currentBook = saleInfo.saleability === "NOT_FOR_SALE" ? new Book(volumeInfo.title, volumeInfo.subtitle, volumeInfo.authors, volumeInfo.publishedDate, volumeInfo.publisher, volumeInfo.categories='Computers')
                                                                      : new AvailableBook(volumeInfo.title, volumeInfo.subtitle, volumeInfo.authors, volumeInfo.publishedDate, volumeInfo.publisher, volumeInfo.categories , saleInfo.listPrice.amount=0, saleInfo.buyLink)
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
                {currentBook instanceof AvailableBook && <p>{`Price: ${currentBook.getPrice()}`}</p>}
                {currentBook instanceof AvailableBook && <a href={currentBook.getBuyLink()}>AVAILABLE</a>}
              </li>)
        })}
      </ol>
      </section>
    </div>
  );
}

export default App;
