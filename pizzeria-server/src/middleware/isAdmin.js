const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ msg: "No auth token" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(401).json({ msg: "Verification failed" });

    if (!verified.isAdmin) return res.status(401).json({ msg: "Not an admin" });
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = isAdmin;
