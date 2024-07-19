import axiosInstance from "../../../../Utils/axiosUtils";

const getDashboardData = async (token, subDomain) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get(
        `/api/user/get-user-dashboard-data?subdomain=${subDomain}`,
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

export { getDashboardData };
