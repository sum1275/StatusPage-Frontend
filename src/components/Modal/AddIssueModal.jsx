import React, { useState } from "react";
import ApiServices from "../../services/apiService";

const AddIssueModal = ({ closeModal }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [application, setApplication] = useState("");
  const [subtitle, setSubtitle] = useState("");

  // Function to handle Save (send data)
  const handleSave = async () => {
    const issueData = {
      title,
      description,
      application,
      subtitle,
      userId: "test", // Ideally, replace with dynamic user ID
      completed: isCompleted,
    };

    try {
      const response = await ApiServices.addIssue(issueData);

      if (response) {
        // Reset form state only if the issue was successfully added
        setTitle("");
        setDescription("");
        setApplication("");
        setSubtitle("");
        setIsCompleted(false);

        closeModal(); // Close the modal after successful save
        console.log("Issue added successfully!");
      } else {
        console.warn("Failed to add issue. Response:", response);
        alert("Failed to add the issue. Please try again.");
      }
    } catch (error) {
      // Detailed error handling for unexpected failures
      console.error("Error occurred while adding issue:", error);
      alert(
        "An error occurred while adding the issue. Please try again later."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add New Issue
        </h2>

        {/* Select Application */}
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Select Application
        </label>
        <select
          value={application}
          onChange={(e) => setApplication(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none mb-4"
        >
          <option value="">Choose...</option>
          <option value="WebApp">Web Application</option>
          <option value="MobileApp">Mobile Application</option>
          <option value="DesktopApp">Desktop Application</option>
          <option value="EnterpriseApp">Enterprise Application</option>
          <option value="GamingApp">Gaming Application</option>
          <option value="IoTApp">IoT Application</option>
          <option value="EcommerceApp">E-commerce Application</option>
          <option value="EducationalApp">Educational Application</option>
        </select>

        {/* Title */}
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none mb-4"
          placeholder="Enter title"
        />

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
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none mb-4"
          placeholder="Enter description"
        ></textarea>

        {/* Completed Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="completed"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
            className="mr-2 rounded border-gray-300 text-blue-600 focus:ring focus:ring-blue-300"
          />
          <label
            htmlFor="completed"
            className="text-sm font-medium text-gray-600"
          >
            Completed
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
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

export default AddIssueModal;
