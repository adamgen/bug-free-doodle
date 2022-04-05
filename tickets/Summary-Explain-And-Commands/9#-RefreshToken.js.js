// router.get("/valid", async (req, res) => {
//     const { ACCESS_TOKEN, REFRESH_TOKEN } = req.cookies;

//     console.log(
//       refreshTokens,
//       "\nREFRESH_TOKEN",
//       REFRESH_TOKEN,
//       "\nACCESS_TOKEN",
//       ACCESS_TOKEN
//     );

//     try {
//       const decoded = jwt.verify(ACCESS_TOKEN, process.env.ACCESS_TOKEN_SECRET);
//       // return res.status(200).status(200).json({ valid: true,msg: "valid  token", })
//     } catch (ex) {
//       console.log("accessToken", ex.message);
//       try {
//         if (!REFRESH_TOKEN) {
//           //status 401
//           return res.status(200).json({
//             valid: false,
//             msg: "Token not found",
//           });
//         }
//         const user = await jwt.verify(
//           REFRESH_TOKEN,
//           process.env.REFRESH_TOKEN_SECRET
//         );

//         // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
//         const payload = {
//           user: {
//             _id: user._id,
//           },
//         };
//         const accessToken = await jwt.sign(
//           payload,
//           process.env.ACCESS_TOKEN_SECRET,
//           { expiresIn: "1m" }
//         );

//         const refreshToken = await jwt.sign(
//           payload,
//           process.env.REFRESH_TOKEN_SECRET,
//           {
//             expiresIn: "2m",
//           }
//         );
//         // refreshTokens.push(refreshToken);
//         res
//           .cookie("ACCESS_TOKEN", accessToken, { httpOnly: true })
//           .cookie("REFRESH_TOKEN", refreshToken, { httpOnly: true })
//           .status(200)
//           .json({ valid: true, msg: "valid  token" });
//       } catch (error) {
//         console.log("eee", error);
//         res.status(200).json({
//           //403
//           valid: false,
//           msg: "Invalid token",
//         });
//       }
//     }
//   });
