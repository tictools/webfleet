import Book from './Book';

function AvailableBook(title, subtitle, authors, publish_date, publisher, categories, listPrice , buyLink){
  Book.call(this, title, subtitle, authors, publish_date, publisher, categories)
  this.listPrice = listPrice;
  this.buyLink = buyLink;
}

AvailableBook.prototype = Object.create(Book.prototype)
AvailableBook.prototype.constructor = AvailableBook

AvailableBook.prototype.getPrice = function(){
  return this.listPrice
}

AvailableBook.prototype.getBuyLink = function(){
  return this.buyLink
}

export default AvailableBook