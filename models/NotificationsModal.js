const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    user: {
      type: Object, // or Object
      required: [true, "user is required"],
    },
    reactedUser: {
      type: Object, // or Object
      ref: "User",
      required: [true, "reactedUser is required"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    content: {
      type: String,
      // required: [true, "contnt is required"],
    },
    type: {
      type: String,
    },
    postId: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;
// review -- product or us 
//