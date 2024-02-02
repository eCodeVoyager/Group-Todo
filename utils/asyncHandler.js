//  A utility function to wrap async/await route handlers in express.
//Prevents the need for try/catch blocks in each route handler.
//also prevents server from crashing if an error is thrown in an async function. ^-^ 
function asyncHandler(requestHandler) {
  return function (req, res, next) {
    Promise.resolve(requestHandler(req, res, next)).catch(function (err) {
      next(err);
    });
  };
}


module.exports = asyncHandler;
