const {StatusCodes} = require('http-status-codes');
const {ErrorResponse,SuccessResponse} = require('../utils/common');
const {userService} = require('../services');

async function signUp (req, res) { 
    try {
        const user  = await userService.createUser({
          email: req.body.email,
          password: req.body.password,
        })
        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}
async function signIn (req, res) {
    try {
        const user = await userService.signin({
            email: req.body.email,
            password: req.body.password,
        });
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}
module.exports = {
    signUp,
    signIn
};