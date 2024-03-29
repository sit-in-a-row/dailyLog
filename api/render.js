import { readFileSync } from 'fs';
import { path } from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function (req, res) {
    const userAgent = req.headers['user-agent'].toLowerCase();
    let filePath = join(__dirname, '..', 'index.html');

    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
        filePath = join(__dirname, '..', 'mobile.html');
    }

    const fileContents = readFileSync(filePath, 'utf8');
    res.send(fileContents);
}
