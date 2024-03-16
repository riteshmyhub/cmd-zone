import chalk from "chalk";

const message = {
   //text
   textPrimary: (str) => console.log(chalk.hex("#007BFF").bold(str)),
   textSecondary: (str) => console.log(chalk.hex("#6C757D").bold(str)),
   textDone: (str) => console.log(chalk.hex("#28A745").bold(str)),
   textError: (str) => console.log(chalk.hex("#DC3545").bold(str)),
   textWarn: (str) => console.log(chalk.hex("#FFC107").bold(str)),
   //bg
   bgPrimary: (str) => console.log(chalk.bgHex("#007BFF").bold(str)),
   bgSecondary: (str) => console.log(chalk.bgHex("#6C757D").bold(str)),
   bgDone: (str) => console.log(chalk.bgHex("#28A745").bold(str)),
   bgError: (str) => console.log(chalk.bgHex("#DC3545").bold(str)),
   bgWarn: (str) => console.log(chalk.bgHex("#FFC107").bold(str)),
};

export default message;
