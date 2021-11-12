const {
  createWorker
} = require('tesseract.js');
const path = require('path');

const worker = createWorker({
  langPath: path.join(__dirname, '..', 'lang-data'),
  // logger: m => console.log(m),
});

(async () => {
  await worker.load();
  await worker.loadLanguage('chi_sim');
  await worker.initialize('chi_sim');
  const {
    data: {
      text
    }
  } = await worker.recognize(path.join(__dirname, '..', 'images', 'test.png'));
  console.log(text);
  // const { data } = await worker.getPDF('Tesseract OCR Result');
  // fs.writeFileSync('tesseract-ocr-result.pdf', Buffer.from(data));
  // console.log('Generate PDF: tesseract-ocr-result.pdf');
  await worker.terminate();
})();

// http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
// gswin64c -dSAFER -dBATCH -dNOPAUSE -sDEVICE=jpeg -o -dGraphicsAlphaBits=4 -r200 -sOutputFile=python100_%2d.jpg python100.pdf
//gswin64c -dSAFER -dBATCH -dNOPAUSE -sDEVICE=pnggray -o -dGraphicsAlphaBits=4 -r300 -sOutputFile=python100_%2d.png -dFirstPage=0 -dLastPage=2 python100.pdf

// node --max_old_space_size=8192
// cnpm run start --max_old_space_size=8192