export const isAuthenticated = () => {
  // Check for authentication token or session
  return !!localStorage.getItem('token');
};

export const saveIntendedUrl = (url: string) => {
  sessionStorage.setItem('intendedUrl', url);
};

export const getIntendedUrl = () => {
  const url = sessionStorage.getItem('intendedUrl');
  sessionStorage.removeItem('intendedUrl');
  return url;
};
