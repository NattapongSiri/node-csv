// Generated by CoffeeScript 1.3.3
/*
Called by the `parse` function on each line. It is responsible for 
transforming the data and finally calling `write`.
*/

var Transformer;

Transformer = function(csv) {
  this.csv = csv;
  return this;
};

Transformer.prototype.transform = function(line) {
  var column, columns, i, isObject, lineAsObject, _i, _len;
  columns = this.csv.options.from.columns;
  if (columns) {
    if (this.csv.state.count === 0 && columns === true) {
      this.csv.options.from.columns = columns = line;
      return;
    }
    lineAsObject = {};
    for (i = _i = 0, _len = columns.length; _i < _len; i = ++_i) {
      column = columns[i];
      lineAsObject[column] = line[i] || null;
    }
    line = lineAsObject;
  }
  if (this.callback) {
    this.csv.state.transforming = true;
    try {
      line = this.callback(line, this.csv.state.count);
    } catch (e) {
      return this.csv.error(e);
    }
    isObject = typeof line === 'object' && !Array.isArray(line);
    if (this.csv.options.to.newColumns && !this.csv.options.to.columns && isObject) {
      Object.keys(line).filter(function(column) {
        return columns.indexOf(column) === -1;
      }).forEach(function(column) {
        return columns.push(column);
      });
    }
    this.csv.state.transforming = false;
  }
  if (this.csv.state.count === 0 && this.csv.options.to.header === true) {
    this.csv.stringifier.write(this.csv.options.to.columns || columns);
  }
  this.csv.stringifier.write(line);
  return this.csv.state.count++;
};

module.exports = function(csv) {
  return new Transformer(csv);
};

module.exports.Transformer = Transformer;