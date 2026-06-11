const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include", // important for cookies/JWT
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
});

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};

export const registerUser = async (data)=>{
    return request("/user/register",{
        method:"POST",
        body: JSON.stringify(data)
    });
};

export const loginUser = async ({ userName, password }) => {
  return request("/user/login", {
    method: "POST",
    body: JSON.stringify({
      userName,
      password
    }),
  });
};

export const logoutUser = async() =>{
    return request("/user/logout",{
        method:"POST"
    })
}

export const getCurrentUser = async () => {
  return request("/user/get-current-user",{
    method: "GET"
  })
}