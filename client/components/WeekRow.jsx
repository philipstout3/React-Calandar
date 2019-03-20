import React from 'react';
import FifteenMins from './FifteenMins.jsx'

class WeekRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeBlocks: [],
      timeslotDivs: []
    };
    this.set96 = this.set96.bind(this);
  }
  
  componentDidMount() {
    this.set96();
  }

  set96(){
    var arr = [];
    for(var i = 0; i < 96; i++) {
      arr.push(i)
    }
    this.setState({
      timeslotDivs: arr
    })
  }

  createBlock() {
    
  }

  render() {
    return(
      <div className='week-row'>
      {this.state.timeslotDivs.map((block) => {
        return <FifteenMins id={block}/>
      })}
      </div>
    )
  }
}

export default WeekRow;