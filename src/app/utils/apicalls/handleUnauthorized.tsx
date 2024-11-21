export const handleUnauthorized = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};
