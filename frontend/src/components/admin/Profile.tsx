import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const userData = useSelector((state: RootState) => state.user.user);

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
        } else {
          console.error("User ID not found in localStorage");
        }
      } catch (error) {
        if (error) {
          console.error("Error fetching user profile:", error);
        } else {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, []);

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
            <form>
              <div className="field">
                <label className="label">Avatar</label>
                <div className="field-body">
                  <div className="field file">
                    <label className="upload control">
                      <a className="button blue">Upload</a>
                      <input type="file" />
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className="field">
                <label className="label">Name</label>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        type="text"
                        autoComplete="on"
                        name="name"
                        placeholder="John Doe"
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
                        placeholder="user@example.com"
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
          <form>
            <div className="field">
              <label className="label">Current password</label>
              <div className="control">
                <input
                  type="password"
                  name="password_current"
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
                  autoComplete="new-password"
                  name="password"
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
                  autoComplete="new-password"
                  name="password_confirmation"
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
    </section>
  );
};

export default Profile;
