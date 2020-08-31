import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Swipeable } from 'react-swipeable';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  swipeContainer: {
    height: '100%',
    width: '100%',
    position: 'relative',
    transition: ({ swipeAnimation }) => (!!swipeAnimation ? 'all 0.3s ease-out' : ''),
    transform: ({ swipePosition }) => `translateX(${swipePosition}px)`,
    zIndex: '2',
  },
}));

export const SwipeableComponent = props => {
  const {
    threshold,
    onSwipeLeft,
    onSwipeRight,
    swipeLeftComponent,
    swipeRightComponent,
    position,
    children,
  } = props;
  const DIRECTION_RIGHT = 'Right';
  const DIRECTION_LEFT = 'Left';

  const [swipeDirection, setSwipeDirection] = useState(0);
  const [swipePosition, setSwipePosition] = useState(!!position ? position : 0);
  const [swipeAnimation, setSwipeAnimation] = useState(false);
  const swipeContainerRef = useRef(null);

  const themeProps = useMemo(() => ({ ...props, swipePosition, swipeAnimation }), [
    props,
    swipePosition,
    swipeAnimation,
  ]);
  const classes = useStyles(themeProps);

  const getThreshold = useCallback(width => (width / 100) * (!!threshold ? threshold : 50), [
    threshold,
  ]);
  const isDirection = useCallback(direction => !!swipeDirection && swipeDirection === direction, [
    swipeDirection,
  ]);

  const onSwipeEnd = useCallback(
    swipe => {
      const { absX } = swipe;

      setSwipeAnimation(true);

      if (absX > getThreshold(swipeContainerRef.current.offsetWidth)) {
        if (isDirection(DIRECTION_LEFT)) {
          setSwipePosition(-window.innerWidth);
          onSwipeLeft();
        } else if (isDirection(DIRECTION_RIGHT)) {
          setSwipePosition(window.innerWidth);
          onSwipeRight();
        }
      } else {
        setSwipePosition(0);
      }
    },
    [isDirection, getThreshold, onSwipeLeft, onSwipeRight, setSwipePosition],
  );

  const onSwipeListener = useCallback(
    swipe => {
      const { deltaX } = swipe;
      const positionX = deltaX - deltaX * 2;

      setSwipeAnimation(false);

      if (positionX > 0 && !!swipeRightComponent) {
        setSwipePosition(positionX);
        setSwipeDirection(DIRECTION_RIGHT);
      } else if (positionX < 0 && !!swipeLeftComponent) {
        setSwipePosition(positionX);
        setSwipeDirection(DIRECTION_LEFT);
      } else {
        setSwipeDirection(null);
      }
    },
    [swipeRightComponent, swipeLeftComponent, setSwipePosition],
  );

  useEffect(() => {
    setSwipePosition(position);
  }, [position]);

  return (
    <div className={classes.container} ref={swipeContainerRef}>
      {isDirection(DIRECTION_RIGHT) && swipeRightComponent}
      {isDirection(DIRECTION_LEFT) && swipeLeftComponent}
      <Swipeable
        nodeName="div"
        className={classes.swipeContainer}
        style={{
          width: '100%',
          height: '100%',
        }}
        onSwiped={onSwipeEnd}
        onSwiping={onSwipeListener}
        preventDefaultTouchmoveEvent={true}
        trackTouch={true}
        delta={16}
      >
        {children}
      </Swipeable>
    </div>
  );
};
