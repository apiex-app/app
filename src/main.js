import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import VueProgressBar from "@aacassandra/vue3-progressbar";
import "./assets/tailwind.css";

const options = {
  color: "#bffaf3",
  failedColor: "#874b4b",
  thickness: "5px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

const app = createApp(App);
app.use(router);
app.use(VueProgressBar, options);
app.mount("#app");

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    app.config.globalProperties.$Progress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    app.config.globalProperties.$Progress.fail();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    app.config.globalProperties.$Progress.finish();
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    app.config.globalProperties.$Progress.fail();
    return Promise.reject(error);
  }
);
