import React from 'react';

class FifteenMins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBlock: false
    };
    this.alterBlock = this.alterBlock.bind(this);
  }

  alterBlock() {
    this.setState({
      isBlock: !this.state.isBlock
    })
  }
  
  render() {
    return (
      <div id={this.props.id} className='fifteen-min-block' onClick={this.alterBlock} style={this.state.isBlock ? {backgroundColor:'blue'} : {}}></div>
    )
  }
}

export default FifteenMins;