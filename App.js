import React from 'react';
import { Dimensions, StyleSheet, StatusBar } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Box from './Components/Box';
import Circle from './Components/Circle';
import Polygon from './Components/Polygon';



const Physics = (entities) => {
    return entities;
};


class Game extends React.PureComponent{


  constructor(props) {
    super(props);
    const { width, height } = Dimensions.get("screen");

    this.floor = Matter.Bodies.rectangle(width / 2, height + 5, width, 10, { restitution: 0, isStatic: true });
    this.leftWall = Matter.Bodies.rectangle(-5, height/2, 10, height, { restitution: 0, isStatic: true });
    this.rightWall = Matter.Bodies.rectangle(width+5, height/2, 10, height, { restitution: 0, isStatic: true });

    this.engine = Matter.Engine.create({
      enableSleeping: false,
      constraintIterations: 1,
      positionIterations: 10,
      velocityIterations: 2
    });
    this.world = this.engine.world;
    Matter.World.add(this.world, [this.leftWall, this.floor, this.rightWall]);

    this.shapeId = 0;
  }

  componentDidMount() {
    Matter.Engine.run(this.engine);
  }

  CreateShape(entities, { touches, screen }) {
      let world = entities["physics"].world;
      let boxSize = 60;

      let options = {
        frictionAir: 0.021,
        friction: 1,
        restitution: 0,
        // density: 0.5
      }

      touches.filter(t => t.type === "press").forEach(t => {
        let body;

        // body = Matter.Bodies.polygon(
        //   t.event.pageX, t.event.pageY,
        //   6, boxSize/2,
        //   {
        //     // frictionAir: 0.021,
        //     friction: 1,
        //     restitution: 0,
        //     density: 0.1
        //   }
        // );

        if(this.shapeId % 2 == 0){
          body = Matter.Bodies.circle(
             t.event.pageX, t.event.pageY,
             boxSize/2,
             options
          );
        }

        else{
          body = Matter.Bodies.rectangle(
             t.event.pageX, t.event.pageY,
             boxSize, boxSize,
             options
          );
        }

        Matter.World.add(world, [body]);
        entities[++this.shapeId] = {
            body: body,
            size: [boxSize, boxSize],
            color: "#cc0033",
            renderer: this.shapeId % 2 == 0 ? Box : Circle
        };
     });
     return entities;
  }



  render() {
    const { width, height } = Dimensions.get("screen");
    const boxSize = Math.trunc(Math.max(width, height) * 0.075);

    let entities = {
      physics: {
         engine: this.engine,
         world: this.world
      },
      floor: {
         body: this.floor,
         size: [width, 10],
         color: "#fff",
         renderer: Box
       },
       leftWall: {
          body: this.leftWall,
          size: [10, height],
          color: "#fff",
          renderer: Box
        },
        rightWall: {
           body: this.rightWall,
           size: [10, height],
           color: "#fff",
           renderer: Box
        }
      }

    return(
      <GameEngine
        style={styles.container}
        systems={[Physics, this.CreateShape.bind(this)]}
        entities={entities}>
         <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

export default Game;


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
});
