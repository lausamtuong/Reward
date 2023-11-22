import { cn } from '@ahm/common-helpers';
import { ComponentClass, createElement, forwardRef, FunctionComponent, HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: string | FunctionComponent<any> | ComponentClass<any, any>;
  children: ReactNode;
}

const Container = forwardRef<HTMLElement, Props>((props, ref) => {
  const { component: Component = 'div', children, className, ...rest } = props;

  return createElement(
    Component,
    {
      className: cn('mx-auto flex w-full max-w-7xl flex-col px-4 desktop:px-6', className),
      ref,
      ...rest,
    },
    children,
  );
});

Container.displayName = 'Container';

export default Container;
