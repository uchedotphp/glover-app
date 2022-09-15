export default (error) => {
  let message = "";

  if (error.response) {
    message =
      error.response.data?.error || "An error occurred. Please try again.";
  } else if (error.request) {
    message = "An error occurred.";
  } else {
    message = "Something went wrong.";
  }
  throw message;
};
