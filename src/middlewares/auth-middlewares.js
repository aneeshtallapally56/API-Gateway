const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const {userService} = require('../services');
function validateAuthRequest(req,res,next){
    if(!req.body.email) {
        ErrorResponse.message = 'Something went wrong authenticating user';
       
        ErrorResponse.error = new AppError(['Email is required'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
            ErrorResponse
        );
    }
    if(!req.body.password) {
        ErrorResponse.message = 'Something went wrong authenticating user';
        ErrorResponse.error = new AppError(['Password is required'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
            ErrorResponse
        );
    }
    next();
}
async function checkAuth(req, res, next) {
   try {
    const response = await userService.isAuthenticated(
        req.headers['x-access-token']
    );
    if(response){
        req.user = response;
        next();
    }
   } catch (error) {
     return res.status(error.statusCode).json(
            error
        );
   }
}
module.exports = {
    validateAuthRequest,
    checkAuth
};