type PriceInNewsProps = {
  cryptoInitialsValue: string
  price: string
  changeValue: string
}

export function PriceInNews({ cryptoInitialsValue, price, changeValue }: PriceInNewsProps) {
  return (
    <span className="small-label xl:label text-secondary-800 mr-6">
      {cryptoInitialsValue}
      <span className="ml-2 text-text-base">{price}</span>
      <span className={changeValue[0] === '+' ? "small-label xl:label text-tertiary-700 body ml-2" : "small-label xl:label text-quartenary-700 body ml-2"}>
        {changeValue}
      </span>
    </span>
  )
}