const mongoose = require('mongoose');
const hlGenerator = require('../../utils/hyperMediaLinkGenerator');

const employeeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  birthday: {type: Date, required: true },
  city: {type: String, required: true },
  country: {type: String, required: true },
  street: {type: String, required: true },
  phoneNumber: {type: Number, require: true},
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobs',
  },
  startDate: { type: Date, default: Date.now },
  lastChanged: { type: Date, default: Date.now },
  links: { type: [{
    _id: false,
    rel: String,
    type: { type: String, enum: ['GET', 'POST', 'PATCH', 'DELETE'] },
    href: String,
    description: String,
  }], default: []},
});

employeeSchema.method('SetUpHyperLinks', function setupHL(hostName, url) {
  {
    const hateaosEndpoints = [
      {
        rel: 'self',
        type: 'GET',
        description: 'view this employee',
      },
      {
        rel: 'self',
        type: 'PATCH',
        description: 'update this employee',
      },
      {
        rel: 'self',
        type: 'DELETE',
        description: 'delete this employee',
      },
      {
        rel: 'job',
        type: 'GET',
        description: 'get employees job',
      },
      {
        rel: 'wallet',
        type: 'GET',
        description: 'get employees wallet',
      },
      {
        rel: 'schedules',
        type: 'GET',
        description: 'get employees schedules',
      },
      {
        rel: 'work',
        type: 'GET',
        description: 'get employees work',
      },
    ];
    hlGenerator(this, hostName, url, hateaosEndpoints);
  }
});

module.exports =  mongoose.model('Employees', employeeSchema);
