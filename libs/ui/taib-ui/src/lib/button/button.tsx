import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
  useHover,
  useMenuTrigger,
} from 'react-aria';
import type { buttonType } from '../utils/eleType';
import React from 'react';

/* eslint-disable-next-line */
export interface ButtonProps extends AriaButtonProps {
  children?: React.ReactNode;
  variant?: (typeof buttonType)[number];
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  isPressed?: boolean;
}

export interface CustomButtonProps
  extends React.HTMLAttributes<HTMLOrSVGElement> {}

export const Button = forwardRef<any, ButtonProps>(
  ({ children, variant = 'primary', as, ...props }: ButtonProps, ref) => {
    const [cls, setCls] = useState<string>('');
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const { buttonProps, isPressed } = useButton(props, ref as any);
    const { focusProps, isFocusVisible } = useFocusRing();

    // hover hook
    const { hoverProps, isHovered } = useHover({
      onHoverStart: () => setShowMenu(true),
      onHoverEnd: () => setShowMenu(false),
    });

    //with custom Tag
    const CustomButton = (props: CustomButtonProps) => {
      const Tag = as as keyof JSX.IntrinsicElements;
      return <Tag {...props} />;
    };

    //封装一个函数根据variant返回不同的样式
    const getClassName = (variant: string) => {
      switch (variant) {
        case 'primary':
          return 'px-2 py-1 bg-dk-primary text-white rounded-md';
        case 'secondary':
          return 'px-2 py-1 bg-dk-secondary text-white rounded-md';
        case 'nav':
          return 'px-2 py-1 bg-dk-nav rounded-md hover:bg-gray-200 hover:text-dk-primary cursor-pointer';
        case 'drop':
          return 'px-2 py-1 bg-dk-drop rounded-md hover:bg-gray-200 hover:text-dk-primary cursor-pointer';
        case 'outline':
          return 'px-2 py-1 border border-gray-300 text-dk-primary rounded-md hover:bg-dk-primary hover:text-white cursor-pointer';
        default:
          return '';
      }
    };

    // const buttonRef = useRef(null);
    // useImperativeHandle(
    //   ref,
    //   () => ({
    //     current: buttonRef.current,
    //     isHovered,
    //     isPressed,
    //   }),
    //   []
    // );

    const RenderButton = ({ children }: any) =>
      as ? (
        <CustomButton className={`${cls}`}>
          <>
            {children}
            {variant === 'drop' && <RenderSvg />}
          </>
        </CustomButton>
      ) : (
        <button
          {...mergeProps(buttonProps, focusProps)}
          ref={ref}
          className={`${cls}`}
        >
          {children}
          {variant === 'drop' && <RenderSvg />}
        </button>
      );

    //使用useLayoutEffect来获取className
    useLayoutEffect(() => {
      const className = getClassName(variant);
      setCls(className);
    }, [variant]);

    return (
      <>
        <RenderButton>{children}</RenderButton>
      </>
    );
  }
);

function RenderSvg() {
  return (
    <svg
      className="w-4 h-4 inline-block ml-1"
      viewBox="0 0 1024 1024"
      data-aut-id="icon"
      fill="currentColor"
      p-id="1165"
    >
      <path
        d="M512 682.666667l-213.333333-213.333334h426.666666z"
        p-id="1166"
      ></path>
    </svg>
  );
}

export default Button;
