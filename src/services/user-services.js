const {UserRepository} = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const userRepository = new UserRepository();
async function createUser(data) {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        if(error.name=="SequelizeValidationError") {
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            });
            throw new AppError(explaination,StatusCodes.BAD_REQUEST)
        }
        throw new AppError(
            'Something went wrong while creating user',
            StatusCodes.INTERNAL_SERVER_ERROR
        );  
    }
}   
module.exports = {
    createUser,
};