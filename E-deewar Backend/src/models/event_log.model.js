const eventLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventType: { type: String, required: true, enum: ["Item Listed", "Item Sold", "Transaction Completed", "Message Sent"] },
    details: { type: String },
    timestamp: { type: Date, default: Date.now }
  }, { timestamps: true });
  
  export const Event_log = mongoose.model("EventLog", eventLogSchema);
  