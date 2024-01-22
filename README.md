### 😯개발 개요

NFC를 활용한 지갑과 로그인하는 시스템, 거래 생성과 승인을 위한 QR코드를 개발하였다. NFC 태깅과 QR코
드 모두 모바일 사용자에게 편리한 솔루션을 제공하고 있다는 장점을 이용해 이러한 기술들을 블록체인에
접목시켰다.

### 🧐개발 동기

NFC 블록체인 지갑을 만든 배경은 기존 지갑 시스템의 단점을 보완하고자 만들어졌다. 기존 지갑은 Trusted
Entity문제가 있고, 키 관리 서비스(KMS) 지갑도 비슷한 문제를 공유한다. 모바일 지갑은 일반적으로 앱설
치와 설정이 필요하며, 하드웨어 지갑은 비싸고 토큰 지원이 제한적이다. 따라서 해당 문제점들을 개선하고
자 근거리 무선 통신 카드 지갑(EARTH)를 개발하게 되었다.

### 🙂프로젝트 결과

이 시스템으로 NFC 카드를 사용한 오프라인 결제를 원활하게 하여 매장 내 구매와 오프라인 행사 참여를 더
욱 쉽게 해줄 수 있다. 또한 거래를 생성하고 승인하는 데 있어 QR 코드를 사용하여 사용자의 수작업을 줄
여 프로세스를 간소화했다. 이 기능은 실제 소매 구매, 오프라인 이벤트 및 QR 코드가 사용되는 다양한 상
황에서 매우 유용하다.

## ⚡기술 소개

주요 포인트는 NFC, QRCODE, Cometh SDK, Tableland, EIP 681이다.

1. Cometh는 처음 사용자가 web3를 적용하여 가스비 제로로 지갑을 쉽게 만들고 처리할 수 있도록 한다.
2. NFC 웹 api를 이용하여 NFC 태그를 하여 지갑을 생성하고 로그인한다.
3. qr 코드로 프로세서를 만들 때 해당 qr 이미지를 분산형 데이터베이스 테이블에 저장하여 해당 qr 트랜
   잭션을 저장한다.
4. 거래 요청을 QR코드로 변환해주는 EIP-681을 사용해 편의성을 높였다.

## ✅기술 스택

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/TailwindCss-06B6D4?style=for-the-badge&logo=TailwindCss&logoColor=white">
<img src="https://img.shields.io/badge/ethers.js-1B1BAD?style=for-the-badge&logo=ethers.js&logoColor=white">
<img src="https://img.shields.io/badge/NFC API-002E5F?style=for-the-badge&logo=NFC&logoColor=white">
<img src="https://img.shields.io/badge/Cometh-11116D?style=for-the-badge&logo=TypeSrcript&logoColor=white">
<img src="https://img.shields.io/badge/Tableland-000000?style=for-the-badge&logo=TypeSrcript&logoColor=white">

## 🚩Start

Set you Cometh API KEY in the following env var:

```
export NEXT_PUBLIC_COMETH_API_KEY=YOUR_API_KEY
```

After the successfull installation of the packages: `yarn dev`
