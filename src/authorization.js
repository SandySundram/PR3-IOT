const jwt = require("jsonwebtoken");

function getAuthorizedUserId(context) {
  const Authorization = context.token;
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const {userId} = jwt.verify(token, "secret");
    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  getAuthorizedUserId
};