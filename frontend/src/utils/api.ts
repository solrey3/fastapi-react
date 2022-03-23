export const getMessage = async () => {
  
  const response = await fetch('/api/v1');

  const data = await response.json();

  if (data.message) {
    return data.message;
  }

  return Promise.reject('Failed to get message from backend');
};

/**
 * Calculate latest Health Factor for user aka wallet address
 *
 * @param user
 * @returns JSON data containing access token on success
 * @throws Error on http errors or failed attempts
 */
export const getHealthFactorLatest = async (user: string) => {
  // Assert user is not empty
  if (!(user.length > 0)) {
    throw new Error('User was not provided');
  }

  const token = localStorage.getItem('token');

  const requestOptions = {
    method: "GET",
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    // body: formData,
  };

  const response = await fetch(`/api/v1/healthfactor_latest?user=${user}`, requestOptions);
  // const response = await fetch('/api/v1/healthfactor_latest', requestOptions);

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }

  return data;
};

/**
 * Calculate Total Borrow Latest user aka wallet address
 *
 * @param user
 * @returns JSON data containing access token on success
 * @throws Error on http errors or failed attempts
 */
 export const getTotalBorrowLatest = async (user: string) => {
  // Assert user is not empty
  if (!(user.length > 0)) {
    throw new Error('User was not provided');
  }

  const token = localStorage.getItem('token');

  const requestOptions = {
    method: "GET",
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    // body: formData,
  };

  const response = await fetch(`/api/v1/totalborrow_latest?user=${user}`, requestOptions);
  // const response = await fetch('/api/v1/totalborrow_latest', requestOptions);

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }

  return data;
};

/**
 * Calculate Total Borrow Latest user aka wallet address
 *
 * @param user
 * @returns JSON data containing access token on success
 * @throws Error on http errors or failed attempts
 */
 export const getTotalCollateralLatest = async (user: string) => {
  // Assert user is not empty
  if (!(user.length > 0)) {
    throw new Error('User was not provided');
  }

  const token = localStorage.getItem('token');

  const requestOptions = {
    method: "GET",
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    // body: formData,
  };

  const response = await fetch(`/api/v1/totalcollateral_latest?user=${user}`, requestOptions);
  // const response = await fetch('/api/v1/totalcollateral_latest', requestOptions);

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }

  return data;
};

