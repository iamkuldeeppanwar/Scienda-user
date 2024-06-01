import axiosInstance from "../../../../Utils/axiosUtils";

const getTests = async (subdomain_reference, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get(
        `/api/test/get-tests?subdomain_reference=${subdomain_reference}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getTest = async (id, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get(`/api/test/get-test/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

export { getTests, getTest };
