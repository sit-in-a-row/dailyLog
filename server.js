import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/articles', express.static(path.join(__dirname, 'articles')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

export async function extractTitles(dirPath, aggregatedData, parentFolder = '') {
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

app.get('/api/titles', async (req, res) => {
    try {
        const aggregatedData = [];
        await extractTitles(path.join(__dirname, 'articles'), aggregatedData);
  
        // 수정 시간에 따라 데이터를 정렬
        aggregatedData.sort((a, b) => b.mtime - a.mtime);
  
        const titles = await Promise.all(aggregatedData.map(async (fileData) => {
            const content = await fs.readFile(fileData.path, 'utf8');
            const $ = cheerio.load(content);
            // 클래스 'tagItem-article'인 모든 div에서 텍스트를 수집
            const tagItems = $('.tagItem-article').map((i, el) => $(el).text()).get();
            return {
                folder: fileData.folder,
                title: $('title').text(),
                mtime: fileData.mtime, // 수정 시간을 포함
                tagItems: tagItems // 'tagItem-article' div의 텍스트를 포함
            };
        }));
  
        res.json(titles);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});  

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

