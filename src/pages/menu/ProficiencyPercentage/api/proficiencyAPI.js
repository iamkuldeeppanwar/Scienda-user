import axiosInstance from "../../../../Utils/axiosUtils";

const userProciencys = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get("api/user/view-proficiency", {
        headers,
      });
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const userProciency = async (token, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get(
        `api/user/view-proficiency/${id}`,
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

export { userProciencys, userProciency };
