const grpc = require('grpc');

const proto_work_leave = grpc.load('proto/work_leave.proto');
const proto_find_duplicate = grpc.load('proto/find_duplicate.proto');
const proto_weather = grpc.load('proto/weather.proto');
const server = new grpc.Server();

const work_leave = require('./work_leave');
const find_duplicate = require('./find_duplicate');
const weather = require('./weather_api');

// proto.<package_name>.<service_name>.service
server.addService(proto_work_leave.work_leave.EmployeeLeaveDaysService.service, work_leave);
server.addService(proto_find_duplicate.find_duplicate.FindDuplicateService.service, find_duplicate);
server.addService(proto_weather.weather.WeatherService.service, weather);

server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

server.start();
console.log('grpc server running on port:', '0.0.0.0:50050');
