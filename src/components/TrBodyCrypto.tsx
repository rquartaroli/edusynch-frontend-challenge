import * as Dialog from '@radix-ui/react-dialog'
import * as HoverCard from '@radix-ui/react-hover-card';
import Image from "next/image";
import { ModalTransferCrypto } from './ModalTransferCrypto';

type TrBodyCryptoProps = {
  indiceValue: string
  urlImage: string
  cryptoValue: string
  cryptoInitialsValue: string
  priceValue: string
  changeValue: string
  actionBuy: () => void
  detailPrice?: string
}

export function TrBodyCrypto({
  indiceValue,
  urlImage,
  cryptoValue,
  cryptoInitialsValue,
  priceValue,
  changeValue,
  actionBuy,
  detailPrice,
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
      {detailPrice 
      ?
        <td className="text-text-base body">
          <div className="flex flex-col">
            {priceValue}
            <span className="small-label text-primary-500">
              {detailPrice}
            </span>
          </div>
        </td>
      :
        <td className="text-text-base body">
          {priceValue}
        </td>
      }
      
      <td className={`body ${changeValue[0] === '+' ? "text-tertiary-700" : "text-quartenary-700"}`}>
        {changeValue}
      </td>
      <td className="text-center">
        {detailPrice
        ?
        <Dialog.Root>
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <Dialog.Trigger asChild>
                <button id="btnTransfer">
                  <Image src="/transfer_icon.png" width={16} height={16} alt="transfer icon" />
                </button>
              </Dialog.Trigger>
            </HoverCard.Trigger>
            
            <HoverCard.Portal>
              <HoverCard.Content className="w-[100px] bg-primary-500 py-2 px-6 rounded shadow-lg" sideOffset={5}>
                  <h6 className="label text-white text-center">
                    Transfer Crypto
                  </h6>
                <HoverCard.Arrow className="fill-primary-500" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>

          <ModalTransferCrypto nameCryptoForFetch={cryptoValue} />
        </Dialog.Root>
        :
          <button 
            className="btn-tertiary w-[80px] h-[32px] label py-2 px-4"
            onClick={actionBuy}
          >
            Buy
          </button>
        }
      </td>
    </tr>
  )
}