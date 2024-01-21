![nebula](https://github.com/ETHGlobal-Online-ChainWave/Nebula/assets/59263564/0d16fbd6-351b-4f98-8144-02c1dc33b6a1)

# EARTH Overview
https://youtu.be/BiPv0tLxyPM?si=PbNzWvl_Dlev0l_w

### 무엇을 개발하였나?
NFC를 활용한 지갑과 로그인하는 시스템, 거래 생성과 승인을 위한 QR코드를 개발하였다. NFC 태깅과 QR코드 모두 모바일 사용자에게 편리한 솔루션을 제공하고 있다는 장점을 이용해 이러한 기술들을 블록체인에 접목시켰다.

### 왜 개발하게 되었나?
근거리 무선 통신 카드 지갑을 만든 배경은 기존 지갑 시스템의 단점에서 비롯된다. 관리 지갑은 종종 신뢰할 수 있는 실체(Trusted Entity) 문제로 고통 받고, 키 관리 서비스(KMS) 지갑도 비슷한 문제를 공유한다. 모바일 지갑은 일반적으로 앱 설치와 설정이 필요하며, 하드웨어 지갑은 비싸고 토큰 지원이 제한적일 수 있다. 해당 문제점들을 개선하고자 근거리 무선 통신 카드 지갑(EARTH)를 개발하게 되었다.

### 어떻게 만들 수 있는가?
누구나 쉽게 구할 수 있는 NFC 신용카드나 직불카드를 사용하여 지갑을 만들 수 있다. 

### 어떤 장점이 있는가?
이 시스템은 NFC 카드를 사용한 오프라인 결제를 원활하게 하여 매장 내 구매와 오프라인 행사 참여를 더욱 쉽게 해준다. 또한 거래를 생성하고 승인하는 데 있어 QR 코드를 사용하여 사용자의 수작업을 줄여 프로세스를 간소화했다. 이 기능은 실제 소매 구매, 오프라인 이벤트 및 QR 코드가 사용되는 다양한 상황에서 매우 유용하다는 것을 입증할 수 있다.

## Introducing Our Tech
주요 포인트는 NFC, QRCODE, Cometh SDK, Tableland, EIP 681이다.
Cometh는 처음 사용자가 web3를 적용하여 가스비 제로로 지갑을 쉽게 만들고 처리할 수 있도록 한다.
NFC 웹 api를 이용하여 NFC 태그를 하여 지갑을 생성하고 로그인한다.
qr 코드로 프로세서를 만들 때 해당 qr 이미지를 분산형 데이터베이스 테이블에 저장하여 해당 qr 트랜잭션을 빼냈다.
거래 요청을 QR코드로 변환해주는 EIP-681을 사용해 편의성을 높였다.

## Tech Stack
- <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
- <img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white" />
- Typescript
- TailwindCss
- ethers.js
- Nfc API
- Cometh
- Tableland


## Start

Set you Cometh API KEY in the following env var:

```
export NEXT_PUBLIC_COMETH_API_KEY=YOUR_API_KEY
```

After the successfull installation of the packages: `yarn dev`
