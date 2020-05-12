export default function (context, className) {
  let newContext = {};
  Object.keys(context).map(item => {
    if (
      item === 'default' ||
      item === 'warning' ||
      item === 'success' ||
      item === 'error' ||
      item === 'loading'
    ) {
      if (className === item) {
        newContext.action = context[item];
      }
    } else {
      newContext[item] = context[item];
    }
  });
  console.log(newContext);
  return newContext;
}
