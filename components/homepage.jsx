"use client";
import getUserRepos from "@/utils/getUserRepos";
import getUserDetails from "@/utils/getUsername";
import { useState } from "react";

const HomePageComponent = ({ token }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const [userDetails, reposData] = await Promise.all([
        getUserDetails(username, token),
        getUserRepos(username, token),
      ]);

      setUser(userDetails);
      setRepos(reposData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={handleInputChange}
        className="border-[1px] border-black py-2  text-lg"
      />
      <button
        onClick={fetchUserDetails}
        disabled={loading}
        className="border-[1px] border-black p-2 text-lg mx-2"
      >
        {loading ? "Loading..." : "Fetch User Details"}
      </button>

      {user && (
        <div>
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            width={100}
            height={100}
          />
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <h3>Repositories:</h3>
          {loading ? (
            "loading repos"
          ) : (
            <ul className="grid grid-cols-8 gap-4 mt-5">
              {repos.map((repo) => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-[1px] border-black p-2 bg-white my-4"
                  >
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {!user && !loading && <div>No user searched</div>}
    </div>
  );
};

export default HomePageComponent;
