import express from 'express';
import workhoursController from './workhoursController';
import MessageService from '../../utils/messageService';

const workhoursRouter = express.Router();

workhoursRouter.route('/')
  .get(workhoursController.FindResource)
  .post(MessageService(405, 'Cannot create new work'))
  .patch(MessageService(405, 'Use /workhours/workhoursId to update specific resource'))
  .delete(MessageService(405, 'Cannot delete work'));

workhoursRouter.route('/:workhoursId')
  .get(workhoursController.FindResourceById)
  .post(MessageService(405, 'Use /workhours/ only to create a new resource'))
  .patch(workhoursController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete workhours'));

export default workhoursRouter;
