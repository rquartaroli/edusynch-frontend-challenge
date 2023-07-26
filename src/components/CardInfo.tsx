import Image from "next/image";

type CardInfoProps = {
  urlImage: string
  titleInfo: string
  title: string
  description: string
}

export function CardInfo({ urlImage, titleInfo, title, description }: CardInfoProps) {
  return (
    <div className="w-[200px] md:w-[280px] bg-white p-6 rounded-md shadow-md">
      <Image src={urlImage} width={64} height={64} alt={titleInfo} />
      <p className="label md:body text-primary-500 font-bold mt-4">
        {titleInfo}
      </p>
      <h4 className="h5 md:h4 text-text-base font-bold mt-1 mb-2">
        {title}
      </h4>
      <p className="paragraph text-text-base">
        {description}
      </p>
    </div>
  )
}