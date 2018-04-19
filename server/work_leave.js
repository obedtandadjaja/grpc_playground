module.exports = {
  eligibleForLeave(call, callback) {
    if(call.request.requested_leave_days > 0) {
      if(call.request.accrued_leave_days > call.request.requested_leave_days) {
        callback(null, { eligible: true });
      } else {
        callback(null, { eligible: false });
      }
    } else {
      callback(new Error('Invalid requested days'));
    }
  },

  grantLeave(call, callback) {
    let granted_leave_days = call.request.requested_leave_days;
    let accrued_leave_days = call.request.accrued_leave_days - call.request.requested_leave_days;

    callback(null, {
      granted: true,
      granted_leave_days,
      accrued_leave_days
    });
  }
};
