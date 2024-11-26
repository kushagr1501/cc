import dotenv from "dotenv"
dotenv.config()

const config={
    PORT: process.env.PORT || 8080,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,   
    RAZORPAY_KEY_ID:process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET:process.env.RAZORPAY_SECRET,
    cloud_name:process.env.cloud_name,
    API_KEY:process.env.API_KEY,
    API_SECRET:process.env.API_SECRET
}
export default config; 