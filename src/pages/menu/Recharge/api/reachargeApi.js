import axiosInstance from "../../../../Utils/axiosUtils";

const getReacharge = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get(
        "/api/report/get-lowest-report",
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

export { getReacharge };
