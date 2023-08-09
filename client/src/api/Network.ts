import url from "url";
import type { NetworkResponse } from "../../../src/types/Network";

const apiUrl = "http://127.0.0.1:8000";

export function post<T>(
  endpoint: string,
  body: any
): Promise<T | NetworkResponse> {
  return fetch(url.resolve(apiUrl, endpoint), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      return jsonData as T;
    })
    .catch((err) => {
      console.error(err);
      return { status: "critical", message: "A server error has occurred." };
    });
}
