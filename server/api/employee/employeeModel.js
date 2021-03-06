const mongoose = require('mongoose');
const hlGenerator = require('../../utils/hyperMediaLinkGenerator');


const employeeSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    // create indexes in the table, for faster look up
    unique: true,
    //  Regex pattern that validates email
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  birthday: { type: Date, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  street: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: Date, default: () => new Date() },
  lastChanged: { type: String, default: () => new Date() },
  links: {
    type: [{
      _id: false,
      rel: String,
      type: { type: String, enum: ['GET', 'POST', 'PATCH', 'DELETE'] },
      href: String,
      description: String,
    }],
    default: [],
  },
});

employeeSchema.method('setupHyperLinks', function setupHL(hostName, url, options) {
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
        rel: 'workhours',
        type: 'GET',
        description: 'get employees workhour',
      },
    ];
    const opts = options || {};
    hlGenerator(this, hostName, url, hateaosEndpoints, opts);
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
