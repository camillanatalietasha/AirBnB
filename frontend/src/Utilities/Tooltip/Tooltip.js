import { useState } from 'react';
import './Tooltip.css'

const Tooltip = (props) => {
  let delay;
  const [visible, setVisible] = useState(false);

  const showText = () => {
    delay = setTimeout(() => {
      setVisible(true);
    }, 300);
  }

  const hideText = () => {
    clearInterval(delay);
    setVisible(false);
  };
  
  return (
    <div 
      className='tooltip-div'
      onMouseEnter={showText}
      onMouseLeave={hideText}
    >
      {props.children}
      {visible && (
        <div className='tool-tip'>
          {props.content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;