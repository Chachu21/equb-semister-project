import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { toast } from "react-toastify";

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const userData: any = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = userData?._id;
        const token = userData?.token;
        if (userId) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };

          const response = await axios.get(
            `http://localhost:5000/api/v1/users/${userId}`,
            config
          );
          setUser(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
        } else {
          console.error("User ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = userData?._id;
      const token = userData?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const data = {
        name,
        email,
      };
      const response = await axios.put(
        `http://localhost:5000/api/v1/users/${userId}`,
        data,
        config
      );
      console.log("Profile updated successfully");
      console.log(response);
      // Optionally, you can show a success message to the user
    } catch (error) {
      console.error("Error updating profile:", error);
      // Optionally, you can show an error message to the user
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = userData?._id;
      const token = userData?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const data = {
        password: newPassword,
        confirmPassword: confirmPassword,
      };
      const response = await axios.put(
        `http://localhost:5000/api/v1/users/${userId}`,
        data,
        config
      );
      console.log("Password changed successfully");
      console.log(response);

      if (response) {
        toast.success("Successfully changed password");
      }

      // Optionally, you can show a success message to the user
    } catch (error) {
      console.error("Error changing password:", error);
      // Optionally, you can show an error message to the user
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setAvatar(selectedFile);
    }
  };

  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  return (
    <section className="section main-section md:p-6 py-1 px-1">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-account-circle"></i>
              </span>
              Edit Profile
            </p>
          </header>
          <div className="card-content">
            <form onSubmit={handleProfileUpdate}>
              <div className="field">
                <label className="label">Avatar</label>
                <div className="field-body">
                  <div className="field file">
                    <label className="upload control">
                      <a className="button blue">Upload</a>
                      <input type="file" onChange={handleFileUpload} />
                    </label>
                  </div>
                </div>
                <label className="label">Name</label>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        type="text"
                        autoComplete="on"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <p className="help">Required. Your name</p>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">E-mail</label>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        type="email"
                        autoComplete="on"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <p className="help">Required. Your e-mail</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="field">
                <div className="control">
                  <button type="submit" className="button green">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-account"></i>
              </span>
              Profile
            </p>
          </header>
          <div className="card-content">
            <div className="image w-48 h-48 mx-auto">
              <img
                src="https://avatars.dicebear.com/v2/initials/john-doe.svg"
                alt="John Doe"
                className="rounded-full"
              />
            </div>
            <hr />
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  readOnly
                  value={user ? user.name : "John Doe"}
                  className="input is-static"
                />
              </div>
            </div>
            <hr />
            <div className="field">
              <label className="label">E-mail</label>
              <div className="control">
                <input
                  type="text"
                  readOnly
                  value={user ? user.email : "Doe@example.com"}
                  className="input is-static"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {!showChangePassword && (
        <button className="button green" onClick={toggleChangePassword}>
          Change Password
        </button>
      )}
      {showChangePassword && (
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-lock"></i>
              </span>
              Change Password
            </p>
          </header>
          <div className="card-content">
            <form onSubmit={handleChangePassword}>
              <div className="field">
                <label className="label">Current password</label>
                <div className="control">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                    className="input"
                    required
                  />
                </div>
                <p className="help">Required. Your current password</p>
              </div>
              <hr />
              <div className="field">
                <label className="label">New password</label>
                <div className="control">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    className="input"
                    required
                  />
                </div>
                <p className="help">Required. New password</p>
              </div>
              <div className="field">
                <label className="label">Confirm password</label>
                <div className="control">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    className="input"
                    required
                  />
                </div>
                <p className="help">Required. New password one more time</p>
              </div>
              <hr />
              <div className="field">
                <div className="control">
                  <button type="submit" className="button green">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
