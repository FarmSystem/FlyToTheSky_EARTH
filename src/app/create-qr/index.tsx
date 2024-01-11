"use client";

import React, { useEffect, useRef, useState } from "react";
import FooterBar from "../components/footer/footer-bar";
import tw, { css, styled } from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import congratulation from "public/congratulation.json";
import { Database } from "@tableland/sdk";
import { useWalletAuth } from "../modules/wallet/hooks/useWalletAuth";
import { Wallet, getDefaultProvider } from "ethers";
import { useWalletContext } from "../modules/wallet/hooks/useWalletContext";

interface Props {
  isSuccess: boolean;
}

export const CreateTransaction = ({ isSuccess }: Props) => {
  const { wallet } = useWalletContext();
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const warpperRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isFinishClicked, setIsFinishClicked] = useState(false);

  const walletAddress = wallet?.getAddress();

  useEffect(() => {
    if (!warpperRef.current) return;
    if (!isSuccess) return;
    lottie.loadAnimation({
      container: warpperRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: congratulation,
    });

    return () => {
      lottie.destroy();
    };
  }, [warpperRef, isSuccess]);

  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

  const walletad = privateKey ? new Wallet(privateKey) : null;
  const provider = getDefaultProvider(`https://polygon-mumbai.g.alchemy.com/v2/${alchemyKey}`);
  const signer = walletad ? walletad.connect(provider) : null;
  const db = new Database({ signer: signer ?? undefined });

  const tableName: string = "nebula_80001_8010";
  const str = "hello world";
  const blob = new Blob(["type1", "type2"], {
    type: "text/plain",
  });

  const handleAmountClick = () => {
  setIsEditing(true);
  };

  const writeOnTable = async () => {
    const { meta: insert } = await db
      .prepare(`INSERT INTO ${tableName} (test_text) VALUES (?);`)
      .bind("test2", amount)
      .run();

    // Wait for transaction finality
    await insert.txn?.wait();

    // Perform a read query, requesting all rows from the table
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
  };
  const [gasFee, setGasFee] = useState(0);

  const handleAmountBlur = () => {setGasFee(21000);};

  const getCurrentDate = () => {
    const today = new Date();
  const year = String(today.getFullYear()).slice(-2); 
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0"); 
    return `${year}/${month}/${day}`;
  };

  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [isTokenSelected, setIsTokenSelected] = useState(false);

  const handleSelectClick = () => {
  setIsSelectBoxOpen(true);
  setIsTokenSelected(true); };

  const handleSelectBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  setIsSelectBoxOpen(false);};

  const handleSaveClick = () => {
    setIsSaveClicked(true);
    setIsFinishClicked(true);
  };

   let qrCodeImageSrc = "/qr-code 2.png";

   if (isSaveClicked) {
    const reWei = amount * 1e18;
    const eip681Url = `ethereum:${wallet}?value=${reWei}&gas=50000`;
    qrCodeImageSrc = `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${encodeURIComponent(eip681Url)}`;
  }
  useEffect(() => {
    if (isSuccess) {
      setCurrentDate(getCurrentDate());
    }
  }, [isSuccess]);

  return (
    <>
    {isSelectBoxOpen && (
        <SelectBox onClick={handleSelectBoxClick}>
          <CustomContent/></SelectBox>
      )}
      <Wrapper>
        <button onClick={writeOnTable}>Write on table</button>
        <QrWrapper>
          <QrTitle>Create Qr Code</QrTitle>
          {isSaveClicked ? (
          <img src={qrCodeImageSrc} alt="qr-code-image" width={200} height={200} />) 
          : (<img src="/qr-code 2.png" alt="qr-code-image" width={200} height={200} />)}
          <Qrpreview>QR Preview</Qrpreview>
        </QrWrapper>
        <BolderBox>
          <LeftCircle />
          <DotBolder />
          <RightCircle />
        </BolderBox>
        <TransactionWrapper>
          <TransactionBox>
            <TransactionContentBox>
              <TransactionTitle>Name</TransactionTitle>
              <TransactionContent>{walletAddress?.slice(0, 5)}...{walletAddress?.slice(-4)}{/*{walletAddress}*/}</TransactionContent>
            </TransactionContentBox>
            <TransactionContentBox>
              <TransactionTitle>Date</TransactionTitle>
              <TransactionContent>{currentDate}</TransactionContent>
            </TransactionContentBox>
            <TransactionContentBox>
            <TransactionTitle>Token</TransactionTitle>
             {isTokenSelected ? (
              <div>Ethereum</div>
                ) : (<div onClick={handleSelectClick}>Select</div>)}
            </TransactionContentBox>
            <TransactionContentBox>
            <TransactionTitle>Amount</TransactionTitle>
            {isEditing ? (
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              onBlur={handleAmountBlur} // amount 입력이 완료될 때 gasFee를 업데이트
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                textAlign: 'right',
                width: '50px'
              }}
            />) : (<div onClick={handleAmountClick}>{amount}</div>)}
            </TransactionContentBox>
            <TransactionContentBox>
              <TransactionTitle>Gas Fee limit</TransactionTitle>
              <TransactionContent>{gasFee}</TransactionContent>
            </TransactionContentBox>
            <TransactionContentBox>
              <TransactionTitle>Validity</TransactionTitle>
              <TransactionContent>1hour</TransactionContent>
            </TransactionContentBox>
          </TransactionBox>
          <SaveBox onClick={handleSaveClick}>
            {isFinishClicked ? (
          <SaveText>Contract Issuance</SaveText>
          ) : (
          <SaveText>Save</SaveText>
          )}
          </SaveBox>
        </TransactionWrapper>
      </Wrapper>
      <FooterBarBox>
        <FooterBar />
      </FooterBarBox>
    </>
  );
};

const Wrapper = styled.div(() => [
  tw`
    flex flex-col h-full
    items-center justify-center 
    overflow-y-auto mt-24
`,
]);

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;

const QrWrapper = tw.div`
  flex-center flex-col w-328 h-300 h-1/2 bg-gray7
  rounded-t-20 gap-27
`;

const QrTitle = tw.div`
  font-r-16 text-gray3
`;

const Qrpreview = tw.div`
  font-sb-14 text-white
`;

const QrImage = tw(Image)`
  w-200
`;

const BolderBox = tw.div`
  flex relative
`;

const DotBolder = tw.div`
 flex w-328 border-dotted border-b-2 border-gray7
`;

const LeftCircle = tw.div`
  absolute top-[-6px] left-[-8px] w-16 h-16 rounded-full bg-gray8
`;

const RightCircle = tw.div`
absolute top-[-6px] right-[-8px] w-16 h-16 rounded-full bg-gray8
`;

const TransactionWrapper = tw.div`
  flex-center flex-col  h-400 rounded-b-20
  bg-[#282833] w-328 p-24
`;

const TransactionContentBox = tw.div`
  flex-center justify-between  w-full h-full
  gap-20 p-6
`;

const TransactionBox = styled.div(() => [
  tw`
    flex-center flex-col w-full h-320
    bg-gray2 rounded-20 py-16 px-20
`,
  css`
    border-radius: 16px;
    border: 1px solid #cfcffc5c;
    background: rgba(78, 78, 97, 0.2);
    backdrop-filter: blur(5px);
  `,
]);

const SaveBox = styled.div(() => [
  tw`
    flex-center flex-col w-full h-50
    bg-gray2 rounded-20 py-16 px-20
`,
  css`
    border-radius: 30px;
    border: 1px solid #cfcffc5c;
    background: rgba(78, 78, 97, 0.2);
    backdrop-filter: blur(5px);
    margin-top: 35px;
    position: relative;
  `,
]);

const SaveText = tw.div`
  text-white font-bold
`;

const TransactionTitle = tw.div`
  font-sb-14 text-white
`;

const TransactionContent = tw.div`
  font-r-12 text-gray3
`;

const SelectBox = styled.div(() => [
  tw`
    flex-center flex-col
    bg-gray2 rounded-20 py-16 px-20
`,
  css`
    width: 300px;
    height: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 30px;
    border: 1px solid #cfcffc5c;
    background: rgba(78, 78, 97, 0.2);
    backdrop-filter: blur(5px);
    z-index: 10;
  `,
]);

const CustomContent = () => {
  return (
    <div>
      <img src="/root.png" alt="image"/>
    </div>
  );
};
