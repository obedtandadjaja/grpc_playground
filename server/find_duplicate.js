module.exports = {
  getDuplicate(call, callback) {
    let arr = call.request.array;

    for(i = 0; i < arr.length; i++) {
      if(Math.abs(arr[i]) >= arr.length || arr[i] == 0) {
        callback(new Error('Array values must be between 1 and its length'));
        return;
      }

      if(arr[Math.abs(arr[i])] < 0) {
        callback(null, {
          value: Math.abs(arr[i])
        });
        return;
      }
      arr[Math.abs(arr[i])] *= -1;
    }

    callback(new Error('No duplicate found'));
  },

  getDuplicateIndex(call, callback) {
    let arr = call.request.array;

    for(i = 0; i < arr.length; i++) {
      if(arr[Math.abs(arr[i])] < 0) {
        callback(null, {
          value: i
        });
        return;
      }
      arr[Math.abs(arr[i])] *= -1;
    }

    callback(new Error('No duplicate found'));
  }
};
