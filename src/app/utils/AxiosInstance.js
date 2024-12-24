import axios from "axios";

// const apiBaseUrl = 'https://api.webmaxi.net/api/auth';
const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ApiCalls = axios.create({
  baseURL: apiBaseUrl,
  // You can add headers, timeout, and other configuration options here
  // headers: {
  //   'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  //   'Content-Type': 'application/json',
  // },
  // timeout: 10000, // Set a timeout of 10 seconds
});

export default ApiCalls;
