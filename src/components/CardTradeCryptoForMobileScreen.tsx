import Image from "next/image";
import * as Dialog from '@radix-ui/react-dialog'
import { ModalTransferCrypto } from "./ModalTransferCrypto";

type CardTradeCryptoForMobileScreenProps = {
  urlImage: string
  cryptoValue: string
  cryptoInitialsValue: string
  priceValue: string
  changeValue: string
  detailPrice: string
}

export function CardTradeCryptoForMobileScreen({
  urlImage,
  cryptoValue,
  cryptoInitialsValue,
  priceValue,
  changeValue,
  detailPrice,
}: CardTradeCryptoForMobileScreenProps) {
  return (
    <div className="flex flex-col rounded-md shadow-lg gap-4 overflow-hidden">
      <div className="bg-primary-100 flex justify-center items-center p-4 text-text-base small-label">
        <Image className="mr-2" src={urlImage} width={16} height={16} alt={cryptoValue} />
          {cryptoValue}&nbsp;
        <span className="text-secondary-500">{cryptoInitialsValue}</span>
      </div>

      <div className="flex flex-col justify-center px-4">
        <span className="small-label text-secondary-500">Holdings</span>
        <span className="small-label text-text-base">{priceValue}</span>
        <span className="small-label text-primary-400">{detailPrice}</span>
      </div>

      <hr className="fill-secondary-200 px-4" />

      <div className="flex flex-col justify-center px-4">
        <span className="small-label text-secondary-500">Change</span>
        <span className={`small-label ${changeValue[0] === '+' ? "text-tertiary-700" : "text-quartenary-700"}`}>{changeValue}</span>
      </div>

      <div className="px-4 mb-4">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="btn-primary w-24 h-6 label py-2">
              Trade
            </button>
          </Dialog.Trigger>

          <ModalTransferCrypto nameCryptoForFetch={cryptoValue} />
        </Dialog.Root>
      </div>
    </div>
  )
}