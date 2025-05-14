import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessTokenAndRefreshToken = async (userID) => {
  try {
    const storedUser = await User.findById(userID);
    const userEmail = storedUser.email;

    const accessToken = storedUser.generateAccessToken();
    const refreshToken = storedUser.generateRefreshToken();

    await User.findOneAndUpdate({ email: userEmail }, { refreshToken });
    // the above code will work even for the first time login because even if there is no field present initially, findOneAndUpdate will create the field.

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new apiError(
      500,
      "Something went wrong while generating access token and refresh token"
    );
  }
};

// const registerUser = asyncHandler(async (req, res) => {

//     console.log("Headers:", req.headers);
//     console.log("Files:", req.file);
//     console.log("Body:", req.body);
    
//     // ... rest of your code
//   const { name, rollNumber, contact, email, password } = req.body;
//   //console.log("email: ", email);

//   if (
//     [name, rollNumber, contact, email, password].some(
//       (field) => field.trim() === ""
//     )
//   ) {
//     throw new apiError(400, "All fields are required");
//   }

//   const existingUser = await User.findOne({
//     $or: [{ rollNumber }, { email }],
//   });

//   if (existingUser) {
//     throw new apiError(409, "User with email or roll number already exists");
//   }

//   // const avatarLocalPath = req.file?.path;
//   const avatarLocalPath = req.files?.avatar?.[0]?.path;
//   //   const coverImageLocalPath = req.files?.avatar[0]?.path;   // Whenever we are trying to optionally select files dependent on the availability, we may encounter some errors (such as undefined). To prevent these errors, we can use traditional conditional check statements.

//   // we will check for if we have the access to the files or not and store their local path in our system.

//   let coverImageLocalPath;
//   if (
//     req.files &&
//     Array.isArray(req.files.coverImage) &&
//     req.files.coverImage.length > 0
//   ) {
//     coverImageLocalPath = req.files.coverImage[0].path;
//   }

//   if (!avatarLocalPath) {
//     throw new apiError(400, "Avatar file is required");
//   }

//   // the above code is used to check if the avatar file is successfully uploaded by the user or not.

//   const avatar = await uploadOnCloudinary(avatarLocalPath);
//   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

//   if (!avatar) {
//     throw new apiError(400, "Avatar file was not uploaded on Cloudinary");
//   }

//   // we are again checking if avatar file is successfully uploaded on the cloudinary or not because avatar is a require field, and if it is not uploaded, then it can crash our application.

//   const user = await User.create({
//     name,
//     avatar: avatar.url,
//     coverImage: coverImage?.url || "", // coverImage validation.
//     rollNumber,
//     email,
//     password,
//     contact
//   });

//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   if (!createdUser) {
//     throw new apiError(500, "User registration failed unexpectedly");
//   }

// //   console.log("Request Body:", req.body);
// //   console.log("Request Files:", req.files);

//   return res
//     .status(201)
//     .json(
//       new apiResponse(201, null, "User registered successfully. Please log in.")
//     );
// });


const registerUser = asyncHandler(async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  const { name, rollNumber, contact, email, password } = req.body;

  if (
    [name, rollNumber, contact, email, password].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new apiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ rollNumber }, { email }],
  });

  if (existingUser) {
    throw new apiError(409, "User with email or roll number already exists");
  }

  const user = await User.create({
    name,
    rollNumber,
    email,
    password,
    contact
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "User registration failed unexpectedly");
  }

  return res
    .status(201)
    .json(
      new apiResponse(201, null, "User registered successfully. Please log in.")
    );
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const storedUser = await User.findOne({ email: email });
  
    if (!storedUser) {
      throw new apiError(400, "User not found");
    }
  
    const loginVerification = await storedUser.passwordVerification(password);
  
    if (!loginVerification) {
      throw new apiError(400, "password not matched");
    }
  
    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(storedUser._id);
  
    const loggedInUser = await User.findById(storedUser._id).select(
      "-password -refreshToken"
    );
  
    const options = {
      httpOnly: true,
      secure: true,
    };
    // this object "options" is created to configure the cookies that we will send to the user, so that they cannot be altered or rewrited, they can only be veiwed.
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new apiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged in Successfully"
        )
      );
    // We will be sending two cookies to the front end that included accessToken and refreshToken.
  });

// POST /api/items/
const createItemController = async (req, res) => {
  try {
    const { title, description, category, type, price, condition } = req.body;
    const image = req.file?.path || ""; // If using multer with Cloudinary/local
    const postedBy = req.user._id; // Assumes user ID from JWT

    if (!title || !category || !type) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newItem = new Item({
      title,
      description,
      category,
      type, // 'sell', 'donate', or 'rent'
      price: type === 'donate' ? 0 : price,
      condition,
      image,
      postedBy
    });

    await newItem.save();
    res.status(201).json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
};

// GET /api/items/
const getAllItemsController = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// GET /api/items/search?category=&type=&keyword=
const searchItemsController = async (req, res) => {
  try {
    const { category, type, keyword } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (keyword) {
      filter.title = { $regex: keyword, $options: "i" };
    }

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error during search", error });
  }
};

// GET /api/items/:id
const getSingleItemController = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).populate("postedBy", "name email");

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
};

// GET /api/items/categories
const getItemCategoriesController = async (req, res) => {
  try {
    // You can also hardcode this if categories are fixed
    const categories = await Item.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};


export { registerUser, loginUser, createItemController, getAllItemsController, searchItemsController, getSingleItemController, getItemCategoriesController };
