webpackJsonp([1,2],{315:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(8),r=i(o),u=n(15),c=i(u),a=n(14),f=i(a),l=n(1),s=i(l),p=function(e){function t(n){(0,r.default)(this,t);var i=(0,c.default)(this,e.call(this,n));return i.leftTimer=function(){var e=new Date(2018,4,13,18,0,0)-new Date,t=parseInt(e/1e3/60/60/24,10),n=parseInt(e/1e3/60/60%24,10),o=parseInt(e/1e3/60%60,10),r=parseInt(e/1e3%60,10);t=i.checkTime(t),n=i.checkTime(n),o=i.checkTime(o),r=i.checkTime(r),i.setState({leftTime:n+"小时"+o+"分"+r+"秒"})},i.checkTime=function(e){return e<10&&(e="0"+e),e},i.state={leftTime:""},i}return(0,f.default)(t,e),t.prototype.componentWillMount=function(){this.leftTimer()},t.prototype.componentDidMount=function(){var e=this;setTimeout(function(){e.leftTimer()},1e3)},t.prototype.componentDidUpdate=function(){var e=this;setTimeout(function(){e.leftTimer()},1e3)},t.prototype.render=function(){var e=this.state.leftTime;return s.default.createElement("div",null,e)},t}(l.Component);t.default=p}});