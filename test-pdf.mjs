import * as pdfParse from "pdf-parse";

console.log("pdfParse:", pdfParse);
console.log("PDFParse:", pdfParse.PDFParse);
console.log("PDFParse prototype:", pdfParse.PDFParse.prototype);

const parser = new pdfParse.PDFParse();
console.log(
  "Parser methods:",
  Object.getOwnPropertyNames(pdfParse.PDFParse.prototype),
);
