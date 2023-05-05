/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from 'react';
import type { AriaMenuProps } from 'react-aria';
import {
  MenuTriggerProps,
  TreeState,
  useMenuTriggerState,
  useTreeState,
} from 'react-stately';
import {
  useMenu,
  useMenuItem,
  useMenuSection,
  useMenuTrigger,
  useSeparator,
} from 'react-aria';
import Button from './button';
import Popover from '../popover/popover';
import type { buttonType } from '../utils/eleType';

interface MenuButtonProps<T extends object>
  extends AriaMenuProps<T>,
    MenuTriggerProps {
  label: string;
  variant?: (typeof buttonType)[number];
}

export function MenuButton<T extends object>(props: MenuButtonProps<T>) {
  // Create state based on the incoming props
  let state = useMenuTriggerState(props);

  // Get props for the menu trigger and menu elements
  let ref = React.useRef<any>();
  let { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);

  return (
    <>
      <Button
        {...menuTriggerProps}
        variant={props.variant}
        isPressed={state.isOpen}
        ref={ref}
      >
        {props.label}
      </Button>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <Menu
            {...menuProps}
            {...props}
            autoFocus={state.focusStrategy || true}
            onClose={() => state.close()}
          />
        </Popover>
      )}
    </>
  );
}

interface MenuProps<T extends object> extends AriaMenuProps<T> {
  onClose: () => void;
}

function Menu<T extends object>(props: MenuProps<T>) {
  // Create state based on the incoming props
  let state = useTreeState(props);

  // Get props for the menu element
  let ref = useRef<any>();
  let { menuProps } = useMenu(props, state, ref);

  return (
    <ul
      {...menuProps}
      ref={ref}
      className="pt-1 pb-1 shadow-xs rounded-md min-w-[200px] focus:outline-none"
    >
      {[...state.collection].map((item) =>
        item.type === 'section' ? (
          <MenuSection
            key={item.key}
            section={item}
            state={state}
            onAction={props.onAction!}
            onClose={props.onClose}
          />
        ) : (
          <MenuItem
            key={item.key}
            item={item}
            state={state}
            onAction={props.onAction!}
            onClose={props.onClose}
          />
        )
      )}
    </ul>
  );
}

interface MenuSectionProps<T> {
  section: any;
  state: TreeState<T>;
  onAction: (key: React.Key) => void;
  onClose: () => void;
}

function MenuSection<T>({
  section,
  state,
  onAction,
  onClose,
}: MenuSectionProps<T>) {
  let { itemProps, groupProps } = useMenuSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  let { separatorProps } = useSeparator({
    elementType: 'li',
  });

  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          {...separatorProps}
          className="border-t border-gray-300 mx-2 mt-1 mb-1"
        />
      )}
      <li {...itemProps}>
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <MenuItem
              key={node.key}
              item={node}
              state={state}
              onAction={onAction}
              onClose={onClose}
            />
          ))}
        </ul>
      </li>
    </>
  );
}

interface MenuItemProps<T> {
  item: any;
  state: TreeState<T>;
  onAction: (key: React.Key) => void;
  onClose: () => void;
}

function MenuItem<T>({ item, state, onAction, onClose }: MenuItemProps<T>) {
  // Get props for the menu item element
  let ref = React.useRef<any>();
  let { menuItemProps } = useMenuItem(
    {
      key: item.key,
      onAction,
      onClose,
    },
    state,
    ref
  );

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  let isFocused = state.selectionManager.focusedKey === item.key;
  let focusBg = item.key === 'delete' ? 'bg-red-500' : 'bg-blue-500';
  let focus = isFocused ? `${focusBg} text-white` : 'text-gray-900';

  return (
    <li
      {...menuItemProps}
      ref={ref}
      className={`${focus} text-sm select-none relative mx-1 rounded py-2 pl-3 pr-9 focus:outline-none cursor-pointer`}
    >
      {item.rendered}
    </li>
  );
}
