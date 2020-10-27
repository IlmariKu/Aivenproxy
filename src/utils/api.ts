export function api_get(url) {
    const response = (async () => {
      const rawResponse = await fetch(url, {
        method: "GET"
      });
      return await rawResponse.json();
    })();
    return response
  }
