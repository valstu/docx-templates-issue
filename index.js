// Run `node index.js` in the terminal
import createReport from 'docx-templates';
import fs from 'fs';

const template = fs.readFileSync('myTemplate.docx');

const buffer = await createReport({
  template,
  data: {
    name: 'John',
    surname: 'Appleseed',
  },
  additionalJsContext: {
    getImage: async url => {
      const dataUrl = createQrImage(url, { size: 500 });
      const res = await fetch(url);
      const data = await res.arrayBuffer();
      const contentType = res.headers.get('content-type')
      const fileType = contentType.split('/')[1];
      return { width: 10, height: 10, data, extension: `.${fileType}` };
    },
  }
});

fs.writeFileSync('report.docx', buffer)
console.log(`Hello Node.js v${process.versions.node}!`);

const doc = await