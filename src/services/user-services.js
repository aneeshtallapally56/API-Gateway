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
async function signin(data){
    try {
        const user = await userRepository.getUserByEmail(data.email);
        const isPasswordValid = await userRepository.verifyPassword(
            data.password,
            user.password
        );
        if (!isPasswordValid) {
            throw new AppError(
                'Invalid credentials',
                StatusCodes.UNAUTHORIZED
            );
        }
        const jwt = await userRepository.createToken({
            id: user.id,
            email: user.email,
        });
        return jwt;
        
    } catch (error) {
        console.log(error);
         if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(
            'Something went wrong while signing in',
            StatusCodes.INTERNAL_SERVER_ERROR
        );  
    }
}

module.exports = {
    createUser,
    signin
};