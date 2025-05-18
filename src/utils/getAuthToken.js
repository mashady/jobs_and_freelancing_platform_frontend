const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  return token;
}

export default getAuthToken;