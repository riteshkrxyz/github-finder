import axios from "axios";

const getUserDetails = async (username, token) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        console.log(response.data);
        const userDetails = {
            name: response.data.name,
            avatarUrl: response.data.avatar_url,
            repos_url: response.data.repos_url,
            bio: response.data.bio,
        }
        return userDetails;
    } catch (error) {
        console.log("Error fetching user details", error);
        throw error;
    }
}

export default getUserDetails;