/**
 * Created by sunxianxiong on 18/4/13.
 */
import React, { Component } from 'react';

export default class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state ={leftTime:''}
  }

  componentWillMount() {
    this.leftTimer();
  }

  componentDidMount(){
    setTimeout(()=>{this.leftTimer()},1000);
  }

  componentDidUpdate(){
    setTimeout(()=>{this.leftTimer()},1000);
  }

   leftTimer =() =>{
    let leftTime = (new Date(2018,4,13,18,0,0)) - (new Date()); //计算剩余的毫秒数
     let days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
     let hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
     let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
     let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
    days = this.checkTime(days);
    hours = this.checkTime(hours);
    minutes = this.checkTime(minutes);
    seconds = this.checkTime(seconds);
    this.setState({leftTime:`${hours}小时${minutes}分${seconds}秒`});
    // setInterval(()=>{this.leftTimer(2016,11,11,11,11,11)},1000);
    // document.getElementById("timer").innerHTML = ;
  }
  checkTime = (i) =>{ //将0-9的数字前面加上0，例1变为01
    if(i<10)
    {
      i = "0" + i;
    }
    return i;
  }



  render() {
    const {leftTime} = this.state;

    return (
      <div>
        {leftTime}
      </div>
    );
  }


};

