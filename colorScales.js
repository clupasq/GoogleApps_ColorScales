function main() {
  colorRangeByValue('A1:C5');
}

function colorRangeByValue(rangeSpecification) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var range = sheet.getRange(rangeSpecification);
  
  var min = Number.POSITIVE_INFINITY;
  var max = Number.NEGATIVE_INFINITY;
  
  for (var i = 1; i <= range.getNumRows(); i++) {
    for (var j = 1; j <= range.getNumColumns(); j++) {
      
      var cell = range.getCell(i, j);
      
      var currentValue = parseFloat(cell.getValue());
      
      if(currentValue > max)
        max = currentValue;
      if(currentValue < min)
        min = currentValue;
    }
  }
  
  var average = (max + min) / 2
  
  //Logger.log('min'+min);
  //Logger.log('max'+max);
  
  var COLOR_LEVEL_RANGE = 128;
  var MIN_COLOR_LEVEL = 255 - COLOR_LEVEL_RANGE;
  
  if(min == max) {
    range.setBackground('#FFF');
  } else {  
    for (var i = 1; i <= range.getNumRows(); i++) {
      for (var j = 1; j <= range.getNumColumns(); j++) {
        
        var cell = range.getCell(i, j);
        
        var currentValue = parseFloat(cell.getValue());
                
        var red = currentValue < average ? COLOR_LEVEL_RANGE : COLOR_LEVEL_RANGE - (currentValue - average) / (max - average) * COLOR_LEVEL_RANGE;
        var green = currentValue > average ? COLOR_LEVEL_RANGE : COLOR_LEVEL_RANGE - (average - currentValue) / (average - min) * COLOR_LEVEL_RANGE;
        var blue = COLOR_LEVEL_RANGE - Math.abs(currentValue - average) / (average - min) * COLOR_LEVEL_RANGE;
        
        Logger.log(''+currentValue + ' ' + red + ' ' + green + ' ' + blue);
        
        cell.setBackgroundRGB(MIN_COLOR_LEVEL + red, MIN_COLOR_LEVEL + green, MIN_COLOR_LEVEL + blue);
      }
    }  
  }
}
