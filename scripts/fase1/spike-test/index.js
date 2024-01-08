
import http from 'k6/http';
import { check, sleep } from 'k6';
import { petData } from './payloads/payload.js';

const config = JSON.parse(open("./config/config.json"));


export const options = {
  stages:[
    {duration: '5s', target: 20},
    {duration: '10s', target: 20},
    {duration: '1s', target: 100},
    {duration: '10s', target: 100},
    {duration: '1s', target: 20},
    {duration: '10s', target: 20},
    {duration: '5s', target: 0},

  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    checks: ['rate > 0.95'],
    http_req_duration: ['p(95) < 500']
}
};

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
  sleep(1);
};
