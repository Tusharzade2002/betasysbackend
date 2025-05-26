import jwt from "jsonwebtoken";


export const verifysuperadmintoken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.json({
        success: false,
        message: "Token Not Provided",
      });
    }
    const token = authHeader.split(" ")[1];

    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SIGNATURE);
    console.log(decoded);
    req.user =decoded
    next();
  } catch (err) {
    console.log(err);
    return res.json({
        success:false,
        message:err
    })
  }
};
