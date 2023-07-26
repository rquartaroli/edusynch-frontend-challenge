import Image from "next/image";
import * as Accordion from '@radix-ui/react-accordion';
import { CaretDown } from "@phosphor-icons/react";

type TrBodyCryptoProps = {
  urlImage: string
  cryptoValue: string
  cryptoInitialsValue: string
  priceValue: string
  changeValue: string
}

export function TrBodyCryptoForMobile({
  urlImage,
  cryptoValue,
  cryptoInitialsValue,
  priceValue,
  changeValue,
}: TrBodyCryptoProps) {
  return (
    <div className="table-row align-baseline border border-inherit even:bg-secondary-100/50 odd:bg-white">
      <Accordion.Root type="single" collapsible>
        <Accordion.Item className="overflow-hidden mt-[1px]" value="item-1">
          <Accordion.AccordionTrigger className="AccordionTrigger group">
            <div className="align-baseline w-full flex justify-between items-center p-4 text-text-base small-label">
              <div className="flex items-center">
                <Image className="mr-2" src={urlImage} width={24} height={24} alt={cryptoValue} />
                  {cryptoValue}&nbsp;
                <span className="text-secondary-500">{cryptoInitialsValue}</span>
              </div>
              <div>
                <CaretDown className="text-primary-300 group-data-[state=open]:rotate-180 duration-100" size={25} weight="bold" />
              </div>
            </div>
          </Accordion.AccordionTrigger>
          <Accordion.AccordionContent className="AccordionContent">
            <div className="align-baseline w-full flex justify-between items-center p-4">
              <h6 className="small-label text-secondary-500">
                Price
              </h6>
              <h6 className="label text-text-base">
                {priceValue}
              </h6>
            </div>
            <div className="align-baseline w-full flex justify-between items-center p-4">
              <h6 className="small-label text-secondary-500">
                Change
              </h6>
              <h6 className={changeValue[0] === '+' ? "label text-tertiary-700" : "label text-quartenary-700"}>
                {changeValue}
              </h6>
            </div>
          </Accordion.AccordionContent>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  )
}