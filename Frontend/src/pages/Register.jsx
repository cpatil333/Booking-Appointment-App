import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "../apollo/Mutation";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
    role: "select",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [signin, { loading, error }] = useMutation(USER_REGISTER);

  const handleSelectInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadFileName = "";
      if (selectedFile) {
        try {
          const fileData = new FormData();
          fileData.append("imageUrl", selectedFile);

          const response = await fetch("http://localhost:4000/uploads", {
            method: "POST",
            body: fileData,
          });

          const contentType = response.headers.get("content-type") || "";
          if (!contentType.includes("application/json")) {
            const text = await response.text();
            throw new Error("Server return non-JSON", text);
          }
          const result = await response.json();
          uploadFileName = result.filename;
        } catch (error) {
          console.log("Uploaded file Error ", error.message);
          return;
        }
      }
      const { data } = await signin({
        variables: {
          input: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            imageUrl: uploadFileName,
            role: formData.role,
          },
        },
      });
      console.log(data);
      if (data.signin) {
        alert("User data saved!");
        navigate("/", { replace: true });
      } else {
        alert("User data failed !");
        return;
      }
    } catch (error) {
      console.error("User register data error ", error.message);
      alert("User Register failed, please check data!");
    }
  };

  return (
    <div className="container">
      <h2>User Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="file"
            name="imageUrl"
            placeholder="Select images"
            onChange={handleSelectInput}
          />
        </div>
        <div>
          <select name="role" onChange={handleInput}>
            <option value="select">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
