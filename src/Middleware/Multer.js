import multer from "multer";

const storage = multer.memoryStorage();
const maxSize  = 1024 * 1024 * 100;
const upload = multer({ storage, limits: { fileSize: maxSize } });

export const fieldsupload =upload.fields([
   { name: 'document', maxCount: 1 },
    { name: 'profilepicture', maxCount: 1 },
    { name: 'blogimg', maxCount: 1 },
    { name: 'file', maxCount: 5 },
    { name: 'voidedCheck', maxCount: 1 },
    { name: 'driversLicense', maxCount: 1 },
    { name: 'salesPermit', maxCount: 1 },
    { name: 'voidCheck', maxCount: 1 },
    { name: 'deliveryCertificate', maxCount: 1 },
     { name: 'avatar', maxCount: 1},
])

