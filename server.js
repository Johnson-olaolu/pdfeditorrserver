const express = require("express");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();
const app = express();

app.use(fileUpload());

//import external mosules

const { PDFToExcel } = require("./converter/pdftoexcel");
const { PDFToWord } = require("./converter/pdftoword");
const { PDFToPPT } = require("./converter/pdftoppt");
const { WordToPDF } = require("./converter/wordtopdf");
const { ExcelToPDF } = require("./converter/exceltopdf");
const { JPGtoPDF } = require("./converter/jpgtopdf");
const { HTMLtoPDF } = require("./converter/htmltopdf");
const { PPTtoPDF } = require("./converter/ppttopdf");
const { response } = require("express");

const port = process.env.PORT;
const api_key = process.env.API2PDF_KEY;
const server = process.env.API2PDF_SERVER;

app.get("/", (req, res) => {
  res.send("pdf editor server");
});

const location = __dirname + "/uploads";
const output_location = __dirname + "/convert";

app.post("/upload/pdftoword", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.files === null) {
    return res.status(400).json({ msg: "No file Uploaded" });
  } else {
    console.log(req);
    const file = req.files.file;
    file.mv(`${location}/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        PDFToWord(`${location}/${file.name}`);
        res.json({ filename: file.name, filepath: `${location}/${file.name}` });
      }
    });
  }
});

app.post("/upload/pdftoppt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.files === null) {
    return res.status(400).json({ msg: "No file Uploaded" });
  } else {
    const file = req.files.file;
    file.mv(`${location}/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        PDFToPPT(`${location}/${file.name}`);
        //res.json({filename : file.name, filepath : `${location}/${file.name}`})
      }
    });
  }
});

app.post("/upload/pdftoexcel", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.files === null) {
    return res.status(400).json({ msg: "No file Uploaded" });
  } else {
    const file = req.files.file;
    file.mv(`${location}/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        PDFToExcel(`${location}/${file.name}`);
        //res.json({filename : file.name, filepath : `${location}/${file.name}`})
      }
    });
  }
});

app.post("/upload/exceltopdf", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.files === null) {
    return res.status(400).json({ msg: "No file Uploaded" });
  } else {
    const file = req.files.file;
    file.mv(`${location}/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        ExcelToPDF(`${location}/${file.name}`);
        //res.json({filename : file.name, filepath : `${location}/${file.name}`})
      }
    });
  }
});

app.post("/upload/wordtopdf", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.files === null) {
    return res.status(400).json({ msg: "No file Uploaded" });
  } else {
    const file = req.files.file;

    file.mv(`${location}/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        //WordToPDF(`${location}/${file.name}`, `${output_location}`, "output_file")
        //res.json({filename : file.name, filepath : `${location}/${file.name}`})
        var name = `${file.name.substr(0, file.name.lastIndexOf("."))}.pdf`;
        console.log(name);
        var header = {
          Authorization: api_key,
        };
        var data = {
          url: `${process.env.APP_URL}/${location}/${file.name}`,
          inline: true,
          fileName: name,
          extraHTTPHeaders: {},
          useCustomStorage: false,
          storage: {
            method: "PUT",
            url: "https://presignedurl",
            extraHTTPHeaders: {},
          },
        };
        axios
          .post(`${server}/libreoffice/any-to-pdf`, data, { headers: header })
          .then((response) => {
            console.log(response);
            if (response.data.Success) {
              res
                .status(200)
                .json({ filename: name, filepath: response.data.FileUrl });
            } else {
              res.status(500).json({ error_msg: response.data.Error });
            }
          });
      }
    });
  }
});

app.post("/upload/ppttopdf", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.files === null) {
    return res.status(400).json({ msg: "No file Uploaded" });
  } else {
    const file = req.files.file;
    file.mv(`${location}/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        PPTtoPDF(`${location}/${file.name}`);
        //res.json({filename : file.name, filepath : `${location}/${file.name}`})
      }
    });
  }
});

app.post("/upload/jpgtopdf", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.files === null) {
    return res.status(400).json({ msg: "No file Uploaded" });
  } else {
    const file = req.files.file;
    file.mv(`${location}/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        JPGtoPDF(`${location}/${file.name}`);
        //res.json({filename : file.name, filepath : `${location}/${file.name}`})
      }
    });
  }
});

app.post("/upload/htmltopdf", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.files === null) {
    return res.status(400).json({ msg: "No file Uploaded" });
  } else {
    const file = req.files.file;
    file.mv(`${location}/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        HTMLtoPDF(`${location}/${file.name}`);
        //res.json({filename : file.name, filepath : `${location}/${file.name}`})
      }
    });
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
