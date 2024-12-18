import React, { useState } from "react";
import ApiServices from "../../services/apiService";

const AddStatus = ({ issueId, onClose }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleSave = async () => {
    const statusData = {
      subtitle,
      description,
      isCompleted,
    };

    try {
      console.log("Sending status data:", statusData);

      // Call API to add the status, ensure the response is checked thoroughly
      const response = await ApiServices.addStatus(issueId, statusData);

      if (response) {
        console.log("Status added successfully!");
        onClose(); // Close the modal after successful save
        window.location.reload();
      } else {
        console.warn("Unexpected response format or failure", response);
        alert("Failed to add status. Please try again.");
      }
    } catch (error) {
      // Detailed error handling and logging
      console.error("Error occurred while adding status:", error);
      alert(
        "An error occurred while adding the status. Please try again later."
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        {/* Modal Header */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Add New Status
        </h2>

        {/* Subtitle */}
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Subtitle
        </label>
        <select
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none mb-4"
        >
          <option value="">Choose subtitle...</option>
          <option value="Operational">Operational</option>
          <option value="Partial outage">Partial outage</option>
          <option value="Degraded performance">Degraded performance</option>
          <option value="Major outage">Major outage</option>
          <option value="Under maintenance">Under maintenance</option>
          <option value="Resolved">Resolved</option>
        </select>

        {/* Description */}
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 focus:ring focus:ring-blue-300"
          placeholder="Enter description"
        ></textarea>

        {/* Completed Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="completed"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
            className="mr-2 rounded text-blue-600 focus:ring focus:ring-blue-300"
          />
          <label htmlFor="completed" className="text-sm text-gray-600">
            Completed
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStatus;
