import asyncHandler from '../service/asyncHandler.js'
import Bill from "../models/bills.schema.js";

export const createBill = asyncHandler(async (req, res) => {
    const { bills } = req.body;

    try {
        for (const bill of bills) {
            await Bill.findOneAndUpdate(
                {userId: bill.userId},
                bill,
                { new: true, upsert: true }
            )
    
        }
        res.status(200).json({ message: 'Bills processed successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to process bills' });
    }
    
})


export const getALLBills=asyncHandler(async (req,res)=>{
    const {userId}=req.params
    const bills=await Bill.find({userId})
    if(!bills)
    {
        res.status(404).json({
            success:false,
            message:"no bills found or retrieved"
        })
    }
    res.status(200).json(bills);
})

export const update= asyncHandler(async (req, res) => {
    const { userId, paymentId, status } = req.body;

    if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid userId' });
    }
    try {
        const bill = await Bill.findOneAndUpdate(
            { userId, paymentId }, 
            { status },
            { new: true }
        );

        if (!bill) {
            return res.status(404).json({ success: false, message: 'Bill not found' });
        }

        res.json({ success: true, message: 'Bill status updated successfully' });
    } catch (error) {
        console.error('Error updating bill status:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});