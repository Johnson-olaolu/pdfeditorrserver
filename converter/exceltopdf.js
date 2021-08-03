module.exports = {
    ExcelToPDF : async function( input_path, output_path, name) {
        const { convertWordFileToHTML } = require('convert-multiple-files') ;
        const infoOutput = await convertWordFileToHTML(input_path, output_path, name);
        console.log(infoOutput);
        console.log("HTMLtoPDF")
    }
}