const axios = require('axios');

const apiEndpoint = 'https://open.neis.go.kr/hub/acaInsTiInfo';
const apiKey = '16f8fe1d3f364560a8ec9551e5935f84';  // 실제로는 발급받은 인증키를 사용해야 합니다.

// API 요청에 필요한 매개변수를 설정합니다.
const defaultParams = {
  KEY: apiKey,
  Type: 'json',
  pIndex: 1,
  pSize: 100,
//   ACA_NM:'음악',
};

// 사용 예시
const requestParams = {
  ATPT_OFCDC_SC_CODE: 'B10',
  ADMST_ZONE_NM: '강서구',
};

    async function acaInsTiInfoData(params) {
        try {
          const response = await axios.get(apiEndpoint, { params: { ...defaultParams, ...params } });
      
          // 응답 데이터에서 acaInsTiInfo 배열과 row 배열이 있는지 확인
          if (response.data.acaInsTiInfo && response.data.acaInsTiInfo[1] && response.data.acaInsTiInfo[1].row) {
            // 필요한 정보 추출 및 가공
            const acaInsTiInfoData = response.data.acaInsTiInfo[1].row.map(data => {
              const academyInfo = {
                academyCode: Array.isArray(data.ACA_ASNUM) ? data.ACA_ASNUM[0] : data.ACA_ASNUM,
                academyName: Array.isArray(data.ACA_NM) ? data.ACA_NM[0] : data.ACA_NM,
                areaName: Array.isArray(data.ADMST_ZONE_NM) ? data.ADMST_ZONE_NM[0] : data.ADMST_ZONE_NM,
                academyType: Array.isArray(data.ACA_INSTI_SC_NM) ? data.ACA_INSTI_SC_NM[0] : data.ACA_INSTI_SC_NM,
                establishmentDate: Array.isArray(data.ESTBL_YMD) ? data.ESTBL_YMD[0] : data.ESTBL_YMD,
                registrationDate: Array.isArray(data.REG_YMD) ? data.REG_YMD[0] : data.REG_YMD,
                registrationStatus: Array.isArray(data.REG_STTUS_NM) ? data.REG_STTUS_NM[0] : data.REG_STTUS_NM,
                address: Array.isArray(data.FA_RDNMA) ? data.FA_RDNMA[0] : data.FA_RDNMA,
                telNumber: Array.isArray(data.FA_TELNO) ? data.FA_TELNO[0] : data.FA_TELNO,
                // 필요한 항목에 맞게 키를 사용하여 데이터 추출
              };
              return academyInfo;
            });
      
            return acaInsTiInfoData;
          } else {
            console.error('응답 데이터에 필요한 정보가 없습니다.');
            return [];
          }
        } catch (error) {
          console.error('API 요청에 실패했습니다.', error);
          throw error;
        }
      }
      

// 사용 예시
acaInsTiInfoData(requestParams)
  .then(acaInsTiInfoData => {
    console.log(acaInsTiInfoData);
  })
  .catch(error => {
    console.error('데이터를 가져오는 중에 오류가 발생했습니다.', error);
  });
