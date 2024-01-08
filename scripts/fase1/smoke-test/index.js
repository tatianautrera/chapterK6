//inicialização
import http from 'k6/http';
import { check, sleep } from 'k6';
import { petData } from './payloads/payload.js';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

const config = JSON.parse(open("./config/config.json"));

//configuração
export const options = {
  vus: 3,
  duration: '1s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    checks: ['rate > 0.95'],
    http_req_duration: ['p(95) < 500']
}
};

//Execução
export default () => {

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
const body = petData();

  const url = `${config.baseUrl}/v2/pet`;
  const response = http.post(url,JSON.stringify(body), params);

  check(response, {'return status 200': (res) => res.status === 200});
  check(response, { 'return less 1 second': (res) => res.timings.duration < 1000 })
  check(response, { 'return name pet': (res) => res.json().name == body.name })

  //exemplo utilizando o chai.js
  expect(response.json().status).to.equal(body.status)

  sleep(1);
};
