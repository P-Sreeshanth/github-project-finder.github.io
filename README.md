# GitHub Project Finder 🚀

A **web application** that allows users to search for **GitHub repositories** based on specific queries. The app fetches repositories from GitHub using their API and displays popular and niche repositories. The backend is powered by **Express.js**, and the frontend is a simple **HTML/JavaScript** interface.

---

## 🛠️ **Technologies Used**

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js, Axios
- **API**: GitHub REST API
- **Environment Variables**: dotenv
- **Deployment**: *(Choose your platform like Heroku, Vercel, etc.)*

---

## 💻 **Installation**

To get started with this project locally, follow the steps below:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/Git-Hub-Project-Finder.git
    ```

2. **Navigate to the project folder**:

    ```bash
    cd Git-Hub-Project-Finder
    ```

3. **Install the required dependencies**:

    ```bash
    npm install
    ```

4. **Create a `.env` file**:

    Add your **GitHub Personal Access Token** in the `.env` file:

    ```bash
    GITHUB_TOKEN=your_personal_access_token
    ```

    You can create a GitHub token here: [GitHub Personal Access Tokens](https://github.com/settings/tokens)

5. **Run the application**:

    Start the backend server:

    ```bash
    npm start
    ```

    This will run the backend on `http://localhost:5000`.

6. **Open the frontend in your browser**:

    Simply open the `index.html` file in your browser.

---

## 📝 **Code Explanation**

### Backend (Express.js):

- **Dependencies**:
  - `express`: Web framework for Node.js.
  - `axios`: Promise-based HTTP client to make requests to external APIs.
  - `cors`: Middleware to allow cross-origin requests.
  - `dotenv`: Loads environment variables from a `.env` file.
  
- **Backend Functionality**:
  - The backend listens on port `5000` by default.
  - The `/api/search` endpoint accepts a query parameter (`q`) and fetches GitHub repositories based on that query.
  - The GitHub API is queried using `axios`, with a token for authentication.
  - The results are filtered, mapped, and returned as JSON to the frontend.
  
Example of the backend route:

```js
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


