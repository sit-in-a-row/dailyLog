export const CSarticles = [];
export const ETCarticles = [];
export const EXParticles = [];
export const MLDLarticles = [];
export const TOTALarticles = [];
export let articlesData = [];

export async function fetchArticles() {
    try {
        const response = await fetch('/api/titles');
        const data = await response.json();
        articlesData = data;
        
        data.forEach(item => {
            switch (item.folder) {
                case 'CS':
                    CSarticles.push(item.title);
                    break;
                case 'ETC':
                    ETCarticles.push(item.title);
                    break;
                case 'EXP':
                    EXParticles.push(item.title);
                    break;
                case 'MLDL':
                    MLDLarticles.push(item.title);
                    break;
            }
            TOTALarticles.push(item.title);
        });
    } catch (error) {
        console.error('Error fetching article titles:', error);
    }
}