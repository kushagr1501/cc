import Issue from "../models/issue.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import config from "../config/index.js";
import { upload, uploadToCloudinary } from '../service/cloudinary.js';
 

// Exclusively for members only
export const createIssue = asyncHandler(async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'File upload failed', error: err.message });
        }

        const { title, description, visibility } = req.body;

        try {
            let fileUrl = null;
            if (req.file) {
                fileUrl = await uploadToCloudinary(req.file);
            }

            const issue = new Issue({
                title,
                description,
                createdBy: req.user._id,
                visibility,
                fileUrl
            });
            await issue.save();
            res.status(201).json({
                success: true,
                message: "Issue created successfully",
                issue,
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    });
});

export const getALLIssues = asyncHandler(async (req, res) => {
    const issues = await Issue.find({
        $or: [
            { visibility: 'public' }, { createdBy: req.user._id }
        ]
    }).populate('createdBy', 'name email');

    if (!issues) {
        res.status(404).json({
            message: "No issues found",
            success: false,
        });
    }
    res.status(200).json({
        success: true,
        message: "All issues retrieved",
        issues,
    });
});

export const updateIssue = asyncHandler(async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'File upload failed', error: err.message });
        }

        const { id } = req.params;
        const { title, description, visibility, status } = req.body;
        const issue = await Issue.findOne({ _id: id, createdBy: req.user._id });
        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "No issue found",
            });
        }

        let fileUrl = issue.fileUrl;
        if (req.file) {
            fileUrl = await uploadToCloudinary(req.file);
        }

        issue.title = title || issue.title;
        issue.description = description || issue.description;
        issue.status = status || issue.status;
        issue.visibility = visibility || issue.visibility;
        issue.fileUrl = fileUrl;

        await issue.save();
        res.status(200).json({
            success: true,
            message: "Issue updated successfully",
            issue,
        });
    });
});

export const delIssue = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const issue = await Issue.findOneAndDelete({ _id: id, createdBy: req.user._id });
    if (!issue) {
        return res.status(404).json({
            success: false,
            message: "No issue found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Issue deleted successfully",
    });
});

// Only for admins
export const getALLPrivateIssues = asyncHandler(async (req, res) => {
    const issues = await Issue.find({
        $or: [
            { visibility: 'private' }, { createdBy: req.user._id }
        ]
    }).populate('createdBy', 'name email');

    if (!issues) {
        res.status(404).json({
            message: "No issues found",
            success: false,
        });
    }
    res.status(200).json({
        success: true,
        message: "All issues retrieved",
        issues,
    });
});

export const updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const issue = await Issue.findById(id);
    if (!issue) {
        return res.status(404).json({
            success: false,
            message: "No issue found",
        });
    }

    issue.status = status || issue.status;
    await issue.save();
    res.status(200).json({
        success: true,
        message: "Updated status successfully",
    });
});

export const deleteIssueAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) {
        return res.status(404).json({
            success: false,
            message: "No issue found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Issue deleted successfully",
    });
});
