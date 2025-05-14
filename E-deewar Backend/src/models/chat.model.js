const transactionSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true, enum: ["Sale", "Rent"] },
    price: { type: Number, required: true },
    status: { type: String, default: "Pending", enum: ["Pending", "Completed", "Cancelled"] },
    transactionDate: { type: Date, default: Date.now },
  }, { timestamps: true });
  
  export const Chat = mongoose.model("Transaction", transactionSchema);
  