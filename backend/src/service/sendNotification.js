import Notification from '../models/notfiication.schema.js';
export const sendNotification = async (recipientId, senderId, message) => {
    try {
        const notification = new Notification({
            recipient: recipientId,
            sender: senderId,
            message
        });
        await notification.save();
        console.log('Notification sent:', notification);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};