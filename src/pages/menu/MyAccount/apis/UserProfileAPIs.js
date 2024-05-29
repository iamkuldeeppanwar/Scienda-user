import axiosInstance from "../../../../Utils/axiosUtils";

const userGetProfile = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`, // Replace with your actual token
    // Add other headers as needed
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.get("/api/user/get-profile", {
        headers,
      });
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const userUpdateProfile = async (profile, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.patch(
        "/api/user/update-profile",
        profile,
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

const userChangePassword = async (passwords, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.post(
        "/api/user/change-password",
        passwords,
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

export { userGetProfile, userUpdateProfile, userChangePassword };
