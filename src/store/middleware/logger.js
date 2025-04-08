const logger = param => (store) => (next) => (action) => {
  if (action.type === 'persist/REHYDRATE') {
  }
  return next(action);
};

export default logger;
