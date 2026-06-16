export const userSignupFields = {
  username: (data: any) => {
    return data.userUsername;
  },
  password: (data: any) => {
    return data.userPassword;
  },
  role: (data: any) => {
    return data.userRole || 'WORKER';
  },
  document: (data: any) => {
    return data.userDocument || null;
  },
  displayName: (data: any) => {
    if (data.userRole === 'CORPORATE') {
      return `Anônimo${Math.floor(Math.random() * 1000000)}`;
    }
    return data.userName || 'Rato Operario';
  }
};
