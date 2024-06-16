import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { BsGlobe2 } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdOutlineFavorite } from "react-icons/md";
import EditModal from "./EditModal";
import {toast} from 'react-hot-toast'

const Data = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://jsonplaceholder.typicode.com/users";
      try {
        setLoading(true);
        const response = await axios.get(url);
        const usersWithLikes = response.data.map(user => ({ ...user, like: false }));
        setData(usersWithLikes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true); 
    toast.success("Update successfully")
  };

  const handleSaveEdit = (editedUser) => {
    setData(
      data.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
    setEditingUser(null);
    setIsModalOpen(false); 
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setIsModalOpen(false); 
  };

  const handleDelete = (userId) => {
    const newData = data.filter((user) => user.id !== userId);
    setData(newData);
    toast.success("Delete successfully")
  };

  const handleChange = (userId) => {
    setData(data.map(user => user.id === userId ? { ...user, like: !user.like } : user));
  };

  return (
    <div className="user-grid">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row mx-3 my-3">
          {data.map((user) => (
            <div key={user.id} className="col-md-3">
              <div className="card" style={{ maxWidth: "100%", margin: "10px" }}>
                <img className="card-img-top"
                  src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                  alt="Avatar"
                />
                <div className="card text">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text"><MdOutlineMail /> {user.email}</p>
                  <p className="card-text"><AiOutlinePhone /> {user.phone}</p>
                  <p className="card-text"><BsGlobe2 /> {user.website}</p>
                </div>
                <div className="card-body">
                  <span onClick={() => handleChange(user.id)}
                    style={{ cursor: "pointer", marginLeft: "20px", marginRight: "20px" }}>
                    {user.like ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
                  </span>{" "}
                  |
                  <span onClick={() => handleEdit(user)}
                    style={{ cursor: "pointer", marginLeft: "20px", marginRight: "20px" }}>
                    <AiOutlineEdit />
                  </span>{" "}
                  |
                  <span onClick={() => handleDelete(user.id)}
                    style={{ cursor: "pointer", marginLeft: "20px", marginRight: "20px" }}>
                    <RiDeleteBin7Fill />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && editingUser && (
        <EditModal
          isOpen={isModalOpen}
          user={editingUser}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};
export default Data;
