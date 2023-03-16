import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  const errorObj = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || `Υπήρξε κάποιο πρόβλημα. Δοκιμάστε ξανά σε λίγο.`
  };
  if (error.name === 'ValidationError') {
    errorObj.statusCode = StatusCodes.BAD_REQUEST
    errorObj.message = Object.values(error.errors).map(err => err.message).join('. ')
  }
  if (error.code === 11000) {
    errorObj.statusCode = StatusCodes.BAD_REQUEST
    errorObj.message = `This ${Object.keys(error.keyValue)} is already in use. Please try again with a new one.`
  }
  res.status(errorObj.statusCode).json(errorObj.message);
  // res.status(errorObj.statusCode).json({ msg: error }); // Βλέπεις όλο το μήνυμα 
};

export default errorHandlerMiddleware;
