const { default: mongoose } = require("mongoose");

const paymentSchema = mongoose.Schema({
    user: {
        type: Object
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }
}, { timestamps: true })    // 자동으로 Created App의 value가 들어감

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;