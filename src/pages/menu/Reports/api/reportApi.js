import axiosInstance from "../../../../Utils/axiosUtils";

const getReportGraph = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get("/api/user/get-user-test-data", {
        headers,
      });
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getReportPieGraph = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get("/api/user/get-user-pie-chart", {
        headers,
      });
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getReportConfidenceGraph = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get(
        "/api/user/get-user-confidence",
        {
          headers,
        }
      );
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getReportQuestionGraph = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get(
        "/api/user/get-user-question-data",
        {
          headers,
        }
      );
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

export {
  getReportGraph,
  getReportPieGraph,
  getReportConfidenceGraph,
  getReportQuestionGraph,
};
