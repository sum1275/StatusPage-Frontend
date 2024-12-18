import React, { useEffect, useState } from "react";
import ApiServices from "../../services/apiService";
import AddIssueModal from "../Modal/AddIssueModal";
import AddStatus from "../Modal/AddStatus";

const formatToIST = (timestamp) => {
  const options = { timeZone: "Asia/Kolkata", hour12: true };
  const date = new Date(timestamp);
  return date.toLocaleString("en-IN", options);
};

function IssuePrivate() {
  const [issues, setIssues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const [statusModalOpen, setStatusIsModalOpen] = useState(false); // Renamed
  const [selectedStatus, setSelectedStatus] = useState(null);
  const handleAddStatus = (issueId) => {
    setSelectedStatus(issueId); // Set the selected issue ID
    setStatusIsModalOpen(true); // Open the modal
  };

  const handleDelete = async (issueId) => {
    try {
      const success = await ApiServices.deleteIssue(issueId);

      if (success) {
        console.log("Issue deleted successfully");
        // Reload the page after successful deletion
        window.location.reload(); // This reloads the current page
      } else {
        console.log("Failed to delete issue");
      }
    } catch (error) {
      console.error("Error deleting issue:", error);
      alert("An error occurred while deleting the issue.");
    }
  };

  // Fetch issues on component mount
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await ApiServices.fetchAllIssues();
        setIssues(data?.issues || []);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="scheduled-maintenances-container p-4 m-16">
      {/* Add Issue Button */}
      <button
        onClick={() => setIsModalOpen(true)} // Open modal
        className="top-4 right-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md mb-2"
      >
        <span className="text-xl font-bold">+</span> Add Issue
      </button>

      {/* Render Issues */}
      {issues.map((issue) => (
        <div
          key={issue._id}
          className="scheduled-maintenance mb-6 border-b pb-4"
        >
          <div className="flex justify-between items-center mb-4">
            {/* Issue Title */}
            <div className="incident-title text-xl font-semibold flex-1">
              <span className="whitespace-pre-wrap">{issue.title}</span>
            </div>

            {/* Buttons Container */}
            <div className="flex gap-4 items-center">
              {/* X Button for Deleting Issue */}
              <button
                onClick={() => handleDelete(issue._id)} // Pass issue._id to handleDelete
                className="text-red-500 hover:text-white hover:bg-slate-600 px-3 py-1 rounded-md transition duration-200 ease-in-out hover:scale-105"
              >
                <span className="text-xl font-bold">&times;</span>{" "}
                {/* "X" icon */}
              </button>

              {/* Add Status Button */}
              <button
                onClick={() => handleAddStatus(issue._id)} // Pass issue._id to handleAddStatus
                className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-blue-700 shadow-md transition duration-200 ease-in-out hover:shadow-lg"
              >
                Add Status
              </button>
            </div>
          </div>

          {/* Status updates */}
          {issue.statuses.map((status, index) => (
            <div key={index} className="updates-container text-base mb-2">
              <span className="whitespace-pre-wrap font-bold text-red-600">
                {status.subtitle}
              </span>
              <br />

              <span className="whitespace-pre-wrap">{status.description}</span>
              <br />
              <small className="text-sm text-gray-500">
                Posted on {formatToIST(status.timestamp)}
              </small>
            </div>
          ))}
        </div>
      ))}

      {/* AddIssueModal Modal */}
      {isModalOpen && (
        <AddIssueModal closeModal={() => setIsModalOpen(false)} />
      )}

      {statusModalOpen && (
        <AddStatus
          issueId={selectedStatus} // Updated here
          onClose={() => setStatusIsModalOpen(false)} // Updated here
        />
      )}
    </div>
  );
}

export default IssuePrivate;
