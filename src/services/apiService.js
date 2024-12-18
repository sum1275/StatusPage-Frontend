import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
// Create an axios instance
const api = axios.create({
  baseURL: baseURL, // Include protocol
  timeout: 10000, // 10 seconds timeout
});

// Define reusable API calls as functions
const ApiServices = {
  // Fetch all open issues
  fetchOpenIssues: async () => {
    try {
      const response = await api.get("/");
      console.log("response.data: ", response.data);
      return response.data.data; // Return the API response data
    } catch (error) {
      console.error("Error fetching issues:", error);
      throw error; // Throw the error to handle it in the caller
    }
  },
  fetchAllIssues: async () => {
    try {
      const response = await api.get("/allIssues");
      //   console.log("response.data: ", response.data);
      return response.data.data; // Return the API response data
    } catch (error) {
      console.error("Error fetching issues:", error);
      throw error; // Throw the error to handle it in the caller
    }
  },
  addIssue: async (issueData) => {
    try {
      const jsonifyData = JSON.stringify(issueData);
      console.log("jsonifyData: ", jsonifyData);
      const response = await api.post("/issues", JSON.stringify(issueData), {
        headers: { "Content-Type": "application/json" },
      });

      return response.data.success; // Return the API response data
    } catch (error) {
      console.error("Error adding issue:", error);
      throw error; // Throw the error to handle it in the caller
    }
  },
  addStatus: async (issueId, statusData) => {
    try {
      const response = await api.post(`/issues/${issueId}`, statusData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Status added successfully: ", response.data);
      return response.data.success; // Return the response data
    } catch (error) {
      console.error(`Error adding status for issue ${issueId}:`, error);
      throw error; // Throw the error to handle it in the caller
    }
  },
  deleteIssue: async (issueId) => {
    try {
      const response = await api.delete(`/issues/${issueId}`);

      if (response?.status === 200) {
        console.log(`Issue with ID ${issueId} deleted successfully.`);
        return true; // Return true to indicate success
      } else {
        console.warn(`Failed to delete issue with ID ${issueId}. Response:`, response);
        return false; // Return false if the delete was unsuccessful
      }
    } catch (error) {
      console.error(`Error deleting issue with ID ${issueId}:`, error);
      throw error; // Throw the error to handle it in the caller
    }
  },
  // Mark an issue as completed
};

export default ApiServices;
