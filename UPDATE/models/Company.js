const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
    office: {
        type: Array,
        value: String,
        label: "label"
    },
    department: {
        type: Array,
        value: "String",
        label: "label"

    }
});
module.exports = mongoose.model("Sector", InfoSchema)