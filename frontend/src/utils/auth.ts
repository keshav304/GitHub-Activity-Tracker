export const saveToken = (token: string) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const isAuthenticated = (): boolean => {
    const token = getToken();
    return !!token;  
  };
  
  export const decodeToken = (token: string): any => {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      return null;
    }
  };
  