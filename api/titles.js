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
      aggregatedData.push({
        path: fullPath,
        folder: parentFolder
      });
    }
  }
}

export default async function (req, res) {
  try {
    const aggregatedData = [];
    await extractTitles(path.join(__dirname, '..', 'articles'), aggregatedData);

    const titles = await Promise.all(aggregatedData.map(async (fileData) => {
      const content = await fs.readFile(fileData.path, 'utf8');
      const $ = cheerio.load(content);
      const tagItems = $('.tagItem-article').map((i, el) => $(el).text()).get();
      
      // class="timeLog"에서 시간 문자열을 추출하고 형식을 변환합니다.
      let timeLog = $('.timeLog').text() || 'Unknown time';
      // "2024-03-23-12:10" -> "2024-03-23T12:10:00"
      timeLog = timeLog.replace(/(\d{4}-\d{2}-\d{2})-(\d{2}:\d{2})/, '$1T$2:00');

      return {
        folder: fileData.folder,
        title: $('title').text(),
        mtime: new Date(timeLog), // 변환된 시간 문자열로 Date 객체 생성
        tagItems: tagItems
      };
    }));

    // 변환된 mtime(Date 객체)을 기준으로 정렬합니다.
    titles.sort((a, b) => b.mtime - a.mtime);

    res.json(titles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}
