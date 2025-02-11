import SocialLoginBtn from '@/components/auth/SocialLoginBtn'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
export default function SocialLogins() {
  return (
    <div className="mt-8 flex w-full flex-col gap-4">
      <SocialLoginBtn>
        <FcGoogle />
        Google
      </SocialLoginBtn>
      <SocialLoginBtn>
        <FaGithub />
        <span>GitHub</span>
      </SocialLoginBtn>
    </div>
  )
}
