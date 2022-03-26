<template>
  <!-- modal -->
  <div
    class="modal-overlay p-3 z-40 w-full h-screen font-lexend fixed overflow-auto bg-overlay"
    v-show="modal"
  >
    <div
      class="modal bg-gray-800 max-w-5xl p-3 mt-20 mx-auto rounded-md text-white"
    >
      <h2 class="text-white text-2xl font-bold">Headers ({{ headCount }})</h2>
      <button
        @click="addHead"
        class="bg-gray-800 rounded-md border hover:bg-gray-700 mt-5 border-gray-700 text-white py-3 px-5"
      >
        add key
      </button>
      <div
        v-for="item in head"
        :key="item.id"
        class="flex gap-4 mt-3 text-white"
      >
        <input
          v-model="item.key"
          placeholder="key"
          class="bg-gray-700 border rounded-md border-gray-600 w-full p-3"
        />
        <input
          v-model="item.value"
          placeholder="value"
          class="bg-gray-700 border rounded-md border-gray-600 w-full p-3"
        />
        <button
          @click="deleteHead(index)"
          class="bg-gray-800 border rounded-md hover:bg-gray-700 border-gray-700 py-3 px-5"
        >
          Delete
        </button>
      </div>
      <button
        @click="closeModalHead"
        class="bg-gray-800 hover:bg-gray-700 rounded-md border mt-5 border-gray-700 text-white py-3 px-5"
      >
        close
      </button>
    </div>
  </div>
  <!-- end modal -->

  <!-- modal preview -->
  <div
    class="modal-overlay z-40 w-full overflow-auto h-screen fixed font-lexend p-3 bg-overlay"
    v-show="prev"
  >
    <div
      class="modal bg-gray-800 p-3 max-w-7xl mt-10 mx-auto rounded-md text-white"
    >
      <h2 class="text-white text-2xl font-bold">Code from response</h2>

      <textarea
        name=""
        placeholder="no code here.."
        class="w-full border mt-5 h-80 border-gray-700 outline-none text-white bg-gray-900 p-3 box-border"
        id="getcode"
        cols="30"
        rows="10"
        readonly
      ></textarea>

      <button
        @click="this.prev = !this.prev"
        class="bg-gray-900 hover:bg-gray-700 rounded-md border mt-5 border-gray-700 text-white py-3 px-5"
      >
        close
      </button>
      <button
        id="download"
        class="bg-gray-900 hover:bg-gray-700 rounded-md border mt-5 ml-5 border-gray-700 text-white py-3 px-5"
      >
        Save as json
      </button>
    </div>
  </div>
  <!-- end -->

  <div class="home bg-gray-900 w-full h-screen font-lexend">
    <div class="tab bg-gray-800 w-full border-b-2 border-gray-800">
      <button
        class="bg-gray-800 text-white border py-3 px-5 border-transparent box-border rounded-tr-md rounded-br-md"
      >
        Untitled
      </button>
      <button
        class="bg-gray-900 text-white border py-3 px-5 border-l-2 border-gray-700 box-border"
      >
        New Tabs
      </button>
    </div>
    <div class="lg:container max-w-7xl mx-auto mt-5 p-2">
      <div class="input-box mt-7">
        <div class="flex flex-warp">
          <select
            name=""
            title="method"
            id="methods"
            class="bg-gray-800 focus:bg-gray-700 cursor-pointer border-gray-700 border outline-none p-3 w-32 rounded-tl-md rounded-bl-md text-white"
          >
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="put">PUT</option>
            <option value="patch">PATCH</option>
            <option value="delete">DELETE</option>
            <option value="copy">COPY</option>
            <option value="head">HEAD</option>
            <option value="options">OPTIONS</option>
            <option value="link">LINK</option>
            <option value="unlink">UNLINK</option>
            <option value="purge">PURGE</option>
            <option value="lock">LOCK</option>
            <option value="unlock">UNLOCK</option>
            <option value="profind">PROFIND</option>
            <option value="view">VIEW</option>
          </select>
          <input
            type="url"
            id="url"
            @keyup.enter="send"
            class="w-full focus:bg-gray-700 text-sm outline-none box-border p-3 border-gray-700 border text-gray-300 bg-gray-800"
            placeholder="Write request URL or Ctrl + V (Paste)"
          />
          <button
            @click="send"
            class="bg-blue-700 hover:bg-blue-800 py-3 px-5 text-white border border-blue-600 rounded-tr-md rounded-br-md"
          >
            SEND
          </button>
        </div>
        <button
          @click="this.modal = !this.modal"
          class="bg-gray-800 rounded-md border mt-5 hover:bg-gray-700 border-gray-700 text-white py-3 px-5"
        >
          Headers ({{ headCount }})
        </button>
        <button
          class="bg-gray-800 ml-3 rounded-md border mt-5 hover:bg-gray-700 border-gray-700 text-white py-3 px-5"
        >
          Auth type : no auth (default)
        </button>
        <button
          @click="addParam"
          class="bg-gray-800 ml-3 rounded-md border mt-5 hover:bg-gray-700 border-gray-700 text-white py-3 px-5"
        >
          Add Parameters
        </button>
        <div
          class="bg-gray-800 mt-3 text-white border border-gray-700 w-full p-3 box-border rounded-md"
        >
          <h2>
            Response :
            <span class="ml-3" id="response">no response</span>
          </h2>
        </div>
        <div class="lg:flex block gap-5 mt-5">
          <div class="w-full">
            <textarea
              name=""
              id="code"
              cols="30"
              rows=""
              class="border w-full focus:bg-gray-700 border-gray-700 outline-none text-white bg-gray-800 p-3 box-border resize-none h-52"
              placeholder="code json"
            ></textarea>
          </div>
          <div class="w-full">
            <textarea
              name=""
              id="apiresponse"
              cols="30"
              rows=""
              readonly
              class="w-full border lg:mt-0 mt-5 border-gray-700 outline-none text-white bg-gray-800 p-3 box-border resize-none h-52"
              placeholder="response api"
            ></textarea>
            <button class="text-gray-500 mt-3" @click="prevModal">
              View code
            </button>
          </div>
        </div>
      </div>
      <p class="mt-5 font-normal text-center text-gray-500 text-sm">
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
    data() {
      return {
        head: [
          {
            id: 1,
            key: "Content-Type",
            value: "application/json",
          },
          {
            id: 2,
            key: "Cookie",
            value: "csrf_cookie_name=ba307c0e680e2d7e652f6c78bedf3212",
          },
          {
            id: 3,
            key: "Accept",
            value: "*/*",
          },
          {
            id: 4,
            key: "X-Requested-With",
            value: "XMLHttpRequest",
          },
          //  'Cookie': 'csrf_cookie_name=ba307c0e680e2d7e652f6c78bedf3212'
        ],
        headCount: "",
        modal: false,
        prev: false,
      };
    },
    components: {},
    methods: {
      send: function () {
        var methods = document.querySelector("#methods").value;
        var urls = document.querySelector("#url").value;
        var datajson = document.querySelector("#code").value;
        var respon = document.querySelector("#response");
        var responapi = document.querySelector("#apiresponse");

        try {
          var textjson = JSON.parse(datajson);
        } catch (e) {}

        var config = {
          method: methods,
          url: urls,
          // headers: this.head.key + this.head.value,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: textjson,
        };

        axios(config)
          .then(function (response) {
            respon.innerHTML = response.status + " " + response.statusText;
            console.log(response.data);
            responapi.innerHTML = JSON.stringify(response.data, undefined, 4);
            // var notification = new Notification("ApiExecute", {
            //   body: response.status + " " + response.statusText,
            // });
          })
          .catch(function (error) {
            respon.innerHTML = error;
            // responapi.innerHTML = error;
            // var notification = new Notification("ApiExecute", {
            //   body: error,
            // });
          });
      },
      addHead: function () {
        this.head.push({
          key: "",
          value: "",
        });
        this.headCount = this.head.length;
      },
      prevModal: function () {
        this.prev = !this.prev;
        document.querySelector("#getcode").value =
          document.querySelector("#apiresponse").value;
      },
      addParam: function () {
        document.querySelector("#url").value =
          document.querySelector("#url").value + "?id=1";
      },
      closeModalHead: function () {
        this.modal = !this.modal;
        this.headCount = this.head.length;
      },
      deleteHead: function (index) {
        this.head.splice(index, 1);
        this.headCount = this.head.length;
      },
    },
    async mounted() {
      document.querySelector("#code").value = "{  }";
      this.headCount = this.head.length;
      // if (!("Notification" in window)) {
      //   alert("This browser does not support desktop notification");
      // }

      // // Let's check whether notification permissions have already been granted
      // else if (Notification.permission === "granted") {
      //   // If it's okay let's create a notification
      //   // var notification = new Notification("Hi there!");
      // }

      // // Otherwise, we need to ask the user for permission
      // else if (Notification.permission !== "denied") {
      //   Notification.requestPermission().then(function (permission) {
      //     // If the user accepts, let's create a notification
      //     if (permission === "granted") {
      //     }
      //   });
      // }

      document.getElementById("download").addEventListener("click", (e) => {
        var filename = prompt("Save to file json as? ");

        const content = document.querySelector("#getcode").value;

        if (filename && content) {
          downloadFile(filename + ".json", content);
        }
      });

      function downloadFile(filename, content) {
        const element = document.createElement("a");

        const blob = new Blob([content], { type: "plain/text" });

        const fileUrl = URL.createObjectURL(blob);

        element.setAttribute("href", fileUrl); //file location
        element.setAttribute("download", filename); // file name
        element.style.display = "none";

        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
      }
    },
  };
</script>
