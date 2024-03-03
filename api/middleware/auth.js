const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    if (!token)
      return res
        .status(401)
        .json({ msg: "No auth token, access denied" });
    const verified = jwt.verify(token, "jwttoken");
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    // since the token was made out of the document id
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;