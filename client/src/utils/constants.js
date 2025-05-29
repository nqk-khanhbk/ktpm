export const API_BASE_URL = "http://localhost:8080/api/v1"; // Base URL for API calls

export const AUTH_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    ACCOUNT: `${API_BASE_URL}/auth/account`,
};

export const USER_ROLES = {
    ADMIN: "admin",
    USER: "user",
};