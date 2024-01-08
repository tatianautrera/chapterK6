
import http from 'k6/http';
import { check, sleep } from 'k6';
import { petData } from './payloads/payload.js';
import {Counter} from 'k6/metrics'; //metrica de contador
import {Gauge} from 'k6/metrics'; //metrica de medidor
import {Rate} from 'k6/metrics'; //metrica de taxa
import {Trend} from 'k6/metrics'; //metrica de tendencia


const config = JSON.parse(open("./config/config.json"));
const calls = new Counter('total_calls');
const myGauge = new Gauge('time_bloqued');
const myRate = new Rate('tax_req_200');
const myTrend = new Trend('tax_req_waiting');

export const options = {
  stages:[
    {duration: '10s', target: 20}, //rump up
    {duration: '30s', target: 20}, //carga constante
    {duration: '10s', target: 0} //rump down
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
  calls.add(1);
  myGauge.add(response.timings.blocked);
  myRate.add(response.status === 200);
  myTrend.add(response.timings.waiting);

  check(response, {'return status 200': (res) => res.status === 200});
  check(response, { 'return less 1 second': (res) => res.timings.duration < 1000 })
  check(response, { 'return name pet': (res) => res.json().name == body.name })
  sleep(1);
};
