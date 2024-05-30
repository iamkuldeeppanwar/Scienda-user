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

export { membershipPlans };
