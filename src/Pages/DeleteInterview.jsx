// src/components/DeleteInterview.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react"; // icon
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
  // update the path based on your setup

const DeleteInterview = ({ interviewId }) => {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!confirm) return alert("Please confirm before deleting.");

    setLoading(true);
    try {
      await deleteDoc(doc(db, "mockInterviews", interviewId));
      alert("Interview deleted successfully!");
      navigate("/interviews"); // navigate to list or dashboard
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete interview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 border rounded-md">
      <label className="flex items-center space-x-2 mb-2">
        <input
          type="checkbox"
          checked={confirm}
          onChange={() => setConfirm(!confirm)}
        />
        <span>Are you sure you want to delete this interview?</span>
      </label> 

      <button
        onClick={handleDelete}
        disabled={!confirm || loading}
        className="text-red-600 hover:text-red-800 flex items-center space-x-1"
      >
        <Trash2 size={18} />
        <span>{loading ? "Deleting..." : "Delete"}</span>
      </button>
    </div>
  );
};

export default DeleteInterview;
