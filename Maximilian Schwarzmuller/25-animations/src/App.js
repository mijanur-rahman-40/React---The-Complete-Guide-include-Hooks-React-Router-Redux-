import React, { Component } from "react";
import Transition from "react-transition-group/Transition";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <big style={{ fontWeight: '500', fontSize:'25px'}}>React Animations</big><br/>
        <button
          className="Button"
          onClick={() =>
            this.setState(prevState => ({ showBlock: !prevState.showBlock }))}
        >
          Toggle
        </button>
        <br />
        <br />
        <Transition
          in={this.state.showBlock}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log('onEnter')}
          onEntering={() => console.log('onEntering')}
          onEntered={() => console.log('onEntered')}
          onExit={() => console.log('onExit')}
          onExiting={() => console.log('onExiting')}
          onExited={() => console.log('onExited')}
        >
          {state => (
            <div
              style={{
                backgroundColor: "red",
                width: 100,
                height: 100,
                margin: "auto",
                borderRadius: "5px",
                transition: "opacity 1s ease-out",
                opacity: state === "exiting" ? 0 : 1
              }}
            />
          )}
        </Transition>
        <br />
        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        {this.state.modalIsOpen ? <Backdrop show /> : null}
        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <br />
        <big>Animating Lists</big>
        <br />
        <List />
      </div>
    );
  }
}

export default App;
