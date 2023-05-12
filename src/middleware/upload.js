const util = require('util');
const Multer = require('multer');
const maxSize = 5 * 1024 * 1024;

const processFile = Multer({
    storage: Multer.memoryStorage(),
    limits: { fileSize: maxSize }
}).single('file');

const processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
