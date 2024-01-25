
import { group  } from "k6";
import { ShouldCreatePetSuccess } from "./scenarios/v2/post-pet.js"

export const options = {
  scenarios: {
    PostApiV1Pet: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 20 }, //rump up
        { duration: '30s', target: 20 }, //carga constante
        { duration: '10s', target: 0 } //rump down
      ],
      exec: "PostPet"
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    checks: ['rate > 0.95'],
    http_req_duration: ['p(95) < 500']
  }
}

export function PostPet() {
    group('Endpoint POST: /api/v2/pet', () => {
      ShouldCreatePetSuccess();
    })
}