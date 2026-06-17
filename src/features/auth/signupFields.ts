export const userSignupFields = {
  username: (data: any) => data.userUsername,
  password: (data: any) => data.userPassword,
  role: (data: any) => {
    return data.role || 'WORKER';
  },
  document: (data: any) => {
    return data.document || null;
  },
  displayName: (data: any) => {
    if (data.role === 'CORPORATE') {
      return `Anônimo${Math.floor(Math.random() * 1000000)}`;
    }
    return data.displayName || 'Rato Operario';
  }
};
