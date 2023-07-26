type TagProps = {
  nameTag: string
}

export function Tag({ nameTag }: TagProps) {
  return (
    <div className="bg-primary-100 py-1 px-4">
      <h5 className="small-label md:body xl:h5 text-primary-500">
        {nameTag}
      </h5>
    </div>
  )
}