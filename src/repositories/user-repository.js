const CrudRepository = require("./crud-repositories");
const {User} = require("../../models");
class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  
}
module.exports = UserRepository;