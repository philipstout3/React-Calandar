import React from 'react';
import '../../style.css';
import WeekRow from './WeekRow.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <div className="header-box">
          <div className="title">Enter Available Times</div>
        </div>
        <div className='header-box'>
          <div className='calendar-day'><span className="week-day">Sunday</span></div>
          <div className='calendar-day'><span className="week-day">Monday</span></div>
          <div className='calendar-day'><span className="week-day">Tuesday</span></div>
          <div className='calendar-day'><span className="week-day">Wednesday</span></div>
          <div className='calendar-day'><span className="week-day">Thursday</span></div>
          <div className='calendar-day'><span className="week-day">Friday</span></div>
          <div className='calendar-day'><span className="week-day">Saturday</span></div>
        </div>
        <div className='calendar-box'>
          <div className='times-container'>
            {['1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', 
            '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', 
            '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm', '12 pm'].map((time) => {
              return <div className='time-text'>{time}</div>
            })}
          </div>
          <div className='week-row-container'>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day)=>{
              return <WeekRow day={day}/>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default App;