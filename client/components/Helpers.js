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
    if(Number(militaryTime) < 100) {
      return '12:0' + Number(militaryTime) + ' am'
    }
    if(Number(militaryTime) < 1000) {
      return[militaryTime.slice(1, 2), ':', militaryTime.slice(2)].join('') + ' am';
    } 
    if(Number(militaryTime) < 1200) {
      return[militaryTime.slice(0, 2), ':', militaryTime.slice(2)].join('') + ' am';
    }
    else {
      if(Number(militaryTime) < 1300) {
        return '12:0' + (Number(militaryTime) - 1200) + ' pm'
      }
      var convert = '0' + (Number(militaryTime) - 1200).toString();
      if(Number(convert) < 1000) {
        return[convert.slice(1, 2), ':', convert.slice(2)].join('') + ' pm';
      }
      return[convert.slice(1, 3), ':', convert.slice(3)].join('') + ' pm';
    }
  },

  convertToMil: function convertToMil(twelveHr) {
    // am conversion
    if(twelveHr[1] === ':' && twelveHr[twelveHr.length - 2] === 'a') {
      return '0' + twelveHr[0] + twelveHr[2] + twelveHr[3]
    } 
    if(twelveHr[twelveHr.length - 2] === 'a') {
      return twelveHr[0] + twelveHr[1] + twelveHr[3] + twelveHr[4]
    }
    // pm conversion
    if(twelveHr[1] === '2') {
      return '12' + twelveHr[3] + twelveHr[4];
    }
    return (Number(twelveHr.split(":")[0]) + 12).toString() + twelveHr.split(":")[1][0] + twelveHr.split(":")[1][1]
  },

  isReservedBlock: function isReservedBlock(time, arr, day) {
    for(var i = 0; i < arr.length; i++) {
      if(Number(arr[i].start) <= Number(time) && Number(arr[i].end) >  Number(time) && day === arr[i].day) {
        return true;
      }
    }
    return false;
  },

  styleStartEnd: function styleStartEnd(id, isBlock, reservationBlock, day) {
    if(!isBlock) {return}
    if(reservationBlock.map(res => res.start).indexOf(id) !== -1 ) {
      var index = reservationBlock.map(res => res.start).indexOf(id);
      if(reservationBlock[index].day === day) {
        return 'Start: ' + helpers.convertTo12Hr(reservationBlock[index].start);
      }
    }
    if(reservationBlock.map(res => res.end).indexOf(helpers.increment15(id)) !== -1) {
      var indexEnd = reservationBlock.map(res => res.end).indexOf(helpers.increment15(id));
      if(reservationBlock[indexEnd].day === day) {
        return 'End: ' + helpers.convertTo12Hr(reservationBlock[indexEnd].end); 
      }
    }
  },

  getAllBetween: function getAllBetween(time, day, reservationBlocks) {
    var ans = '';
    reservationBlocks.map((block) => {
      if(time >= Number(block.start) && Number(time) < Number(block.end) && day === block.day) {
        ans = block
      }
    });
    if(ans === '') {
      return
    }
    // Now that we've found the obj...
    var arr = [ans.start];
    function inner(time) {
      var newTime = helpers.increment15(time)
      if(newTime === ans.end) {
        arr.push(newTime)
        return
      }
      arr.push(newTime)
      inner(newTime)
    }
    inner(ans.start)
    return arr
  },

  increment15: function increment15(str) {
    var toNum = Number(str) + 15;
    if(toNum.toString().slice(-2) === '60'){
      toNum = (Number(str.slice(0,2)) + 1).toString() + '00'
    }
    if(toNum.toString().length <= 2) {
      toNum = '00' + toNum
    }
    if(toNum.toString().length <= 3) {
      toNum = '0' + toNum
    }
    return toNum.toString()
  },

  getBetweenStartEnd: function getBetweenStartEnd(start, end) {
    // expects string mil time input like "1245"
    if(start === end) {
      return [start]
    }
    var arr = [start];
    function inner(time) {
      var newTime = helpers.increment15(time)
      if (newTime === end) {
        arr.push(newTime)
        return
      }
      arr.push(newTime)
      inner(newTime)
    }
    inner(start)
    return arr
  },

  numToString: function numToString(num) {
    var ans = '';
    var toStr = num.toString();
    if(toStr.length === 2) {
      ans = "00" + toStr
    }
    if(toStr.length === 3) {
      ans = "0" + toStr
    }
    if(toStr.length === 4) {
      return toStr
    }
    return ans;
  },

}

export default helpers;