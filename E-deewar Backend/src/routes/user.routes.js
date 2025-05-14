import { Router } from "express";

import { registerUser, loginUser } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifiedJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// router.route("/register").post(
//     upload.single("avatar"),
//     registerUser
//   );

// router.route("/register").post(
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//     {
//       name: "coverImage",
//       maxCount: 1,
//     },
//   ]),
//   registerUser
// );


router.route("/register").post(registerUser)

//   // Temporarily modify the route to test without file upload
// router.route("/register").post(registerUser);

// router.route("/register").post(
//     registerUser
//   );

  router.route("/login").post(loginUser);   

  export default router