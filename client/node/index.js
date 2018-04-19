const grpc = require('grpc');

const protoPath = require('path').join(__dirname, '../..', 'proto');
const proto_work_leave = grpc.load({ root: protoPath, file: 'work_leave.proto' });
const proto_find_duplicate = grpc.load({ root: protoPath, file: 'find_duplicate.proto' });

const work_leave_client = new proto_work_leave.work_leave.EmployeeLeaveDaysService('localhost:50050', grpc.credentials.createInsecure());
const find_duplicate_client = new proto_find_duplicate.find_duplicate.FindDuplicateService('localhost:50050', grpc.credentials.createInsecure());

const employees = {
  valid: {
    employee_id: 1,
    name: 'Obed Tandadjaja',
    accrued_leave_days: 10,
    requested_leave_days: 4
  },

  ineligible: {
    employee_id: 2,
    name: 'Abel Tandadjaja',
    accrued_leave_days: 10,
    requested_leave_days: 20
  },

  invalid: {
    employee_id: 3,
    name: 'Olivia Tandadjaja',
    accrued_leave_days: 10,
    requested_leave_days: -1
  }

  // illegal: {
  //   foo: 'bar'
  // }
};

const arrays = {
  hasDuplicate: {
    array: [1,2,3,4,2,5,6]
  },

  hasNoDuplicate: {
    array: [1,2,3,4,5]
  },

  invalid: {
    array: [2,3,4,5,6]
  },

  invalid2: {
    array: [1,2,3,1,2,3]
  },

  invalid3: {
    array: [-1,0,1,2,3]
  }
}

function requestLeave(employee) {
  work_leave_client.eligibleForLeave(employee, (error, response) => {
    if(!error) {
      if(response.eligible) {
        work_leave_client.grantLeave(employee, (error, response) => {
          console.log(employee.name, ":", response);
        });
      } else {
        console.log(employee.name, ":", "You are currently ineligible for leave days");
      }
    } else {
      console.log("Error:", error.message);
    }
  });
}

// for(var employee in employees) requestLeave(employees[employee]);

function findDuplicate(array) {
  find_duplicate_client.getDuplicate(array, (error, response) => {
    if(!error) {
      console.log(array, ":", response, "(value)");
    } else {
      console.log("Error:", error.message);
    }
  });

  find_duplicate_client.getDuplicateIndex(array, (error, response) => {
    if(!error) {
      console.log(array, ":", response, "(index)");
    } else {
      console.log("Error:", error.message);
    }
  })
}

for(var array in arrays) findDuplicate(arrays[array]);
