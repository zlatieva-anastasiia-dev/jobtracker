export const setSessionCookie = (token: string) => {
  const name = "sb-access-token";
  const days = 7;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  document.cookie = `${name}=${token}; expires=${expires}; path=/; SameSite=Lax;`;
};
export const deleteSessionCookie = () => {
  document.cookie = `sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax;`;
};
