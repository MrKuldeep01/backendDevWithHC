import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

/* just for understanding : 
 subscriber: the user who wanna subscribe 
 channel: that one whom to subscribe
*/

export default mongoose.model("Subscription", subscriptionSchema);
