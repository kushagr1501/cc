import Product from "../models/product.schema.js";
import asyncHandler from '../service/asyncHandler.js'
import { upload, uploadToCloudinary } from '../service/cloudinary.js';
import { sendNotification } from "../service/sendNotification.js";

export const createProduct = asyncHandler(async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'File upload failed', error: err.message });
        }

        const { title, description, price } = req.body;

        try {
            let imageUrl = null;
            if (req.file) {
                imageUrl = await uploadToCloudinary(req.file);
            }

            const product = new Product({
                title,
                description,
                price,
                createdBy: req.user._id,
                imageUrl
            });

            await product.save();
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                product
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    });
});

//further need to implement delete update Product as well 


export const expressInterest = asyncHandler(async (req, res) => {
    const {  productId } = req.params; 

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        if (product.createdBy.toString() === req.user._id.toString()) {
            return res.status(400).json({ success: false, message: 'You cannot show interest in your own product' });
        }


        if (!product.interested.includes(req.user._id)) {
            product.interested.push(req.user._id);
            await product.save();

            // Send the notification to both the seller and the interested user
            await sendNotification(product.createdBy, req.user._id, `${req.user.name} is interested in your product: ${product.title}`);
            await sendNotification(req.user._id, product.createdBy, `You have expressed interest in: ${product.title}`);
            console.log('noti sent ');
        }

        res.status(200).json({ success: true, message: "Interest expressed successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export const cancelInterest = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const interestIndex = product.interested.indexOf(req.user._id);
        if (interestIndex !== -1) {
            product.interested.splice(interestIndex, 1);
            await product.save();

            await sendNotification(product.createdBy, req.user._id, `${req.user.name} has cancelled interest in your product: ${product.title}`);
            await sendNotification(req.user._id, product.createdBy, `You have cancelled your interest in: ${product.title}`);

            return res.status(200).json({ success: true, message: 'Interest cancelled successfully' });
        } else {
            return res.status(400).json({ success: false, message: 'You have not expressed interest in this product' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
export const getProductDetails = asyncHandler(async (req, res) => { //based on productId
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId).populate('createdBy', 'name email phone');
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate('createdBy', 'name email')
    if (!products)
        return res.status(404).json({ success: false, message: "no products" })

    res.status(200).json({
        success: true,
        message: "products fetched sucessfully",
        products
    })
})
