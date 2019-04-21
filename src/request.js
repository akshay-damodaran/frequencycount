import axios from 'axios';

const getApi = async (url, params, headers) => {
  const source = new URL(url);
  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key]) { source.searchParams.append(key, params[key]); }
    });
  }
  try {
    const response = await axios.get(source, { headers });
    return {
      isError: false,
      response,
    };
  } catch (e) {
    console.error('Error in api call', e);
    return {
      isError: true,
    };
  }
};

export default getApi;
