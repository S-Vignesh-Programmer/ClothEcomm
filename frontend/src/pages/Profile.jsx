import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <p className="text-center mt-10">Please log in to view your profile.</p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p className="mt-2">
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default Profile;
