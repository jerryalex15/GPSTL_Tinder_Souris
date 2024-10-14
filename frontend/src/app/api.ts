import { useEffect, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function getToken(): string | null {
  return typeof window !== "undefined" && window.localStorage.getItem("bearer") || null;
}

const API_URL = `http://${typeof window !== "undefined" ? window.location.hostname : "localhost"}:8080`;

async function fetchWithAuth(url: string, init: RequestInit = {}): Promise<Response> {
  let token = getToken();
  if (token === null) {
    throw new Error("No token");
  }
  let headers = init.headers || {};
  headers["Authorization"] = `Bearer ${token}`;
  let res = await fetch(API_URL + url, {...init, headers});
  if (res.status === 401) {
    window.localStorage.removeItem("bearer");
  }
  return res;
}

async function fetchTryWithAuth(url: string, init: RequestInit = {}): Promise<Response> {
  let token = getToken();
  let headers = init.headers || {};
  if (token !== null) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  let res = await fetch(API_URL + url, {...init, headers});
  if (token !== null && res.status === 401) {
    window.localStorage.removeItem("bearer");
  }
  return res;
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
      throw new Error(await res.text());
    }
    return res.json();
  }
}

const fetchWithAuthJSON = fetchJSON(fetchWithAuth);
const fetchTryWithAuthJSON = fetchJSON(fetchTryWithAuth);

export function logout(router: AppRouterInstance) {
  window.localStorage.removeItem("bearer");
  router.push("/");
}

export async function login(username: string, password: string): Promise<void> {
  let res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, password}),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  let token = await res.text();
  localStorage.setItem("bearer", token);
}

export async function register(username: string, email: string, password: string, role: "student"): Promise<void> {
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
}

export function usePromise<R>(promise: () => Promise<R>): [boolean, R | null, Error | null] {
  let [result, setResult] = useState<R | null>(null);
  let [error, setError] = useState<Error | null>(null);
  let [done, setDone] = useState(false);
  useEffect(() => {
    promise().then(r => {
      setResult(r);
      setDone(true);
    }).catch(e => {
      setError(e);
      setDone(true);
    });
  }, []);
  return [done, result, error];
}
