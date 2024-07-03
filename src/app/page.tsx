import Image from 'next/image';
import landOfTheWind from 'public/img/land-of-the-wind.jpg';
export default function HomePage() {
  return (
    <>
      <h1 className="mb-4 font-raleway text-5xl">I am the home page</h1>
      <Image
        src={landOfTheWind}
        width={720}
        height={320}
        alt="land of the wind"
        className="object-cover object-center"
        sizes="50vw"
      />
      <button className="btn">Click Me</button>
    </>
  );
}
