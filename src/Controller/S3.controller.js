import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

// Initialize S3 instance
const s3 = new AWS.S3({
  region: process.env.S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// Get pre-signed URL
export const s3getURL = async (Key) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key,
    Expires: 60, 
  };
 return s3.getSignedUrl('getObject', params);
};

// Upload multiple files
export const s3Upload = async (files) => {
  const results = await Promise.all(
    files.map((file) => {
      const Key = `uploads/${uuidv4()}-${file.originalname}`;

      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key,
        Body: file.buffer,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
      };

      return s3.upload(params).promise();
    })
  );

  return results;
};

// Upload single file
export const s3Uploadsingle = async (file) => {
  const Key = `uploads/${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key,
    Body: file.buffer,
    ContentDisposition: 'inline',
    ContentType: file.mimetype,
  };

  const results = await s3.upload(params).promise();
  return { results, Key };
};

// Upload blog image
export const s3Uploadsingleblog = async (file) => {
  const Key = `blogs/${uuidv4()}-${file.originalname}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key,
    Body: file.buffer,
    ContentDisposition: 'inline',
    ContentType: file.mimetype,
  };

  const results = await s3.upload(params).promise();
  return { results, Key };
};

// Upload profile image
export const s3UploadsingleProfile = async (file) => {
  const Key = `profile/${uuidv4()}-${file.originalname}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key,
    Body: file.buffer,
    ContentDisposition: 'inline',
    ContentType: file.mimetype,
  };

  const results = await s3.upload(params).promise();
  return { results, Key };
};

// Delete a file
export const deletefile = (Key) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${Key}`,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};