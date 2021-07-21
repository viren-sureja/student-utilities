const Book = require("../models/Book.js");
const User = require("../models/User.js");

const { addBookValidator } = require("../validators/Book.js");

module.exports.addBook = async (req, res) => {
  //res.send("add route accessed")
  console.log(req.body);
  const { error } = addBookValidator.validate(req.body);
  //console.log(error)

  if (error) return res.status(400).send(error);

  //console.log(req.user._id)

  //finnding the name of the owner
  const tuple = await User.findById(req.user._id);
  //console.log(tuple.name)

  const book = new Book({
    owner: req.user._id,
    ownerName: tuple.name,
    title: req.body.title,
    category: req.body.category,
    sellingPrice: req.body.sellingPrice,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });

  try {
    const savedBook = await book.save();
    res.send(savedBook);
  } catch (error) {
    res.send(error);
  }
};

module.exports.userCollection = async (req, res) => {
  // console.log("mucollection route accessed")
  // console.log(req.user._id)
  // const allbooks = await Book.find()
  // console.log(allbooks)
  // books of each users

  const mybooks = await Book.find({ owner: req.query._id,isSold : false });

  res.send(mybooks);
};

module.exports.collection = async (req, res) => {
  //res.send("mucollection route accessed")
  // console.log(req.user._id)

<<<<<<< HEAD
  mybooks = await Book.find({isSold : false});
=======
  mybooks = await Book.find();
>>>>>>> 84b16c26926f5df0dcab988e75ecbcbd59e10e6f

  res.send(mybooks);
};

module.exports.addToWishList = async (req, res) => {
  console.log(req.body);

  const book = await Book.findOne({ _id: req.body.book });
  console.log(book);
  const updatedWishList = book.wishListedBy.concat([req.user._id]);
  console.log(updatedWishList);
  const result = await Book.findOneAndUpdate(
    { _id: req.body.book },
    { wishListedBy: updatedWishList }
  );
  // console.log(result)
  res.send(result);
};

module.exports.removeFromWishList = async (req, res) => {
  console.log(req.body);

  const book = await Book.findOne({ _id: req.body.book });
  console.log(book);
  const updatedWishList = book.wishListedBy.filter((id) => id != req.user._id);
  console.log(updatedWishList);
  const result = await Book.findOneAndUpdate(
    { _id: req.body.book },
    { wishListedBy: updatedWishList }
  );
  // console.log(result)
  res.send(result);
};

module.exports.getWishList = async (req, res) => {
  console.log("getWishList is asccesible");

  const books = await Book.find();

  const wishBooks = books.filter((book) =>
    book.wishListedBy ? book.wishListedBy.includes(req.user._id) : false
  );

  res.send(wishBooks);
};
