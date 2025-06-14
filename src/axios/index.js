import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5160',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCookie = async (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

export const fetchLogin = async (login, password) => {
  try {
    console.log("Login attempt with:", login, password);
    const response = await apiClient.post("Users/Login", { 
    login,
    password
  })
  console.log("Login response:", response.data);
  }
  catch {
    throw new Error("Login error")
  }
 }

export const fetchCreateUser = async (user) => {
  try {
    const response = await apiClient.post("Users", user)
  }
  catch {
    throw new Error("Registration error")
  }
}

export const fetchThread = async (threadId) => {
  try {
    const response = await apiClient.get(`/Threads/${threadId}`)

    return response.data
  }
  catch {
    throw new Error("Get Thread ERROR")
  }
}

export const fetchThreads = async () => {
  try {
  const response = await apiClient.get("/Threads/AllThreads")

  return response.data
  }
  catch {
    throw new Error("Get Threads Error")
  }
}

export const fetchThreadThemes = async () => {
  try {
    const response = await apiClient.get("/Threads/AllThreadThemes")

    return response.data
  }
  catch {
    throw new Error("Get ThreadThemes ERROR")
  }
}

export const fetchThreadTheme = async (themeId) => {
  try {
    const response = await apiClient.get(`/Threads/ThreadThemes/${themeId}`)

    return response.data
  }
  catch {
    throw new Error("Get ThreadTheme ERROR")
  }
}

export const fetchUserJoinToThread = async (userId, threadId) => {
  try {
    const response = await apiClient.post(`/Users/UserThread/${userId}/${threadId}`)

    return response.data
  }
  catch {
    throw new Error("Join to Thread ERROR")
  }
}

export const fetchUserThreads = async (userId) => {
  try {
    const response = await apiClient.get(`/Users/UserThreads/${userId}`)

    return response.data
  }
  catch {
    throw new Error("Get User Threads ERROR")
  }
}

export const fetchCreateThread = async (thread) => {
  try {
    const response = await apiClient.post("/Threads", thread)

    return response.data
  }
  catch {
    throw new Error("Create Thread ERROR")
  }
}

export const fetchMessages = async (threadId) => {
  try {
    const response = await apiClient.get(`/Messages/ThreadMessages/${threadId}`)

    return response.data
  }
  catch {
    throw new Error("Get Messages ERROR")
  }
}

export const fetchEditMessage = async (message) => {
  try {
    const response = await apiClient.put(`/Messages`, message)

    return response.data
  }
  catch {
    throw new Error("Edit Message ERROR")
  }
}

export const fetchCreateMessage = async (message) => {
  try {
    const response = await apiClient.post("/Messages", message)

    return response.data
  }
  catch {
    throw new Error("Create Message ERROR")
  }
}

export const fetchDeleteMessage = async (messageId) => {
  try {
    const response = await apiClient.delete(`/Messages/${messageId}`)

    return response.data
  }
  catch {
    throw new Error("Delete Message ERROR")
  }
}

export const fetchUser = async (userId) => {
  try {
    const response = await apiClient.get(`/Users/${userId}`)

    return response.data
  }
  catch {
    throw new Error("Get User ERROR")
  }
}

export const fetchEditUser = async (user) => {
  try {
    const response = await apiClient.put(`/Users`, user)

    return response.data
  }
  catch {
    throw new Error("Edit User ERROR")
  }
}

export const fetchDeleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/Users/${userId}`)

    return response.data
  }
  catch {
    throw new Error("Delete User ERROR")
  }
}

export const fetchAddKarma = async (fromUserId, ToUserId) => {
  try {
    const response = await apiClient.post(`/Users/AddKarma/${fromUserId}/${ToUserId}`)

    return response.data
  }
  catch {
    throw new Error("Add Karma ERROR")
  }
}

export const fetchRemoveVoteKarma = async (fromUserId, ToUserId) => {
  try {
    const response = await apiClient.delete(`/Users/RemoveVoteKarma/${fromUserId}/${ToUserId}`)

    return response.data
  }
  catch {
    throw new Error("Remove Karma ERROR")
  }
}

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/Users")

    return response.data
  }
  catch {
    throw new Error("Get Users ERROR")
  }
}

export const fetchUserStatus = async (userId) => {
  try {
    const response = await apiClient.get(`/Users/UserStatus/${userId}`)

    return response.data
  }
  catch {
    throw new Error("Get User Status ERROR")
  }
}

export const fetchUpdateUserStatus = async (userId, statusId) => {
  try {
    const response = await apiClient.put(`/Users/UpdateStatus/${userId}/${statusId}`)

    return response.data
  }
  catch {
    throw new Error("Set User Status ERROR")
  }
}

export const fetchAllStatuses = async () => {
  try {
    const response = await apiClient.get("/Users/AllStatuses")

    return response.data
  }
  catch {
    throw new Error("Get All Statuses ERROR")
  }
}

export const fetchUsersFromThread = async (threadId) => {
  try {
    const response = await apiClient.get(`/Users/UsersFromThread/${threadId}`)

    return response.data
  }
  catch {
    throw new Error("Get Users From Thread ERROR")
  }
}