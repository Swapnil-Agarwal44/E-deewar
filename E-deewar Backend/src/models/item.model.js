const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true, enum: ["Books", "Instruments", "Stationery", "Other"] },
    condition: { type: String, required: true, enum: ["New", "Good", "Used"] },
    price: { type: Number, required: true },
    type: { type: String, required: true, enum: ["Sell", "Donate", "Rent"] }, // ✅ Enum for item type
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User reference
    status: { type: String, default: "Available", enum: ["Available", "Sold", "Rented"] },
    imageURL: { type: String }, // Cloudinary storage
  }, { timestamps: true });
  
  export const Item = mongoose.model("Item", itemSchema);
  