export const userSignupFields = {
  username: (data: any) => {
    return data.userUsername;
  },
  password: (data: any) => {
    return data.userPassword;
  }
};
