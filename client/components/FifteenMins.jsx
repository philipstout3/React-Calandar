import React from 'react';
import helpers from './Helpers'
var Draggable = require ('Draggable');

// import Draggable from '@shopify/draggable/lib/draggable';

// const draggable = new Draggable(document.querySelectorAll('div'), {
//   draggable: '.fifteen-min-block'
// });

// console.log(document.getElementsByClassName("fifteen-min-block"))
// draggable.on('drag:start', () => console.log('drag:start'));
// draggable.on('drag:move', () => console.log('drag:move'));
// draggable.on('drag:stop', () => console.log('drag:stop'));

class FifteenMins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBlock: this.props.isBlock,
    };
    this.alterBlock = this.alterBlock.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      isBlock: newProps.isBlock,
    })
  }

  alterBlock(e) {
    this.setState({
      isBlock: true/*!this.state.isBlock*/
    })
    this.props.createBlock(e)
  }

  render() {
    var id = this.props.id;
    var isBlock = this.props.isBlock;
    var reservationBlocks = this.props.reservationBlocks;

    // if(helpers.isReservedBlock(id, reservationBlocks, this.props.day)) {console.log(document.getElementById(this.props.id + '-' + this.props.day))}
    return (
      <div id={id + '-' + this.props.day} draggable={true} onDragStart={this.props.startDrag} onDragEnd={this.props.endDrag} onDragOver={this.props.dragEvent} className='fifteen-min-block' onClick={this.alterBlock} style={this.state.isBlock || this.state.draggedOver ? {backgroundColor:'#a2c0f2', borderLeft:'3px solid #03A9F4'} : {}}>
        {helpers.styleStartEnd(id, isBlock, reservationBlocks, this.props.day)}
      </div>
    )
  }
}

export default FifteenMins;