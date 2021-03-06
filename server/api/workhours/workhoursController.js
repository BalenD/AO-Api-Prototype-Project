const Workhour = require('./workhoursModel');
const { cloneProperties } = require('../../utils/utils')

module.exports = class WorkController {
  static async getWorkhoursById(req, res, next) {
    try {
      const foundWork = await Workhour.findOne({ _Owner: req.params.id });
      foundWork.setupHyperLinks(req.headers.host, req.originalUrl);
      res.json(foundWork);
    } catch (error) {
      next(error);
    }
  }

  static async updateWorkhoursById(req, res, next) {
    try {
      // mangler copyObject ??
      req.body = cloneProperties(req.body, '_id _Owner');
      const updatedWork = await Workhour
        .findOndAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
      updatedWork.setupHyperLinks(req.headers.host, req.originalUrl);
      res.json(updatedWork);
    } catch (error) {
      next(error);
    }
  }
};