import asyncHandler from '../service/asyncHandler.js';
import Notification from '../models/notfiication.schema.js';

export const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ recipient: req.user._id }).populate('sender', 'name');

    res.status(200).json({
        success: true,
        notifications
    });
});

export const markNotificationAsRead = asyncHandler(async (req, res) => {
    const notificationId = req.params.id;
    
    // Find and update the notification by its ID, setting `read` to true
    const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { read: true },
        { new: true }
    );

    if (!notification) {
        return res.status(404).json({
            success: false,
            message: 'Notification not found',
        });
    }
 
    // Return updated notification as response
    res.status(200).json({
        success: true,
        notification,
    });
});


