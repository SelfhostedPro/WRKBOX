import {createWindow, createErrorWindow} from './create-window';
import isProd from './utils';
import { checkWRKBOXContainers } from './docker';
import { startUpHandler } from './startup';

export {
  createWindow,
  createErrorWindow,
  checkWRKBOXContainers,
  startUpHandler,
  isProd
};
