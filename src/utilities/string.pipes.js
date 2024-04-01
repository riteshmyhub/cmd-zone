export default function stringPipe(str, type) {
   if (type === "t-t-l") {
      return str.toLowerCase();
   }
   if (type === "t-t-c") {
      if (str.includes("-")) {
         let x = "";
         str.split("-").forEach((letter, i) => {
            x += letter[0].toUpperCase() + letter.substring(1);
         });
         return x;
      } else {
         return str[0].toUpperCase() + str.substring(1);
      }
   }
   if (type === "t-t-u") {
      if (str.includes("-")) {
         return str.toUpperCase().replace(/-/g, "_");
      } else {
         return str.toUpperCase();
      }
   }
}
