import { ErrorBlock as AntErrorBlock, ErrorBlockProps } from 'antd-mobile';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

type Props = ErrorBlockProps & {
  error: Error;
  resetAction: () => void;
};

export default function ErrorBlock({ title, description, error, resetAction, ...props }: Props) {
  const { t } = useTranslation('common');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AntErrorBlock
      className="my-auto"
      image="/static/images/not-found.webp"
      title={title || t('Error.title')}
      description={
        description || (
          <>
            <Trans
              i18nKey="common:Error.description"
              components={[
                <p />,
                <button className="underline underline-offset-2" onClick={resetAction} type="button" />,
              ]}
            />
            <p className="text-red-60 mt-1">
              {error.name}: <code className="text-xs">{error.message}</code>
            </p>
          </>
        )
      }
      style={{
        '--image-height': '122px',
      }}
      {...props}
    />
  );
}
