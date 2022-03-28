//  https://www.becomebetterprogrammer.com/jwt-authentication-middleware-nodejs-typescript/

// yarn add jsonwebtoken          //jwt.sign , jwt.verify,
// yarn add -D @types/jsonwebtoken

// yarn add cookie-session cookie-parser
// yarn add -D @types/cookie-parser @types/cookie-session

// const session = require('cookie-session')       // good for config the cookie // use req.session
// const cookieParser = require("cookie-parser"); // use req.cookies
// db()

// const app = express();

// app.use(cors());
// app.use(cookieParser())
// app.use(
//   session({
//       keys:[process.env.ACCESS_TOKEN_SECRET,process.env.REFRESH_TOKEN_SECRET],
//       httpOnly: false,
//       secure: false,
//       maxAge:30000,

//   })
// );
