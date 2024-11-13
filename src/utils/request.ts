// const DOMAIN = "http://localhost:3002/";
const DOMAIN = "http://127.0.0.1:8000/api/";

export const get = async (PATH: string) => {
  const response = await fetch(`${DOMAIN}${PATH}`);
  const result = await response.json();
  return result;
}

export const post = async (PATH: string, options: unknown) => {
  const response = await fetch(`${DOMAIN}${PATH}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  });
  const result = await response.json();
  return result;
}

export const patch = async (PATH: string, id: string | number, options: unknown) => {
  const response = await fetch(`${DOMAIN}${PATH}${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  });
  const result = await response.json();
  return result;
}

export const del = async (PATH: string, id: string | number) => {
  await fetch(`${DOMAIN}${PATH}${id}`, {
    method: "DELETE",
  });
};