import axiosInstance from "../../../../Utils/axiosUtils";

const getSubTopics = async (sub) => {
  return new Promise(async (resolve, reject) => {
    try {
      const topicDate = await axiosInstance.get(
        `/api/topic/get-topics?sub_domain_reference=${sub}`
      );

      resolve(topicDate.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllSubAdmin = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const subAdminData = await axiosInstance.get(
        `/api/subadmin/get-subadmins`
      );

      resolve(subAdminData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const createTickets = async (data, token) => {
  console.log(data);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const ticketData = await axiosInstance.post(
        `/api/ticket/create-ticket`,
        data,
        {
          headers,
        }
      );

      resolve(ticketData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getTickets = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const subAdminData = await axiosInstance.get(
        `/api/ticket/get-all-tickets?role=User`,
        {
          headers,
        }
      );

      resolve(subAdminData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getSingleTicket = async (token, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const subAdminData = await axiosInstance.get(
        `/api/ticket/get-ticket/${id}`,
        {
          headers,
        }
      );

      resolve(subAdminData.data);
    } catch (error) {
      reject(error);
    }
  });
};

const postMessage = async (token, msg, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const subAdminData = await axiosInstance.patch(
        `/api/ticket/post-message/${id}`,
        msg,
        {
          headers,
        }
      );

      resolve(subAdminData.data);
    } catch (error) {
      reject(error);
    }
  });
};

export {
  getSubTopics,
  getAllSubAdmin,
  createTickets,
  getTickets,
  getSingleTicket,
  postMessage,
};
