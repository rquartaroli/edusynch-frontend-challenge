import Image from "next/image";

type TrBodyCryptoProps = {
  indiceValue: string
  urlImage: string
  cryptoValue: string
  cryptoInitialsValue: string
  priceValue: string
  changeValue: string
  actionBuy: () => void
}

export function TrBodyCrypto({
  indiceValue,
  urlImage,
  cryptoValue,
  cryptoInitialsValue,
  priceValue,
  changeValue,
  actionBuy,
}: TrBodyCryptoProps) {
  return (
    <tr className="even:bg-secondary-100/50 odd:bg-white">
      <td className="text-end label text-secondary-500">
        {indiceValue}
      </td>
      <td className="flex items-center py-5 text-text-base body">
        <Image className="ml-10 xl:ml-[7.5rem] mr-4" src={urlImage} width={32} height={32} alt={cryptoValue} />
        {cryptoValue}&nbsp;
        <span className="text-secondary-500">{cryptoInitialsValue}</span>
      </td>
      <td className="text-text-base body">
        {priceValue}
      </td>
      <td className={changeValue[0] === '+' ? "text-tertiary-700 body" : "text-quartenary-700 body"}>
        {changeValue}
      </td>
      <td className="text-center">
        <button 
          className="btn-tertiary w-[80px] h-[32px] label py-2 px-4"
          onClick={actionBuy}
        >
          Buy
        </button>
      </td>
    </tr>
  )
}