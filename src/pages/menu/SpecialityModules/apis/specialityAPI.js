import axiosInstance from "../../../../Utils/axiosUtils";

const getSpecialityModules = async (token, subdomain) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get(
        `api/user/get-topics/${subdomain}`,
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

const getSpecialityModule = async (token, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get(`/api/user/get-topic/${id}`, {
        headers,
      });
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

export { getSpecialityModules, getSpecialityModule };
