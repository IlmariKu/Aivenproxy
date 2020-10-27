export function api_get(url) {
    const response = (async () => {
      const rawResponse = await fetch(url, {
        method: "GET"
      });
      return await rawResponse.json();
    })();
    return response
  }

  export function api_post(url, form) {
    const response = (async () => {
      const rawResponse = await fetch(url, {
        method: "POST",
        body: JSON.stringify(form),
      });
      return await rawResponse.json();
    })();
    return response
  }
