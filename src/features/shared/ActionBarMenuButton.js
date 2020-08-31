import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { ActionBarMenu } from './ActionBarMenu';
import { ActionBarButton } from './ActionBarButton';

export const ActionBarMenuButton = props => {
  const { children, ...otherProps } = props;
  const [menuIsOpen, setMenuOpen] = useState(false);
  const [menuIsToggling, setMenuIsToggling] = useState(false);
  // Transition time in seconds
  const transitionTime = 0.3;

  const handleOpenMenu = useCallback(() => {
    if (!menuIsToggling) {
      setMenuIsToggling(true);
      setTimeout(() => {
        setMenuOpen(!menuIsOpen);
        setMenuIsToggling(false);
      }, transitionTime * 1000);
    }
  }, [menuIsOpen, menuIsToggling]);

  return (
    <ActionBarButton
      {...otherProps}
      transitiontime={transitionTime}
      onClick={handleOpenMenu}
      open={menuIsOpen}
      isOpening={menuIsToggling}
    >
      <ActionBarMenu
        {...otherProps.color}
        transitiontime={transitionTime}
        open={menuIsOpen}
        isOpening={menuIsToggling}
      >
        {children}
      </ActionBarMenu>
    </ActionBarButton>
  );
};
