import axiosInstance from "../../../../Utils/axiosUtils";

const membershipPlans = async (domain) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get(
        `api/sub-domain/get-sub-domain/${domain}`
      );
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const upgradeNow = async (planData, token) => {
  return new Promise(async (resolve, reject) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const userData = await axiosInstance.post(
        `/api/order/create-order`,
        planData,
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

export { membershipPlans, upgradeNow };
