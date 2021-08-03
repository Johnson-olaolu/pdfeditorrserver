

module.exports = {
    /**
    WordToPDF: function (pathtofile) {
        const libre = require('libreoffice-convert');
        const path = require('path');
        const fs = require('fs');

        const extend = '.docx'
        const enterPath = path.join(__dirname, "/uploads/Johnson Olaoluwa CV.pdf");
        const outputPath = path.join(__dirname, `/convert/example${extend}`);

        // Read file
        const file = fs.readFileSync(enterPath);
        // Convert it to pdf format with undefined filter (see Libreoffice doc about
        // filter)
        libre.convert(file, extend, undefined, (err, done) => {
            if (err) {
                console.log(`Error converting file: ${err}`);
            }

            // Here in done you have pdf file which you can save or transfer in another
            // stream
            fs.writeFileSync(outputPath, done);
        });
        console.log("convertToWord")
    }
     */
    WordToPDF: async function( input_path, output_path, name) {
        const { convertWordFiles } = require("convert-multiple-files");
        const path = require('path')
        //input.path.replace(/(\s+)/g, '\\$1')
        console.log({input_path, output_path})
        //input_path2 = path.resolve(input_path)
        //output_path2 = path.resolve(output_path)
        //console.log({input_path2, output_path2})
        const infoOutput = await convertWordFiles(input_path, 'pdf', output_path);
        //console.log(infoOutput);
        console.log("HTMLtoPDF")
    }
}