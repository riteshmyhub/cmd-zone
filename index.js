#! /usr/bin/env node
import Authentication from "./src/authentication/authentication.js";
import http from "./src/http.js";
import { inputField, selectField } from "./src/utilities/cli-inputs.js";
import stringPipe from "./src/utilities/string.pipes.js";
import fs from "fs";

export default class App {
   constructor() {}

   validate = async (input) => {
      if (input.match(/^[a-z\-]+$/)) {
         return true;
      } else {
         return "input must be like example : foo or foo-bar";
      }
   };

   download = async (downloadUrl, fileName, inputName) => {
      try {
         let { data: code } = await http.get(downloadUrl);
         // replace to placeholder from fileName in inputName
         fileName = fileName.replace("[placeholder]", stringPipe(inputName, "t-t-l"));
         fileName = fileName.replace("[PlaceHolder]", stringPipe(inputName, "t-t-c"));
         fileName = fileName.replace("[PLACEHOLDER]", stringPipe(inputName, "t-t-u"));

         // replace to placeholder from file content in inputName
         code = code.replace(/placeholder/g, stringPipe(inputName, "t-t-l"));
         code = code.replace(/PlaceHolder/g, stringPipe(inputName, "t-t-c"));
         code = code.replace(/PLACEHOLDER/g, stringPipe(inputName, "t-t-u"));

         let dirPath = process.cwd() + "/" + inputName;
         if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
         }
         if (fs.existsSync(dirPath)) {
            fs.createWriteStream(dirPath + "/" + fileName);
            fs.appendFile(dirPath + "/" + fileName, code, (error, data) => {
               if (data) {
                  message.done(`${fileName} download`);
               }
               if (error) {
                  console.log(error);
               }
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   start = async () => {
      const endpoint = "/cli-code/contents/create";
      // get framework
      const res = await http.get(endpoint);
      const { value: framework } = await selectField({
         message: "please select framework",
         name: "framework",
         choices: res.data.map((m) => m?.type === "dir" && m.name),
      });
      if (framework) {
         const res = await http.get(endpoint + "/" + framework);
         const { value: element } = await selectField({
            message: `what are your action type in ${framework}?`,
            name: "actionType",
            choices: res.data.map((m) => m?.type === "dir" && m.name),
         });
         //element
         if (element) {
            const { value: name } = await inputField({
               message: `enter ${element} name?`,
               name: "name",
               validate: this.validate,
            });
            if (name) {
               const res = await http.get(endpoint + "/" + framework + "/" + element);
               res.data?.forEach((item) => {
                  this.download(item?.download_url, item?.name, name);
               });
            }
         }
      }
   };
}

Authentication.login(new App().start);
