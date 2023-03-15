const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  res.status(500).json({msg: 'Υπήρξε κάποιο πρόβλημα'});
};

export default errorHandlerMiddleware;
