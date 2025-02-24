import Image from 'next/image'

const logoSize = 110

export default function Logo() {
  return (
    <div className="flex w-full justify-center">
      <Image
        src="/WildRiverLogo.svg"
        alt="hotel logo"
        width={logoSize}
        height={logoSize}
        className="rounded-full bg-white p-2 invert dark:invert-0"
        priority
      />
    </div>
  )
}
