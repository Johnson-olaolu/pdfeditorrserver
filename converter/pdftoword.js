module.exports = {
    PDFToWord: function (pathtofile) {
        const {Powerpoint, Word} = require('pdf-officegen')
        const wordConverter = new Word()
        wordConverter.convertFromPdf( [pathtofile],  (err, result) => {
            //Do something with the result (filepath to output) 
            if(err) { 
                //res.status(500).json({msg : "Error Converting File"})
                console.log(err)
                console.log("error")
            }else {
                console.log(result)
                console.log("successfull")
            }
          })        
    }
}