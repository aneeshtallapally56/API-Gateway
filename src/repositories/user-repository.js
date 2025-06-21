const CrudRepository = require("./crud-repositories");
const {User} = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {ServerConfig} = require("../config")
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  } 
async getUserByEmail(email) {
    const response = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!response) {
      throw new AppError(
        `No user found with email ${email}`,
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
  async verifyPassword(plainPassword, encryptedPassword) {
try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
} catch (error) {
    throw new AppError(
      'Something went wrong while verifying password',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
}
}
async createToken(input) {
  try {
    console.log(ServerConfig.JWT_SECRET, ServerConfig.JWT_EXPIRY);
    return jwt.sign(input,ServerConfig.JWT_SECRET,{
        expiresIn: ServerConfig.JWT_EXPIRY,
    })
  } catch (error) {
    throw new AppError(
      'Something went wrong while generating token',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
}
module.exports = UserRepository;