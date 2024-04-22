export function splitStringAtFirstOccurrence(inputString, delimiter) {
  var index = inputString.indexOf(delimiter);
  if (index !== -1) {
    var before = inputString.substring(0, index);
    var after = inputString.substring(index + delimiter.length);
    return [before, after];
  } else {
    return [inputString, ''];
  }
}
