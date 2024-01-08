import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const petsCsv = new SharedArray('Pets', function () {
  return papaparse.parse(open('../data/pets.csv'), { header: true, skipEmptyLines: true }).data;
})

export const petData = ()=> ( {
    "id": petsCsv[Math.floor(Math.random() * petsCsv.length)].id,
    "category": {
      "id": petsCsv[Math.floor(Math.random() * petsCsv.length)].categoryId,
      "name": petsCsv[Math.floor(Math.random() * petsCsv.length)].categoryName
    },
    "name": petsCsv[Math.floor(Math.random() * petsCsv.length)].name,
    "photoUrls": [
      "teste"
    ],
    "tags": [
      {
        "id": "1",
        "name": "teste"
      }
    ],
    "status": "available"

  });
