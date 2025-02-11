import Image from 'next/image'

const logoSize = 110

export default function Logo() {
  return (
    <div className="flex w-full justify-center">
      <Image
        src="/logo.svg"
        alt="hotel logo"
        width={logoSize}
        height={logoSize}
        className=""
        priority
      />
    </div>
  )
}
