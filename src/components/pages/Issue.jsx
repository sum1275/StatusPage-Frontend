import React from "react";
import ApiServices from "../../services/apiService";
import { useEffect, useState } from "react";
const formatToIST = (timestamp) => {
  const options = { timeZone: "Asia/Kolkata", hour12: true };
  const date = new Date(timestamp);
  return date.toLocaleString("en-IN", options);
};

function Issue() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await ApiServices.fetchOpenIssues();

        console.log('data data')
        console.log(data)
        setIssues(data?.issues || []); // Set the issues from API response
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="scheduled-maintenances-container p-4">
      
      {issues.map((issue) => (
        <div key={issue._id} className="scheduled-maintenance mb-6 border-b pb-4">
          <div className="incident-title text-xl font-semibold border-b mb-2">
            <span className="whitespace-pre-wrap">{issue.title}</span>
          </div>
          {issue.statuses.map((status, index) => (
            <div key={index} className="updates-container text-base mb-2">
              <span className="whitespace-pre-wrap">{status.subtitle}</span>
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
    </div>
  );
}

export default Issue
