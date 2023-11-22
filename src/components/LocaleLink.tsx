import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

export type Props = LinkProps & {
  children?: ReactNode;
  className?: string;
};

export default function LocaleLink({ children, href, ...props }: Props) {
  // const localeHref = `${locale === defaultLocale ? '' : '/' + locale}${href}`;
  // const localeHref = `/${locale}${href}`;
  const localeHref = href;

  return (
    <Link href={localeHref} {...props}>
      {children}
    </Link>
  );
}
