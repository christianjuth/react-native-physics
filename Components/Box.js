import React, { Component } from "react";
import { View } from "react-native";
import { array, object, string } from 'prop-types';

export default class Box extends React.Component {

  constructor(props) {
    super(props);
    this.prevPosition = '';
  }

  shouldComponentUpdate() {
    return this.getPosition().join(',') != this.prevPosition;
  }

  getPosition() {
    const width = Math.round(this.props.size[0]);
    const height = Math.round(this.props.size[1]);
    const x = Math.round(this.props.body.position.x - width / 2);
    const y = Math.round(this.props.body.position.y - height / 2);
    const angle = Math.round(this.props.body.angle * 100) / 100;
    return [width, height, x, y, angle];
  }

  render() {

    let position = this.getPosition();
    this.prevPosition = position.join(',');
    let [ width, height, x, y, angle ] = position;

    return (
      <View
        style={{
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            backgroundColor: '#'+Math.floor(Math.random()*16777215).toString(16), //this.props.color,
            transform: [{ rotate: angle+'rad' }]
          }}/>
    );
  }
}
