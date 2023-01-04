const mongoose = require("mongoose")

const { Schema } = mongoose;

const NewsSchema = new Schema({
    News: {
        type: String
    },
    startDate:
    {
        type: Date
    }
});
module.exports = mongoose.model("Events", NewsSchema);
