import axios from "axios";
const token = sessionStorage.getItem("token");
export const getDataAPI = async (url) => {
  const token = sessionStorage.getItem("token");

  const res = await axios.get(`${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.post(`${url}`, JSON.stringify(post), {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    console.log(error.response); // this is the main part. Use the response property from the error object

    return error.response;
  }
};

export const putDataAPI = async (url, post) => {
  const token = sessionStorage.getItem("token");
  const res = await axios.put(`${url}`, JSON.stringify(post), {
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post) => {
  const res = await axios.patch(`${url}`, post, {
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, post) => {
  const res = await axios.delete(`${url}`, post, {
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  return res;
};

export const getDataAPIPASSId = async (url, post) => {
  const token = sessionStorage.getItem("token");
  const res = await axios.get(
    `${url}`,
    {
      params: JSON.stringify(post),
    },
    {
      headers: { Authorization: token },
    }
  );
  return res;
};

export const POSTDataAPIPASSId = async (url, post) => {
  const token = sessionStorage.getItem("token");
  const res = await axios.post(`${url}`, JSON.stringify(post), {
    headers: { "Content-Type": "application/json", Authorization: token },
    params: post,
  });
  return res;
};

export const postDataAPIPIC = async (url) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.post(`${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    console.log(error.response); // this is the main part. Use the response property from the error object

    return error.response;
  }
};

export const DownloaGetAPI = async (url) => {
  const token = sessionStorage.getItem("token");

  const res = await axios.get(`${url}`, {
    headers: { Authorization: token },
    responseType: "blob",
  });
  return res;
};
