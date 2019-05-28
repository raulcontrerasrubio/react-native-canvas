/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Canvas from 'react-native-canvas';

export default class App extends Component {
  
  canvas;
  ctx;
  x = 100;
  y = 100;
  radius = 30;
  speedX = 1;
  speedY = 1;
  color = 'purple';
  frameId;

  move = () => {
    if(this.x+this.radius+this.speedX > this.canvas.width){
      this.speedX *= -1;
    }
    if(this.x-this.radius+this.speedX < 0){
      this.speedX *= -1;
    }
    if(this.y+this.radius+this.speedY > this.canvas.height){
      this.speedY *= -1;
    }
    if(this.y-this.radius+this.speedY < 0){
      this.speedY *= -1;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw = () => {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.ctx.fill();
    this.ctx.closePath();
  }


  handleCanvas = (canvas) => {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = Dimensions.get('window').width;
    this.canvas.height = Dimensions.get('window').height - 20;
    this.frameId = requestAnimationFrame(this.gameLoop);
  }

  gameLoop = () => {
    this.frameId = requestAnimationFrame(this.gameLoop);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.move();
    this.draw();
  }


  render() {
    return (
      <Canvas ref={this.handleCanvas} style={styles.canvas}/>
    );
  }
}

const styles = StyleSheet.create({
  canvas: {
    marginTop: 20,
    backgroundColor: '#EEE'
    // borderColor: '#333',
    // borderWidth: 1,
  }
});