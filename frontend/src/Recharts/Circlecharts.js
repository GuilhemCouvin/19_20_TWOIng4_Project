import React, { Component } from 'react';
import './Circlecharts.css';


import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

const percentage = 66;
const mark=percentage/5;


export default class Circle extends Component {

  state = {
    list: this.props.data
  };

  

  render(){
    console.log("moyenne");

    const mark=(this.props.data.maths+this.props.data.physics)/2;
    const moyenne=mark*5;

    console.log(mark);

    return (
      <div>
          <Example >
            <h6>Moyenne générale:</h6>
        <AnimatedProgressProvider
          valueStart={0}
          valueEnd={moyenne}
          duration={1.4}
          easingFunction={easeQuadInOut}
        >
          {value => {
            const roundedValue = Math.round(value);
            return (
              <CircularProgressbar
                value={value}
                text={`${mark}/20`}
                /* This is important to include, because if you're fully managing the
          animation yourself, you'll want to disable the CSS animation. */
                styles={buildStyles({ pathTransition: "none" })}
              />
            );
          }}
        </AnimatedProgressProvider>
      </Example>   
      </div>
    );
  }
}

function Example(props) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%", paddingRight: 30 }}>{props.children}</div>
      </div>
    </div>
  );
}

