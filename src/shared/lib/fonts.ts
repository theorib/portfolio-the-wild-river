import localFont from 'next/font/local'

/**
 * The following paths have to be relative to this file not the root of the project or src folder, or any other location.
 */
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
