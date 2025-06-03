import  Mediasdata from '../Models/Media.js';
import { s3Upload, s3Uploadsingle, deletefile, s3getURL} from "../Controller/S3.controller.js"
import  Admin  from "../Models/AdminRegistration.js"

async function insertMediaMiddleware(files, account) {
    try {
        if (!files) {
            return {
                type: "VALIDATION_ERROR",
                message: "File is required"
            };
        }
        let useraccount = await Admin.findById(account);
        const params = await Promise.all(files.map(async ele => {
            const mediaData = await s3Uploadsingle(ele);
            // console.log('uploaded url ',mediaData);
            const data = await Mediasdata.create({
                originalname: ele.originalname,
                encoding: ele.encoding,
                mimetype: ele.mimetype,
                filename: ele.filename,
                path: mediaData.Key,
                size: ele.size,
                account: useraccount?._id,
                fullpath: mediaData.results.Location
            });
            // console.log('id ',data._id);
            return data;
        }));
        return params;
    } catch (e) {
        throw e;
    }
}

async function insertBlogMiddleware(files, account) {
    try {
        if (!files) {
            return {
                type: "VALIDATION_ERROR",
                message: "File is required"
            };
        }
        let useraccount = await User.findById(account);
        const params = await Promise.all(files.map(async ele => {
            const mediaData = await s3Uploadsingleblog(ele);
            // console.log('uploaded url ',mediaData);
            const data = await BlogMedia.create({
                originalname: ele.originalname,
                encoding: ele.encoding,
                mimetype: ele.mimetype,
                filename: ele.filename,
                path: mediaData.Key,
                size: ele.size,
                account: useraccount?._id,
                fullpath: mediaData.results.Location
            });
            // console.log('id ',data._id);
            return data;
        }));
        return params;
    } catch (e) {
        throw e;
    }
}

async function insertProfileMiddleware(files, account) {
    try {
        if (!files) {
            return {
                type: "VALIDATION_ERROR",
                message: "File is required"
            };
        }
        let useraccount = await User.findById(account);
        const params = await Promise.all(files.map(async ele => {
            const mediaData = await s3UploadsingleProfile(ele);
            // console.log('uploaded url ',mediaData);
            const data = await ProfileMedia.create({
                originalname: ele.originalname,
                encoding: ele.encoding,
                mimetype: ele.mimetype,
                filename: ele.filename,
                path: mediaData.Key,
                size: ele.size,
                account: useraccount?._id,
                fullpath: mediaData.results.Location
            });
            // console.log('id ',data._id);
            return data;
        }));
        return params;
    } catch (e) {
        throw e;
    }
}

async function deleteMedia(req, res, next) {
    const { id } = req.params;
    try {
        const response = await Media.deleteOne({ _id: id });

        await deletefile(response.path);
        return {
            type: "Success",
            message: "File is deleted",
            data: response
        };
    } catch (e) {
        next(e);
    }
}

async function getMedia(id) {
    try {
        const response = await Media.findById({ _id: id });

        return response
    } catch (e) {
        next(e);
    }
}

async function gets3Media(id) {
    try {
        const response = await Media.findById({ _id: id });
        const ele = response.path;
        console.log("ele", ele);
        const mediaData = await s3getURL(ele);
        console.log("mediaData", mediaData);
        return mediaData
    } catch (e) {
        throw e;
    }
}

export { insertMediaMiddleware, deleteMedia, getMedia, gets3Media }
