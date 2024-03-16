import axios from "axios";
import { inputField } from "../utilities/cli-inputs.js";
import message from "../utilities/message.js";
import storage from "../utilities/storage.js";
import url from "url";
import path from "path";
import * as fs from "fs";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "..");

export default class Authentication {
   static login = async (app) => {
      if (!fs.existsSync(root + "/config.js")) {
         try {
            const token = await inputField({ message: "Enter github token", name: "token" });
            if (token.value) {
               const { data } = await axios.get("https://api.github.com/user", {
                  headers: {
                     Authorization: `Bearer ${token.value}`,
                  },
               });
               storage({
                  path: root + "/config.js",
                  data: `const config = {
                      BASE_URL:'https://api.github.com/repos/riteshmyhub',
                      HEADERS:{
                        Authorization: "Bearer ${token?.value}",
                        ["X-GitHub-Api-Version"]: "2022-11-28",
                      },
                      USERNAME: "${data?.login}",
                  }; 
                  export default config;`
                     .trim()
                     .toString(),
               });
               app();
            }
         } catch (error) {
            message.bgError(error?.response?.data?.message || "login error");
            setTimeout(() => {
               process.stdout.write("\x1Bc");
            }, 2000);
         }
      } else {
         app();
      }
   };
}
