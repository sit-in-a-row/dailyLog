// api/titles.js
import fs from 'fs/promises';
import path from 'path';
import cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function extractTitles(dirPath, aggregatedData, parentFolder = '') {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await extractTitles(fullPath, aggregatedData, entry.name);
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.html') {
      const stats = await fs.stat(fullPath);
      aggregatedData.push({
        path: fullPath,
        mtime: stats.mtime,
        folder: parentFolder
      });
    }
  }
}

export default async function (req, res) {
  try {
    const aggregatedData = [];
    await extractTitles(path.join(__dirname, '..', 'articles'), aggregatedData);
    aggregatedData.sort((a, b) => b.mtime - a.mtime);

    const titles = await Promise.all(aggregatedData.map(async (fileData) => {
      const content = await fs.readFile(fileData.path, 'utf8');
      const $ = cheerio.load(content);
      const tagItems = $('.tagItem-article').map((i, el) => $(el).text()).get();
      return {
        folder: fileData.folder,
        title: $('title').text(),
        mtime: fileData.mtime,
        tagItems: tagItems
      };
    }));

    res.json(titles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}
