export const getError = (error) => {
  if (error.response) {
    if (error.response.data.message) return error.response.data.message;
    return error.response;
  }
  return error.message;
};

export const toastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
