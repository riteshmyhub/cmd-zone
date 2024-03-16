import axios from "axios";
import { createSpinner } from "nanospinner";
import url from "url";
import * as fs from "fs";
import path from "path";

let __dirname = path.dirname(url.fileURLToPath(import.meta.url));
let root = path.join(__dirname, "..");

const http = {
   get: async (endpoint, callback) => {
      let spinner = createSpinner("please wait....").start();
      try {
         const config = await import("../config.js");
         const baseUrl = config.default.BASE_URL;
         const headers = config.default.HEADERS;

         const data = await axios.get(endpoint.startsWith("https://") ? endpoint : baseUrl + endpoint, {
            headers: headers,
         });
         spinner.success({ text: "done" });
         return data;
      } catch (error) {
         if (error?.response?.status === 401) {
            fs.unlinkSync(root + "/config.js");
         }
         spinner.error({
            text: `error : ${error?.response?.status} ${error?.response?.statusText}`,
         });
         process.exit();
      }
   },
};

export default http;
