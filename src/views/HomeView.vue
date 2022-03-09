<template>
  <div class="home bg-gray-900 w-full p-2 h-screen font-lexend">
    <div class="lg:container max-w-7xl mx-auto mt-5">
      <div class="input-box">
        <div class="flex flex-warp">
          <select
            name=""
            id="methods"
            class="bg-gray-800 focus:bg-gray-700 cursor-pointer border-gray-700 border outline-none p-3 w-32 rounded-tl-md rounded-bl-md text-white"
          >
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="put">PUT</option>
            <option value="patch">PATCH</option>
            <option value="delete">DELETE</option>
            <option value="copy">COPY</option>
          </select>
          <input
            type="url"
            id="url"
            class="w-full focus:bg-gray-700 text-sm outline-none box-border p-3 border-gray-700 border text-gray-300 bg-gray-800"
            placeholder="Write request URL or Ctrl + V (Paste)"
          />
          <button
            @click="send"
            class="bg-blue-700 py-3 px-5 text-white border border-blue-600 rounded-tr-md rounded-br-md"
          >
            SEND
          </button>
        </div>
        <button
          class="bg-gray-800 rounded-md border border mt-5 border-gray-700 text-white py-3 px-5"
        >
          Setting Header
        </button>
        <div
          class="bg-gray-800 mt-3 text-white border border-gray-700 w-full p-3 box-border rounded-md"
        >
          <h2>
            Response Message :
            <span class="ml-3" id="response">no response</span>
          </h2>
        </div>
        <div class="flex gap-5 mt-5">
          <textarea
            name=""
            id="code"
            cols="30"
            rows=""
            class="w-full border focus:bg-gray-700 border-gray-700 outline-none text-white bg-gray-800 p-3 box-border resize-none h-52"
            placeholder="code json"
          >
{
 
}
</textarea
          >
          <textarea
            name=""
            id="apiresponse"
            cols="30"
            rows=""
            readonly
            class="w-full border border-gray-700 outline-none text-white bg-gray-800 p-3 box-border resize-none h-52"
            placeholder="response api"
          ></textarea>
        </div>
      </div>
      <p class="mt-5 font-normal text-gray-500 text-sm">
        Created by Mohammad Sahrullah
      </p>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import axios from "axios";
  export default {
    name: "HomeView",
    components: {},
    methods: {
      send: function () {
        var methods = document.querySelector("#methods").value;
        var urls = document.querySelector("#url").value;
        var datajson = document.querySelector("#code").value;
        var respon = document.querySelector("#response");
        var responapi = document.querySelector("#apiresponse");
        var textjson = JSON.parse(datajson);
        var config = {
          method: methods,
          url: urls,
          headers: {
            Accept: "application/json",
          },
          data: textjson,
        };

        axios(config)
          .then(function (response) {
            respon.innerHTML = response.status + " " + response.statusText;
            console.log(response);
            responapi.innerHTML = JSON.stringify(response.data, undefined, 4);
            var notification = new Notification("ApiExecute", {
              body: response.status + " " + response.statusText,
            });
          })
          .catch(function (error) {
            console.log(error);
            respon.innerHTML = error;
            responapi.innerHTML = error;
            var notification = new Notification("ApiExecute", {
              body: error,
            });
          });
      },
    },
    async mounted() {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        // var notification = new Notification("Hi there!");
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
          }
        });
      }
    },
  };
</script>
