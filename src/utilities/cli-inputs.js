import inquirer from "inquirer";

async function inputField(props) {
   try {
      let answer = await inquirer.prompt([{ type: "input", ...props }]);
      return { value: answer[props?.name] };
   } catch (error) {
      return { error };
   }
}
async function selectField(props) {
   try {
      let answer = await inquirer.prompt([{ type: "list", ...props }]);
      return { value: answer[props?.name] };
   } catch (error) {
      return { error };
   }
}

export { inputField, selectField };
