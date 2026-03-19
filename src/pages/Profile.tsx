import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <div className="space-y-3">
        <p><strong>Name:</strong> {user?.name || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
        <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>
        {user?.id && <p><strong>User ID:</strong> {user.id}</p>}
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("isLoggedIn");
          navigate("/login");
        }}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
