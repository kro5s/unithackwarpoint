#!/usr/bin/env node

console.log(Object.keys(require("./package.json").devDependencies).join(' '))
