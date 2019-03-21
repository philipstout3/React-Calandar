import React from 'react';
import FifteenMins from './FifteenMins.jsx';
import Modal, {closeStyle} from 'simple-react-modal'

class WeekRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeBlocks: [],
      timeslotDivs: [],
      hourBlock: ['', '']
    };
    this.set96 = this.set96.bind(this);
    this.createBlock = this.createBlock.bind(this);
  }

  show(){
    this.setState({show: true})
  }
 
  close(){
    this.setState({show: false})
  }
  
  componentDidMount() {
    this.set96();
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
    this.setState({
      hourBlock: this.state.hourBlock.concat(e.target.id[0] + e.target.id[1])
    })
  }

  render() {
    return(
      <div className='week-row' onClick={this.props.setStartEnd}>
      {this.state.timeslotDivs.map((block) => {
        return <FifteenMins id={block} createBlock={this.createBlock} isBlock={this.state.hourBlock.indexOf(block[0] + block[1]) !== -1}/>
      })}
      </div>
    )
  }
}

export default WeekRow;