const {
  findAllEmployees,
  findEmployeeById,
  hasKeys,
  createEmployeeObject,
  createEmployee,
  deleteEmployeeById,
  populate,
  copyObjectAndAddLastChanged,
  updateEmployeeById,
} = require('./employeeService');

module.exports = class EmployeeController {
  /**
   * gets all the employees, sets up HATEOAS and returns the result
   * @param {object} obj an object representing what the user wants
   * @param {string} host the host name portion of the requested url
   * @param {string} originalUrl the requested url after the hostname
   * @returns {object} returns an object with the result and status code
   */
  static async getAllEmployees(obj, host, originalUrl) {
    const isQueryString = hasKeys(obj);
    const employees = await findAllEmployees(obj);
    if (employees.length > 0) {
      for (let i = 0; i < employees.length; i += 1) {
        employees[i].setupHyperLinks(host, originalUrl, { queryString: isQueryString });
      }
      return {
        result: {
          count: employees.length,
          employees,
        },
      };
    }
    return {
      status: 204,
      result: null,
    };
  }

  /**
   * get an employee by a given ID; sets up HATEOAS and returns the employee
   * @param {string} id id to find emplooye by
   * @param {string} host the host name portion of the requested url
   * @param {string} originalUrl the request url after the hostname
   * @returns {object} the found employee
   */
  static async getEmployeeById(id, host, originalUrl) {
    const foundEmployee = await findEmployeeById(id);
    if (foundEmployee) {
      await populate(foundEmployee, 'user', 'username email links');
      foundEmployee.setupHyperLinks(host, originalUrl, { removeAfterSlash: 1 });
      // user er undefined
      //foundEmployee.user.setupHyperLinks(host, '/api/v1/users/');
      return {
        result: foundEmployee,
      };
    }
    return {
      status: 204,
      result: null,
    };
  }

  /**
   * creates given employee and given user in database
   * @param {object} employee emplooye object to create in the database
   * @param {object} user user object to create in database
   * @param {string} host the host name portion of the requested url
   * @param {string} originalUrl the requested url after the hostname
   * @returns {object} returns an object containing the result and status
   */
  static async createEmployee(employee, user, host, originalUrl) {
    const employeeObject = await createEmployeeObject(employee, user);
    const createdEmployee = await createEmployee(employeeObject);
    await populate(createdEmployee, 'user', 'username role links');
    //user undefined
    //createdEmployee.user.setupHyperLinks(host, '/api/v1/users/');
    createdEmployee.setupHyperLinks(host, originalUrl);
    return {
      status: 201,
      result: createdEmployee,
    };
  }

  /**
   * updates an employee by id with a given object
   * @param {object} employee new object to update employee with
   * @param {string} id id of the employee to update
   * @param {string} host the host name portion of the requested url
   * @param {string} originalUrl the requested url after the hostname
   * @returns {object} returns an object with a message
   */
  static async updateEmployeeById(employee, id, host, originalUrl) {
    const newEmployee = copyObjectAndAddLastChanged(employee, '_id user');
    const updatedEmployee = await updateEmployeeById(newEmployee, id);
    updatedEmployee.setupHyperLinks(host, originalUrl);
    return {
      result: updatedEmployee,
    };
  }

  /**
   * deletes the employee in the database with the given id
   * @param {string} id the id of the employee to be deleted
   * @returns {object} returns an object with a message
   */
  static async deleteEmployeeById(id) {
    await deleteEmployeeById(id);
    return { result: 'Successfully deleted' };
  }
};
