var helpers = {

  createDropdownTimes: function createDropdownTimes() {
    var dropDownTimes = ['12:00 am', '12:15 am', '12:30 am', '12:45 am'];
    for(var i = 1; i < 12; i++) {
      for(var j = 0; j < 60; j+= 15) {
        dropDownTimes.push(i + ':' + (j === 0 ? j + '0' : j) + ' am')
      }
    }
    dropDownTimes.push('12:00 pm', '12:15 pm', '12:30 pm', '12:45 pm');
    for(var i = 1; i < 12; i++) {
      for(var j = 0; j < 60; j+= 15) {
        dropDownTimes.push(i + ':' + (j === 0 ? j + '0' : j) + ' pm')
      }
    }
    return dropDownTimes
  },

  convertTo12Hr: function convertTo12Hr(militaryTime) {
    console.log('milTime:',militaryTime)
    if(Number(militaryTime) < 100) {
      return '12:' + Number(militaryTime) + ' am'
    }
    if(Number(militaryTime) < 1200) {
      return[militaryTime.slice(1, 2), ':', militaryTime.slice(2)].join('') + ' am';
    } else {
      if(Number(militaryTime) < 1300) {
        return '12:' + (Number(militaryTime) - 1200) + ' pm'
      }
      var convert = '0' + (Number(militaryTime) - 1200).toString();
      return[convert.slice(0, 2), ':', convert.slice(2)].join('') + ' pm';
    }
  }

}

export default helpers;