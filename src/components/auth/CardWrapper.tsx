import AuthLink from '@/components/auth/AuthLink';
import CardHeading from '@/components/auth/CardHeader';
import SocialLogins from '@/components/auth/SocialLogins';
import Logo from '@/components/layout/Logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel?: string;
  redirectLinkLabel?: string;
  redirectLinkHref?: string;
  showSocialLogins?: boolean;
};
export default function CardWrapper({
  children,
  headerLabel = '',
  redirectLinkLabel = '',
  redirectLinkHref = '',
  showSocialLogins = false,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Logo />
        <CardHeading label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-center">
        <AuthLink href={redirectLinkHref} label={redirectLinkLabel} />
      </CardFooter>
      {showSocialLogins ? (
        <CardFooter className="flex justify-between">
          <SocialLogins />
        </CardFooter>
      ) : null}
    </Card>
  );
}
