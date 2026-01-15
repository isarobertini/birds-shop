/*
  authFetch automatically attaches the JWT token to requests.
  - For owners: includes "Authorization: Bearer <token>"
  - For guests: no JWT sent
*/
export const authFetch = (url, options = {}) => {
    const token = localStorage.getItem("token");

    // Merge custom headers with Authorization if needed
    const headers = {
        ...(options.headers || {}),
        ...(token && token !== "guest" ? { Authorization: `Bearer ${token}` } : {})
    };

    return fetch(url, { ...options, headers });
};
