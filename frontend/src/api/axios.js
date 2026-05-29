import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 1. Pencegat Permintaan: Menyisipkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 2. Pencegat Balasan: Menangani eror 401 secara global
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest.retry_) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer" + token;
            return api(originalRequest);
          })
        .catch((err)=> Promise.reject(err))
      }
      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const { data } = await axios.post(
          "http://localhost:8000/refresh",
          { refreshToken }
        );
        localStorage.setItem("accessToken", data.accessToken);

        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization =
          "Bearer" + data.accessToken;
        
        return api(originalRequest)
      } catch (error) {
        processQueue(error, null);
        localStorage.clear();
        window.location.href = "./login";
        
        return Promise.reject(error)
        
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
)

export default api;
