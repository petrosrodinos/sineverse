import { LoggedInUser } from "../interfaces/auth.interface";

const VISITOR_AUTH_STORAGE_KEY = "estatelift_visitor_auth";

export function getStoredVisitorAuth(): LoggedInUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(VISITOR_AUTH_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as LoggedInUser;
  } catch {
    window.localStorage.removeItem(VISITOR_AUTH_STORAGE_KEY);

    return null;
  }
}

export function setStoredVisitorAuth(auth: LoggedInUser): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(VISITOR_AUTH_STORAGE_KEY, JSON.stringify(auth));
}

export function clearStoredVisitorAuth(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(VISITOR_AUTH_STORAGE_KEY);
}
