const { default: axios } = require("axios")

const getUserRepos = async (username, token) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${token}`
            }
        })

        return response.data;
    }
    catch (err) {
        console.log("Error fetching repositories", err);
        throw err;
    }
}

export default getUserRepos;