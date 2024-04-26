import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
<<<<<<< .merge_file_dAMojn
import { usersType } from "../../types/usersType";
import profiles from "../../../public/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";
import { toast } from "react-toastify";
const Profile: React.FC = () => {
  const [user, setUser] = useState<usersType | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [image, setImage] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const userData = useSelector((state: RootState) => state.user.user);
  const id = userData?._id;
  const token = userData?.token;
=======
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

>>>>>>> .merge_file_7d4zYE
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (id) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };

          const response = await axios.get(
            `http://localhost:5000/api/v1/users/get/${id}`,
            config
          );
<<<<<<< .merge_file_dAMojn
          setUser(response.data.user);
          setFormData({ name: response.data.name, email: response.data.email });
=======
          setUser(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
>>>>>>> .merge_file_7d4zYE
        } else {
          console.error("User ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [id, token]);

  //for handling name and email fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  // Function to handle image upload and conversion to base64
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userId = userData?._id;
      const token = userData?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      if (userId) {
        const updatedUserData = {
          updates: {
            name: formData.name || user?.name,
            email: formData.email || user?.email,
            imageUrl: image || user?.imageUrl || "",
          },
        };
        await axios.put(
          `http://localhost:5000/api/v1/users/update/${userId}`,
          updatedUserData,
          config
        );
        toast.success("your profile updated successfully");
      } else {
        console.error("User ID not found in localStorage");
      }
      setSaving(true);
      console.log(saving);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      // if (axiosError.response?.status === 404) {
      //   toast.warning(axiosError.response.data.error);
      // }
      if (axiosError.response?.data && axiosError.response.data?.error) {
        toast.error(axiosError.response.data.error);
      }
    }
  };

  //for handling password changes

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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
        `http://localhost:5000/api/v1/users/${id}`,
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
  //for toggling password
  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

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
    <section className="section main-section md:p-6 py-1 px-1 container mx-auto">
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
<<<<<<< .merge_file_dAMojn
            <form onSubmit={handleSubmit}>
=======
            <form onSubmit={handleProfileUpdate}>
>>>>>>> .merge_file_7d4zYE
              <div className="field">
                <label className="label">Avatar</label>
                <div className="field-body">
                  <div className="field file">
                    <label className="upload control">
<<<<<<< .merge_file_dAMojn
                      <span className="button blue">Upload</span>
                      <input type="file" onChange={handleImageUpload} />
=======
                      <a className="button blue">Upload</a>
                      <input type="file" onChange={handleFileUpload} />
>>>>>>> .merge_file_7d4zYE
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
<<<<<<< .merge_file_dAMojn
                        value={formData.name || user?.name}
                        onChange={handleChange}
                        placeholder="John Doe"
=======
                        value={name}
                        onChange={(e) => setName(e.target.value)}
>>>>>>> .merge_file_7d4zYE
                        className="input"
                        required
                      />
                    </div>
                    {/* <p className="help">Required. Your name</p> */}
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
                        value={formData.email || user?.email}
                        autoComplete="on"
                        onChange={handleChange}
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    {/* <p className="help">Required. Your e-mail</p> */}
                  </div>
                </div>
              </div>
              <hr />
              <div className="field">
                <div className="control">
                  {saving ? (
                    <button
                      type="button"
                      className="w-fit outline-none bg-white green"
                      disabled
                    >
                      Updating...
                    </button>
                  ) : (
                    <button type="submit" className="button green">
                      Submit
                    </button>
                  )}
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
                src={image || user?.imageUrl?.url || profiles}
                alt="Profile"
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
<<<<<<< .merge_file_dAMojn
          <header className="card-header relative">
=======
          <header className="card-header">
>>>>>>> .merge_file_7d4zYE
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-lock"></i>
              </span>
              Change Password
            </p>
<<<<<<< .merge_file_dAMojn
            <span
              className="absolute top-0 right-5 cursor-pointer hover:text-red-500 bg-white text-5xl"
              onClick={toggleChangePassword}
            >
              &times;
            </span>
=======
>>>>>>> .merge_file_7d4zYE
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
