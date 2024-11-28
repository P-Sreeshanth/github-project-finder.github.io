const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// GitHub Token is passed via GitHub Actions secrets
const githubToken = process.env.GITHUB_TOKEN;

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    try {
        const response = await axios.get('https://api.github.com/search/repositories', {
            params: { q: query, sort: 'stars', order: 'desc', per_page: 10 },
            headers: { Authorization: `token ${githubToken}` }
        });

        const repositories = response.data.items.map(repo => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            updated_at: repo.updated_at,
            language: repo.language,
            html_url: repo.html_url,
            avatar_url: repo.owner.avatar_url,
            owner: repo.owner.login
        }));

        res.json(repositories);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch GitHub data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
