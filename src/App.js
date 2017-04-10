import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

/* Slider imports */
import 'rc-slider/assets/index.css';
const Tooltip = require('rc-tooltip');
const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  )
};

const wrapperStyle = { width: 400, margin: 50 };

const App = React.createClass({
  getInitialState(){
    return {
      time: 0,
      resistance: 9.9,
      area: 320,
      voltage: 5,
    };
  },
  updateTime(){
    // console.log("fds");
    var t_a = 72;
    var t_f = 92;
    var kappa = 0.00186436;
    var k_h = (this.state.voltage*this.state.voltage) / (kappa*this.state.resistance*this.state.area);
    var kelv = 0.016;

    for(var i = 0; i < 60; i++){
      // console.log(k_h*Math.exp(-kelv*i));
      var cooling_factor = Math.exp(-kelv*i);
      console.log(Math.round(t_a - t_f + k_h*cooling_factor*i));
      if(Math.round(t_a - t_f + k_h*cooling_factor*i) === 0){ //check if there exists a time within 60 sec, where the heater heats up to 92 degrees
        this.setState({
          time: i,
        });
      }
    }


    /*set state of time right here*/
    // this.setState({
    //   time: t_a + k_h*Math.exp(-kelv*t)
    // })
  },
  onResistanceChange(e){
    this.setState({
      resistance: e,
    });
    this.updateTime();
  },
  onAreaChange(e){
    this.setState({
      area: e,
    });
    this.updateTime();
  },
  onVoltageChange(e){
    this.setState({
      voltage: e,
    });
    this.updateTime();
  },
  render() {
    return (
      <div className="App">
          <div style={wrapperStyle}>
            <p>Resistance</p>
              <Slider min={9.9} max={78.5} defaultValue={15} handle={handle} onChange={this.onResistanceChange}/> <br/>
            <p>Area</p>
              <Slider min={320} max={1697} defaultValue={320} handle={handle} onChange={this.onAreaChange}/> <br/>
            <p>Voltage</p>
              <Slider min={5} max={9} defaultValue={5} handle={handle} onChange={this.onVoltageChange}/> <br/>
            <p>Time</p>
              <input value={this.state.time} />
          </div>
      </div>

    );
  }
});

export default App;
