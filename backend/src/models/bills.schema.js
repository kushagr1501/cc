import mongoose from 'mongoose';

const BillSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    maintenance: {
        type: Number,
        default: 0
    },
    electricity: {
        type: Number,
        default: 0
    },
    roomRent: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: function() {
            return this.maintenance + this.electricity + this.roomRent;
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    },
    issuedDate: {
        type: Date,
        default: Date.now
    }
});

const Bill = mongoose.model('Bill', BillSchema);

export default Bill;
