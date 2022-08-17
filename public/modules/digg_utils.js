/**
 * General utils shared between modules
 *
 * *Tip! Install: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments
 * *for better highlighting comments
 *
 * !Remember, all modules should start with prefix 'digg_' to avoid name-clashing with nodebb
 */

function isNumeric(str) {
  if (typeof str != "string") {
    return false;
  }
  return !isNaN(str) && !isNaN(parseFloat(str));
}

define([], () => {
  "use-strict";
  return {
    isNumeric: isNumeric,
  };
});
