const processFileMiddleware = require('../middleware/upload');
const { Storage } = require('@google-cloud/storage');
const Path = require('path');
const Url = require('url');
const storage = new Storage({ keyFile: 'mudra-development-e072459cc52d.json' });


const upload = async (req, res) => {
    try {
        await processFileMiddleware(req, res);
        if (!req.file) {
            return res.status(400).send({ status: 'fail', message: 'file tidak ada!' });
        }
        const bucketName = process.env.BUCKET_NAME;
        const foldername = req.body.foldername ?? 'courses';
        const bucket = storage.bucket(bucketName);
        const extension = Path.extname(Url.parse(req.file.originalname).pathname);
        const file = `${foldername}/${req.body.filename}${extension}`;
        const blob = bucket.file(file);
        const blobstream = blob.createWriteStream({
            resumable: false
        });

        blobstream.on('error', (err) => {
            res.status(500).send({ status: 'error', message: `${err.message} - stream error` });
        });

        blobstream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file}`;

            try {
                await bucket.file(file).makePublic();
            } catch (error) {
                return res.status(202).send({
                    status: 'success',
                    message: 'upload success but public access denied',
                    url: publicUrl,
                    err: error,
                });
            }

            res.status(200).send({
                status: 'success',
                message: 'upload file successful',
                url: publicUrl
            });
        });
        blobstream.end(req.file.buffer);
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: `tidak bisa mengupload gambar! ${error}`
        });
    }
};

module.exports = {
    upload
};
