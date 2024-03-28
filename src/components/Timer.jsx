import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Timer = () => {
 return (
    <CountdownCircleTimer
      isPlaying
      duration={300}
      colors={['#6cff73', '#ff0000']}
      colorsTime={[15, 0]}
      size={70}
      strokeWidth={12}
      trailStrokeWidth={12}
      strokeLinecap="round"
      trailColor="#0000000"
      isSmoothColorTransition
    >
      {({ remainingTime }) => (
        <div style={{ color: remainingTime > 5 ? 'white' : 'red' }}>
          {remainingTime}
        </div>
      )}
    </CountdownCircleTimer>
 );
};

export default Timer;
