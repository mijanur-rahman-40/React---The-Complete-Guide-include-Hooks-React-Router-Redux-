import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./Modal.css";

const animationTiming = {
  enter: 400,
  exit: 1000
};

const modal = props => {
  return (
    <CSSTransition
      mountOnEnter={true}
      unmountOnExit={true}
      in={props.show}
      timeout={animationTiming}
      classNames={{
        enter: '',
        enterActive: 'ModalOpen',
        exit: '',
        exitActive: 'ModalClosed'
      }}>
      <div className="Modal">
        <big>A Modal</big><br />
        <small>In CSS, the term "box model" is used when talking about design and layout. The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content</small>
        <br/>
        <button className="Button" onClick={props.closed}>Dismiss</button>
      </div>
    </CSSTransition>
  );
};

export default modal;
