/*
# Binary Search Alhorithm - in Typescript
- Alistair MacDonald
- About: https://en.wikipedia.org/wiki/Binary_search_algorithm
*/
var output = document.getElementById('output');
var input = document.getElementById('input');
var styleCell = function (elem) {
    elem.style.border = '1px solid black';
    elem.style.width = '20px';
    elem.style.height = '20px';
    elem.style.fontSize = '12px';
    elem.style.textAlign = 'center';
    elem.style.display = 'inline-block';
};
var styleBlue = function (elem) {
    elem.style.backgroundColor = '#0af';
};
var styleColor = function (elem, color) {
    elem.style.backgroundColor = color;
};
var styleLegend = function (elem) {
    elem.style.border = '1px solid black';
    elem.style.width = '20px';
    elem.style.height = '20px';
    elem.style.fontSize = '12px';
    elem.style.textAlign = 'center';
    elem.style.display = 'inline-block';
    elem.style.backgroundColor = '#fa0';
};
var displayLegend = function (ary) {
    var row = document.createElement('div');
    for (var i = 0; i < ary.length; i += 1) {
        var cell = document.createElement('div');
        cell.innerHTML = String(ary[i]);
        styleLegend(cell);
        row.appendChild(cell);
    }
    output.appendChild(row);
};
var displayArray = function (ary, start, end, color) {
    var row = document.createElement('div');
    for (var i = 0; i < ary.length; i += 1) {
        var cell = document.createElement('div');
        cell.innerHTML = String(ary[i]);
        styleCell(cell);
        if (i >= start && i <= end) {
            styleBlue(cell);
            if (color) {
                styleColor(cell, color);
            }
        }
        row.appendChild(cell);
    }
    output.appendChild(row);
};
var iterCount;
var maxIterations;
var compare = function (target, ary, start, end) {
    var range = end - start;
    var midPoint = start + (range / 2);
    var midIndex = Math.floor(midPoint);
    var midValue = ary[midIndex];
    if (iterCount > maxIterations) {
        return false;
    }
    iterCount += 1;
    if (midValue === target) {
        console.log('Found Index for Target!');
        displayArray(ary, midIndex, midIndex, '#af0');
        return midIndex;
    }
    if (start === midIndex) {
        displayArray(ary, midIndex, midIndex, '#F00');
        return false;
    }
    if (target < midValue) {
        console.log("Chop Left: " + start + ", " + end);
        start = start;
        end = midIndex;
    }
    if (target > midValue) {
        console.log("Chop Right: " + start + ", " + end);
        start = midIndex;
    }
    displayArray(ary, start, end);
    return compare(target, ary, start, end);
};
var search = function (target, ary) {
    maxIterations = Math.ceil(Math['log2'](ary.length)) + 1;
    console.log("Max itterations: " + maxIterations + " (worst cast scenario)");
    iterCount = 0;
    var start = 0;
    var end = ary.length;
    displayArray(ary, start, end);
    var foundIndex = compare(target, ary, start, end);
    if (typeof foundIndex === 'number') {
        return foundIndex;
    }
    return false;
};
var myAry = [
    1, 2, 3, 4, 6, 7, 8, 10, 13, 14, 18, 19, 21, 24, 37, 40, 45, 71
];
var legendAry = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17
];
var setTarget = function (target) {
    displayLegend(legendAry);
    var foundIndex = search(target, myAry);
    if (foundIndex) {
        console.log("The target: " + target + " was found at index: " + foundIndex);
    }
    else {
        console.log("The target: " + target + " was not found in this array");
    }
};
input.addEventListener('change', function (event) {
    var newTargetValue = Number(event.target['value']);
    console.log("New target value: " + newTargetValue);
    setTarget(newTargetValue);
});
setTarget(7);
//# sourceMappingURL=binary-search.js.map