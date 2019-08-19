import React from "react";
import { array, object, string } from 'prop-types';
import Svg, { Polygon } from 'react-native-svg';
import { Dimensions, StyleSheet, StatusBar } from 'react-native';

export default class Poly extends React.Component {

  constructor(props) {
    super(props);
    const { width, height } = Dimensions.get("screen");

    this.prevPoints = '';
    this.state = {
      width: width,
      height: height
    }
  }

  shouldComponentUpdate() {
    return this.getPoints() != this.prevPoints;
  }

  getPoints() {
    return this.props.body.vertices.map(vert => Math.round(vert.x) + ',' + Math.round(vert.y)).join(' ');
  }

  render() {

    let points = this.getPoints();
    this.prevPoints = points;

    return (
      <Svg
        style={styles.container}
        height={this.state.height}
        width={this.state.width}
      >
          <Polygon
              points={points}
              fill={"#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16)}) || this.props.color}
          />
      </Svg>

    );
  }
}

let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});
