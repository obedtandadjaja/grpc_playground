const grpc = require('grpc');

const protoPath = require('path').join(__dirname, '../..', 'proto');
const proto = grpc.load({ root: protoPath, file: 'work_leave.proto' });

const client = new proto.work_leave.EmployeeLeaveDaysService('localhost:50050', grpc.credentials.createInsecure());

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

function requestLeave(employee) {
  client.eligibleForLeave(employee, (error, response) => {
    if(!error) {
      if(response.eligible) {
        client.grantLeave(employee, (error, response) => {
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

for(var employee in employees) {
  requestLeave(employees[employee]);
}

