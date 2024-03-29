import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const petsCsv = new SharedArray('Pets', function () {
  return papaparse.parse(open('../data/pets.csv'), { header: true, skipEmptyLines: true }).data;
})

export const petData = (index)=> ( {
    "id": petsCsv[index].id,
    "category": {
      "id": petsCsv[index].categoryId,
      "name": petsCsv[index].categoryName
    },
    "name": petsCsv[index].name,
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