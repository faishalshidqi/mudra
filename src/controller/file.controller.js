const processFileMiddleware = require('../middleware/upload');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ keyFile: 'mudra-development-e072459cc52d.json' });


const upload = async (req, res) => {
    try {
        await processFileMiddleware(req, res);
        console.log(req);
        if (!req.file) {
            return res.status(400).send({ message: 'file tidak ada!' });
        }
        const bucketName = process.env.BUCKET_NAME;
        const foldername = req.body.foldername ?? 'courses';
        const bucket = storage.bucket(bucketName);
        const file = `${foldername}/${req.file.originalname}`;
        const blob = bucket.file(file);
        const blobstream = blob.createWriteStream({
            resumable: false
        });

        blobstream.on('error', (err) => {
            res.status(500).send({ message: `${err.message} - stream error` });
        });

        blobstream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file}`;

            try {
                await bucket.file(file).makePublic();
            } catch (error) {
                return res.status(202).send({
                    message: 'upload success but public access denied',
                    url: publicUrl,
                    err: error,
                });
            }

            res.status(200).send({
                message: 'upload file successful',
                url: publicUrl
            });
        });
        blobstream.end(req.file.buffer);
    } catch (error) {
        res.status(500).send({
            message: `tidak bisa mengupload gambar! ${error}`
        });
    }
};

module.exports = {
    upload
};
