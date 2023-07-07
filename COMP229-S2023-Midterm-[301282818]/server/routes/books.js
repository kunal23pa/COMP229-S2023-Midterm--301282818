/*
NAME: KUNAL PRAFULBHAI PATEL
ID: 301282818
COURSE CODE: COMP 229
COURSE NAME: WEB APPLICATION DEVELOPMENT
*/



// modules required for routing

var importDefault = (this && this.importDefault) || function(mod){
    return (mod && mod._esModule ? mod : {"default" : mod});
}

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let BookModel = importDefault(require('../models/books'));

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  BookModel.default.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    res.render('books/details',{title: 'Add Book', page: 'books', books:''});

});

// // POST process the Book Details page and create a new Book - CREATE
// router.post('/add', (req, res, next) => {

//     /*****************
//      * ADD CODE HERE *
//      *****************/

router.post('/add', (req, res, next) => {
  let new_Book = new BookModel.default({
      "Title": req.body.title,
      "Description": "",
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });
  
  BookModel.default.create(new_Book, (err) => {
      if (err) {
          console.error(err);
          res.end(err);
      }
      res.redirect('/books');
  });
});
// });


// // GET the Book Details page in order to edit an existing Book
// router.get('/:id', (req, res, next) => {

//     /*****************
//      * ADD CODE HERE *
//      *****************/

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  BookModel.default.findById(id, {}, {}, (err, bookItemToEdit) => {
      if (err) {
          console.error(err);
          res.end(err);
      }
      res.render('books/details', { title: 'Edit', page: 'books', books: bookItemToEdit });
  });
});
// });


// // POST - process the information passed from the details form and update the document
// router.post('/:id', (req, res, next) => {

//     /*****************
//      * ADD CODE HERE *
//      *****************/

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  let update_Book = new BookModel.default({
      "_id": id,
      "Title": req.body.title,
      "Description": "",
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });

  BookModel.default.updateOne({ _id: id }, update_Book, {}, (err) => {
      if (err) {
          console.error(err);
          res.end(err);
      }
      res.redirect('/books');
  });
});
// });


// // GET - process the delete by user id
// router.get('/delete/:id', (req, res, next) => {

//     /*****************
//      * ADD CODE HERE *
//      *****************/

router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  BookModel.default.remove({ _id: id }, (err) => {
      if (err) {
          console.error(err);
          res.end(err);
      }
      res.redirect('/books');
  });
});
// });


module.exports = router;
