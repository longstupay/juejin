import { useLayoutEffect, useState } from 'react';
import type { buttonType } from '../utils/eleType';

/* eslint-disable-next-line */
export interface ButtonProps {
  children?: React.ReactNode;
  type?: (typeof buttonType)[number];
  as?: keyof JSX.IntrinsicElements;
}

export interface CustomButtonProps
  extends React.HTMLAttributes<HTMLOrSVGElement> {}

export function Button(props: ButtonProps) {
  const { type = 'primary', as } = props;
  const [cls, setCls] = useState<string>('');

  //with custom Tag
  const CustomButton: React.FC<CustomButtonProps> = ({ ...props }) => {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag {...props} />;
  };

  //封装一个函数根据type返回不同的样式
  const getClassName = (type: string) => {
    switch (type) {
      case 'primary':
        return 'px-2 py-3 bg-dk-primary text-white rounded-md';
      case 'secondary':
        return 'px-2 py-3 bg-dk-secondary text-white rounded-md';
      case 'nav':
        return 'px-2 py-3 bg-dk-nav rounded-md hover:bg-gray-200 hover:text-dk-primary cursor-pointer';
      case 'drop':
        return 'px-2 py-3 bg-dk-drop rounded-md hover:bg-gray-200 hover:text-dk-primary cursor-pointer';
      default:
        return '';
    }
  };

  const RenderButton = ({ children }: any) =>
    as ? (
      <CustomButton className={`${cls}`}>{children}</CustomButton>
    ) : (
      <button className={`${cls}`}>{children}</button>
    );

  //使用useLayoutEffect来获取className
  useLayoutEffect(() => {
    const className = getClassName(type);
    setCls(className);
  }, [type]);

  return <RenderButton>{props.children}</RenderButton>;
}

export default Button;
