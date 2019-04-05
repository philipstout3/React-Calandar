import React from 'react';
import FifteenMins from './FifteenMins.jsx';
import Modal, {closeStyle} from 'simple-react-modal';
import helpers from './Helpers';
import _ from 'underscore';

class WeekRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: '',
      timeBlocks: [],
      timeslotDivs: [],
      hourBlock: ['', ''],
      draggedItems: [],
      allDragged: [],
      reservationBlocks: this.props.reservationBlocks,
    };
    this.set96 = this.set96.bind(this);
    this.createBlock = this.createBlock.bind(this);
    this.dragEvent = this.dragEvent.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
  }
  
  componentDidMount() {
    this.set96();
  }
  
  componentWillReceiveProps(newProps) {
    if(newProps.clearValues) {
      this.setState({
        allDragged: [],
        draggedItems: []
      })
    }
  }

  set96(){
    var arr = [];
    for(var i = 1; i < 24; i++) {
      for(var j = 0; j < 60; j+=15) {
        if(j === 0) {
          i < 10 ? arr.push('0' + i.toString() + j.toString() + '0') : 
          arr.push(i.toString() + j.toString() + '0')
        } else {
          i < 10 ? arr.push('0' + i.toString() + j.toString()) : 
          arr.push(i.toString() + j.toString());
        }
      }
    }
    for(var k = 0; k < 60; k+=15) {
        arr.push('00' + k.toString());
    }
    this.setState({
      timeslotDivs: arr
    })
  }

  createBlock(e) {
    //console.log(e.target.parentElement.id)
    this.setState({
      hourBlock: this.state.hourBlock.concat(e.target.id[0] + e.target.id[1]),
      day: e.target.parentElement.id,
    })
  }

  startDrag(e) {
    this.setState({
      pageY: e.pageY,
      day: e.target.id.split('-')[1],
      startDragDay: e.target.id.split('-')[1],
      draggedItems: this.state.draggedItems.concat(e.target.id)
    })
  }

  dragEvent(e) {
    //console.log(e.pageY >= this.state.pageY ? "moving down" : "moving up")
    if(e.target.id.split('-')[1] === this.state.startDragDay && this.state.allDragged.indexOf(e.target.id) !== -1 && /*moving up*/ !(e.pageY >= this.state.pageY)) {
      var index = this.state.allDragged.indexOf(e.target.id);
      console.log(this.state.draggedItems.indexOf(e.target.id))
      this.setState({
        pageY: e.pageY,
        allDragged: this.state.allDragged.slice(0,index), //.concat(this.state.allDragged.slice(index+1, this.state.allDragged.length))
        draggedItems: this.state.allDragged.slice(0,index)
      })
    }

    if(e.target.id.split('-')[1] === this.state.startDragDay && this.state.draggedItems.indexOf(e.target.id) === -1) {
      this.setState({
        pageY: e.pageY,
        draggedItems: this.state.draggedItems.concat(e.target.id)
      })
      var max = helpers.numToString(Math.max(...this.state.draggedItems.map(drag => drag.split('-')[0])));
      var min = helpers.numToString(Math.min(...this.state.draggedItems.map(drag => drag.split('-')[0])));
      var getMissed = helpers.getBetweenStartEnd(min, max);
      var missedItems = getMissed.map(missed => missed + "-" + this.state.startDragDay)
      var union = _.union(this.state.draggedItems, missedItems)
      this.setState({
        allDragged: missedItems//union
      })
    }
  }

  endDrag(e) {
    this.props.setEndDrag(this.state.allDragged)
    this.props.openModal()
    this.setState({
      draggedItems: [],
    })
  }

  render() {
    return(
      <div className='week-row' id={this.props.day} onDragStart={this.props.setStartDrag} onDragEnd={this.setEndDrag} onClick={this.props.setStartEnd}>
      {this.state.timeslotDivs.map((block) => {
        return <FifteenMins draggable={true} startDrag={this.startDrag} endDrag={this.endDrag} dragEvent={this.dragEvent} id={block} createBlock={this.createBlock} day={this.props.day} reservationBlocks={this.props.reservationBlocks} isBlock={helpers.isReservedBlock(block, this.props.reservationBlocks, this.state.day) || this.state.allDragged.map(drag => drag.split('-')[0]).indexOf(block) !== -1}/>
      })}
      </div>
    )
  }
}

export default WeekRow;