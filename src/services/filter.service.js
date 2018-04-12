const FILTER_BASE_URI = 'http://www.mocky.io/v2';
const FILTER_MOCK_ID = '5a25fade2e0000213aa90776';

const getFilterService = () => {
  const url = `${FILTER_BASE_URI}/${FILTER_MOCK_ID}`;

  return window.fetch(url, {
    method: 'GET'
  }).then((res) =>{
    if (!res.ok) {
      throw res;
    }

    return res.json();
  });
};

export default getFilterService;