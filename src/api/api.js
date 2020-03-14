import axios from 'axios';
// import { setInterceptors } from './interceptors.js';

function createRequest() {
  const request = axios.create({
    baseURL: 'http://localhost:3000/navermap'
  });
  return request;
}

// function requestWithKeys() {
//   return setInterceptors(createRequest());
// }

const request = createRequest();

export function getPlaces(coord, count, boundary) {
  return request.get('/places', {
    params: { coord, count, boundary }
  });
}

export function getAddresses() {
  return request.get('/addresses');
}

export function getGc(query) {
  return request.get('/gc', {
    params: {
      query: query
    }
  });
}

// error.js 로 분리
export function errorProccessor(data) {
  const code = data.code;
  if (code === 101) {
    console.log(data.message);
    alert('주소를 입력하세요.');
  } else {
    console.log('unknown error');
    alert('알 수 없는 에러가 발생했습니다.');
  }
}
