const shell = require("shelljs");
// 生成声明文件
shell.exec("tsc --declaration --noEmit false --emitDeclarationOnly --declarationDir ./types ./src/index", {
  silent: true
});