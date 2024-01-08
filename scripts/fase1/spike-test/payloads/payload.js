import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

export const petData = ()=> ( {
    "id": faker.random.number(),
    "category": {
      "id": faker.random.number(),
      "name": faker.name.firstName()
    },
    "name": faker.name.firstName(),
    "photoUrls": [
      faker.image.cats()
    ],
    "tags": [
      {
        "id": faker.random.number(),
        "name": faker.name.firstName()
      }
    ],
    "status": "available"

  });
