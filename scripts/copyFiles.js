const fs = require('fs');

const argvs = process.argv;
if (argvs.length < 4) {
  console.log('Parameters are not enough.');
  console.log('node copyFiles [destinationFolder] [file1] [file2]...');
  return;
}

const destFolder = argvs[2];
argvs.forEach(function (filePath, ind) {
  if (ind < 3) return;

  fs.createReadStream(filePath).pipe(fs.createWriteStream(`${destFolder}${filePath}`));
});
