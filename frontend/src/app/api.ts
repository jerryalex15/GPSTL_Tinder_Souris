import { useCallback, useEffect, useState } from "react";

type AuthData = {
  token: string,
  role: Role,
  userId: number,
}

export function getAuthData(): AuthData | null {
  let str = typeof window !== "undefined" && window.localStorage.getItem("authData") || null;
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

export function getToken(): string | null {
  return getAuthData()?.token || null;
}

const API_URL = 'http://localhost:8080';

async function fetchWithAuth(url: string, init: RequestInit = {}): Promise<Response> {
  let token = getToken();
  if (token === null) {
    throw new Error("No token");
  }
  let headers = init.headers as Record<string, string> || {};
  headers["Authorization"] = `Bearer ${token}`;
  return await fetch(API_URL + url, { ...init, headers });
}

async function fetchTryWithAuth(url: string, init: RequestInit = {}): Promise<Response> {
  let token = getToken();
  let headers = init.headers as Record<string, string> || {};
  if (token !== null) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return await fetch(API_URL + url, { ...init, headers });
}

function fetchJSON(fetch: typeof fetchWithAuth) {
  return async function<T>(url: string, params: {method?: string, body?: any} = {}): Promise<T> {
    let init: RequestInit = {method: params.method || "GET"};
    if (params.body && init.method !== "GET") {
      init.body = JSON.stringify(params.body);
      init.headers = {"Content-Type": "application/json"};
    } else if (params.body) {
      let searchParams = new URLSearchParams();
      for (let key in params.body) {
        searchParams.append(key, params.body[key]);
      }
      url += "?" + searchParams;
    }
    let res = await fetch(url, init);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Request to ${url} failed with status ${res.status}: ${errorText}`);
    }
    return res.json();
  }
}

const fetchWithAuthJSON = fetchJSON(fetchWithAuth);
const fetchTryWithAuthJSON = fetchJSON(fetchTryWithAuth);

// api.ts


export function logout() {
  window.localStorage.removeItem("authData");
}

export async function login(username: string, password: string): Promise<AuthData> {
  let res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "username": username, "password": password }),
    // comm
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  let token = await res.json() as AuthData;
  localStorage.setItem("authData", JSON.stringify(token));
  return token;
}

export type Role = "student" | "company" | "cfa";
export async function register(
  username: string, email: string, password: string, role: Role
): Promise<void> {
  let res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, email, password, role}),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  // redirect to the login page

  // Then login
  let token = await login(username, password);
  localStorage.setItem("authData", JSON.stringify(token));


  return;
}

export type JobPosting = {
  id: number,
  companyId: number,
  positionTitle: string,
  duration: string,
  requiredSkills: string,
  createdAt: string,
  categories: number[],
};

export type JobPostingCreation = Omit<JobPosting, "id" | "createdAt">;

export async function getStudentPostings(): Promise<JobPosting[]> {
  let myId = getAuthData()?.userId;
  return await fetchWithAuthJSON(`/api/match/student/${myId}/jobs`);
}

export async function applyToJob(jobId: number, super_Like: boolean): Promise<void> {
  let myId = getAuthData()?.userId;
  await fetchWithAuthJSON(`/api/applications/apply`, {
    method: "POST",
    body: {
      studentId: myId,
      jobPostingId: jobId,
      superLike: super_Like,
    },
  });
}


export async function getCompanyPostings(): Promise<JobPosting[]> {
  let myId = getAuthData()?.userId;
  return await fetchWithAuthJSON(`/api/job_postings/company/${myId}`);
}

export async function createJobPosting(job: JobPostingCreation): Promise<JobPosting> {
  return await fetchWithAuthJSON(`/api/job_postings`, {method: "POST", body: {...job, categoryIds: job.categories}});
}

export type Application = {
  id: number,
  student: {
    user: {email: string},
    keySkills: string,
  }
}

export async function applicationsByPosting(id: number): Promise<Application[]> {
  return await fetchWithAuthJSON(`/api/applications/${id}`);
}

export async function applicationsByPostingSuperLiked(id: number): Promise<Application[]> {
  return await fetchWithAuthJSON(`/api/applications/job-posting/${id}/applications/superliked`);
}

export async function applicationsByPostingRegular(id: number): Promise<Application[]> {
  return await fetchWithAuthJSON(`/api/applications/job-posting/${id}/applications/regular`);
}

export async function getUserDetails(userId: number): Promise<{ id: number, name: string }> {
  const token = getToken();
  const headers: HeadersInit = token ? { "Authorization": `Bearer ${token}` } : {};

  const response = await fetch(`${API_URL}/auth/users/${userId}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request to get user details failed with status ${response.status}: ${errorText}`);
  }

  return await response.json();
}

export function usePromise<R>(promise: () => Promise<R>, dependencies: readonly unknown[] = []): [boolean, R | null, Error | null] {
  let [result, setResult] = useState<R | null>(null);
  let [error, setError] = useState<Error | null>(null);
  let [done, setDone] = useState(false);
  useEffect(() => {
    setDone(false);
    setResult(null);
    setError(null);
    promise().then(r => {
      setResult(r);
      setDone(true);
    }).catch(e => {
      setError(e);
      setDone(true);
    });
  }, dependencies);
  return [done, result, error];
}

export type ChatMessage = {
  id?: number;
  senderId: number;
  receiverId: number;
  message: string;
  timestamp?: string;
};

export async function sendChatMessage(message: ChatMessage): Promise<ChatMessage> {
  return await fetchWithAuthJSON('/api/chat/send', {
    method: 'POST',
    body: message
  });
}

export async function getUserMessages(userId: number): Promise<ChatMessage[]> {
  return await fetchWithAuthJSON(`/api/chat/messages/${userId}`);
}


export async function getCategories(): Promise<any[]> {
  return await fetchWithAuthJSON(`/api/categories`);
}

export async function getPostingsByCategory(categoryId: number): Promise<JobPosting[]> {
  return await fetchWithAuthJSON(`/api/job_postings/category/${categoryId}`);
}

export type Category = {
  id: number,
  name: string,
};


export async function updateProfile(formData: FormData): Promise<void> {
  const token = getToken();
  const headers: HeadersInit = token ? { "Authorization": `Bearer ${token}` } : {};

  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request to update profile failed with status ${response.status}: ${errorText}`);
  }
}