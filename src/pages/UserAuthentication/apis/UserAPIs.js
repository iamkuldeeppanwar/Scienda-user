import axiosInstance from "../../../Utils/axiosUtils";

const userRegistration = async (
  first_name,
  last_name,
  dob,
  mobile,
  subdomain,
  email,
  password
) => {
  const userInfo = {
    first_name,
    last_name,
    dob,
    mobile,
    domain,
    subdomain,
    email,
    password,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.post("/api/user/register", userInfo);

      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const userEmailVerifyOtp = async (email, otp) => {
  const verify = { email, otp };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.post(
        "/api/user/verify-email",
        verify
      );

      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const userResendOtp = async (email, otp) => {
  const verify = { email, otp };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.post("/api/user/resend-otp", verify);
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const userLogin = async (email, password) => {
  const login = { email, password };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.post("/api/user/login", login);
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const userForgetPassword = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.post(
        "/api/user/getotp-to-forgot-password",
        { email: email }
      );
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const userResetPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.post(
        "/api/user/reset-password",
        password
      );
      resolve(userData.data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};

const userResetPasswordOtp = async (email, otp) => {
  const verify = { email, otp };
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await axiosInstance.post(
        "/api/user/submitotp-to-forgot-password",
        verify
      );
      resolve(userData.data);
    } catch (error) {
      reject(error);
    }
  });
};

export {
  userRegistration,
  userEmailVerifyOtp,
  userResendOtp,
  userLogin,
  userForgetPassword,
  userResetPassword,
  userResetPasswordOtp,
};
