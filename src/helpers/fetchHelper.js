export const fetchHelper = async (url, method, bodyData = '', token = '') => {
  let loading = true;

  loading = true;
  let options = {
    method: method,
  };
  if (method === 'PATCH') {
    options = {
      method: method,
      body: JSON.stringify(bodyData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else if (method == 'POST' || method == 'PUT') {
    options = {
      ...options,
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } else if (method === 'GET' && token) {
    options = {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  const response = await fetch(url, options);
  const data = await response.json();

  loading = false;

  return {
    data,
    loading,
  };
};
