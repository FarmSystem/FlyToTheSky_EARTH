"use client";

import React, { useEffect, useRef, useState } from "react";
import FooterBar from "../components/footer/footer-bar";
import CreditCardImage from "public/credit-card.png";
import tw, { css, styled } from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import congratulation from "public/congratulation.json";
import EllipseImage from "public/Ellipse.png";
import EthLogoImage from "public/eth-logo.png";
import UsdtLogoImage from "public/usdt-logo.png";
import BnbLogoImage from "public/bnb-logo.png";
import MaticLogoImage from "public/matic-logo.png";
import { useWalletAuth } from "../modules/wallet/hooks/useWalletAuth";
import { useWalletContext } from "../modules/wallet/hooks/useWalletContext";

interface Props {
  isSuccess: boolean;
}

export const MyPage = ({ isSuccess }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { wallet } = useWalletContext();
  const { nfcSerialNumber } = useWalletAuth();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const localStorageAddress = window.localStorage.getItem("walletAddress");
    const parsedAddress = JSON.parse(localStorageAddress || "{}");
    setWalletAddress(parsedAddress[nfcSerialNumber!] || wallet?.getAddress());
  }, [nfcSerialNumber, wallet]);
  /* function safeStringify(obj: any, spacer = 2): string {
    const seen = new WeakSet();

    return JSON.stringify(
      obj,
      (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[Circular]";
          }
          seen.add(value);
        }
        return value;
      },
      spacer
    );
  } */

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (!isSuccess) return;
    lottie.loadAnimation({
      container: wrapperRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: congratulation,
    });

    return () => {
      lottie.destroy();
    };
  }, [wrapperRef, isSuccess]);

  return (
    <>
      <Wrapper>
        <TopWrapper>
          <UserSummaryBox>
            <ServiceTitle>EARTH</ServiceTitle>
            <UserBalance>$1,235 USD</UserBalance>
            <AccountName>Account Name</AccountName>
            <AccountNumber>
              {walletAddress?.slice(0, 5)}...{walletAddress?.slice(-4)}
            </AccountNumber>
          </UserSummaryBox>
          <TokenWrapper>
            <TokenBox>
              <TokenTopBar1 />
              <TokenBoxTitle>Token Type</TokenBoxTitle>
              <TokenBoxContent>4</TokenBoxContent>
            </TokenBox>
            <TokenBox>
              <TokenTopBar2 />
              <TokenBoxTitle>Highest Token</TokenBoxTitle>
              <TokenBoxContent>ETH</TokenBoxContent>
            </TokenBox>
            <TokenBox>
              <TokenTopBar3 />
              <TokenBoxTitle>Lowest Token</TokenBoxTitle>
              <TokenBoxContent>MATIC</TokenBoxContent>
            </TokenBox>
          </TokenWrapper>
        </TopWrapper>
        <Ellipse src={EllipseImage} alt="credit-card-image" />
        <LottieWrapper ref={wrapperRef} />
        <BottomWrapper>
          <TokenBalanceWrapper>
            <TokenBalanceBox>
              <TokenImage src={EthLogoImage} alt="credit-card-image" />
              <TokenName>Ethereum</TokenName>
              <TokenBalanceBox2>
                <TokenBalance>0.39 ETH</TokenBalance>
                <ConvertTokenUSD>≈ 1,000 USD</ConvertTokenUSD>
              </TokenBalanceBox2>
            </TokenBalanceBox>
            <TokenBalanceBox>
              <TokenImage src={UsdtLogoImage} algitt="credit-card-image" />
              <TokenName>Tether</TokenName>
              <TokenBalanceBox2>
                <TokenBalance>149.98 USDT</TokenBalance>
                <ConvertTokenUSD>≈ 150 USD</ConvertTokenUSD>
              </TokenBalanceBox2>
            </TokenBalanceBox>
            <TokenBalanceBox>
              <TokenImage src={BnbLogoImage} alt="credit-card-image" />
              <TokenName>Binance</TokenName>
              <TokenBalanceBox2>
                <TokenBalance>0.19578 BNB</TokenBalance>
                <ConvertTokenUSD>≈ 60 USD</ConvertTokenUSD>
              </TokenBalanceBox2>
            </TokenBalanceBox>
            <TokenBalanceBox>
              <TokenImage src={MaticLogoImage} alt="credit-card-image" />
              <TokenName>Polygon</TokenName>
              <TokenBalanceBox2>
                <TokenBalance>27.73 MATIC</TokenBalance>
                <ConvertTokenUSD>≈ 25 USD</ConvertTokenUSD>
              </TokenBalanceBox2>
            </TokenBalanceBox>
          </TokenBalanceWrapper>
        </BottomWrapper>
      </Wrapper>

      <FooterBarBox>
        <FooterBar />
      </FooterBarBox>
    </>
  );
};

const Wrapper = styled.div(() => [
  tw`relative flex flex-col items-center flex-1 w-full h-full min-h-full overflow-y-auto `,
]);

const TopWrapper = styled.div(() => [
  tw`flex-col w-full bg-gray7 py-25`,
  css`
    border-radius: 0px 0px 24px 24px;
  `,
]);
const UserSummaryBox = tw.div`
    flex-center flex-col relative gap-20 pt-100
    `;

const Ellipse = tw(Image)`
    absolute top-0 w-350
    `;

const ServiceTitle = tw.div`
    font-sb-16 text-white
    `;

const UserBalance = tw.div`
    font-b-32 text-white
    `;

const AccountName = tw.div`
    font-sb-12 text-white
    `;

const AccountNumber = tw.div`
    font-sb-12 text-white px-12 py-8 rounded-16 bg-gray6
`;

const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;

const TokenWrapper = tw.div`
  flex-center gap-8 pt-44
  `;

const TokenBox = styled.div(() => [
  tw`relative flex-col py-16 text-center flex-center bg-gray8 rounded-10 px-18 w-104 h-68`,
  css`
    border-radius: 16px;
    border: 1px solid #cfcffc;
    background: rgba(78, 78, 97, 0.2);
    backdrop-filter: blur(5px);
  `,
]);

const TokenTopBar1 = tw.div`
  absolute w-46 h-1 bg-accent5 rounded-2 top-[-1px]
  `;

const TokenTopBar2 = tw.div`
  absolute w-46 h-1 bg-primary10 rounded-2 top-[-1px]
  `;
const TokenTopBar3 = tw.div`
  absolute w-46 h-1 bg-secondary5 rounded-2 top-[-1px]
  `;
const TokenBoxTitle = tw.div`
  w-104 font-sb-12 text-gray4
  `;
const TokenBoxContent = tw.div`
  font-sb-14 text-white
  `;

const BottomWrapper = styled.div(() => [tw`flex flex-col items-center w-full gap-10 `]);

const TokenBalanceWrapper = tw.div`
    flex flex-col items-center w-full h-full
    py-10 gap-12 pb-80
    overflow-y-auto 
    `;

const TokenBalanceBox = tw.div`
     flex flex-center px-12 py-12 gap-8 border-solid border-gray7 border-1
     rounded-16 w-328 h-64
    `;

const TokenImage = tw(Image)`
    w-40
    `;
const TokenName = tw.div`
    w-120 font-sb-16 text-white text-start
    `;

const TokenBalance = tw.div`
    w-150 font-sb-16 text-white text-end
    `;

const TokenBalanceBox2 = tw.div`
    flex flex-col items-center px-5 py-5 gap-4
    rounded-16 w-150 h-50 justify-between
`;

const ConvertTokenUSD = tw.div`
    w-150 font-sb-12 text-gray-300 text-end
    `;
