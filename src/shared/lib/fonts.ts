import localFont from 'next/font/local'

export const objektiv = localFont({
  src: [
    {
      path: './fonts/ObjektivVF_Trial_Wght.ttf',
      style: 'normal',
    },
    {
      path: './fonts/ObjektivVF_Trial_WghtItal.ttf',
      style: 'italic',
    },
  ],
  fallback: ['sans-serif'],
  preload: true,

  weight: 'variable',
  variable: '--font-objektiv',
})
