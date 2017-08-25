/*
# Binary Search Alhorithm - in Typescript
- Alistair MacDonald
- About: https://en.wikipedia.org/wiki/Binary_search_algorithm
*/
var output = document.getElementById('output');
var styleCell = function (elem) {
    elem.style.border = '1px solid black';
    elem.style.width = '20px';
    elem.style.height = '20px';
    elem.style.fontSize = '12px';
    elem.style.display = 'inline-block';
};
var styleBlue = function (elem) {
    elem.style.backgroundColor = '#0ad';
};
var styleLegend = function (elem) {
    elem.style.border = '1px solid black';
    elem.style.width = '20px';
    elem.style.height = '20px';
    elem.style.fontSize = '12px';
    elem.style.display = 'inline-block';
    elem.style.backgroundColor = '#ad0';
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
var displayArray = function (ary, start, end) {
    var row = document.createElement('div');
    for (var i = 0; i < ary.length; i += 1) {
        var cell = document.createElement('div');
        cell.innerHTML = String(ary[i]);
        styleCell(cell);
        if (i >= start && i <= end) {
            styleBlue(cell);
        }
        row.appendChild(cell);
    }
    output.appendChild(row);
};
var compare = function (target, ary, start, end) {
    var range = end - start;
    var midPoint = start + (range / 2);
    var midIndex = Math.floor(midPoint);
    var midValue = ary[midIndex];
    if (midValue === target) {
        'Found Index for Target!';
        displayArray(ary, midIndex, midIndex);
        return midIndex;
    }
    if (target < midValue) {
        console.log('Chop Left');
        start = start;
        end = midIndex;
    }
    if (target > midValue) {
        console.log('Chop Right');
        start = midIndex;
    }
    displayArray(ary, start, end);
    if (ary.length === 1) {
        console.log('Exhausted Array!');
        return false;
    }
    return compare(target, ary, start, end);
};
var search = function (target, ary) {
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
    1, 2, 3, 4, 6, 7, 10, 13, 14, 18, 19, 21, 24, 37, 40, 45, 71
];
var legendAry = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
];
displayLegend(legendAry);
console.log(myAry);
var target = 7;
var foundIndex = search(target, myAry);
if (foundIndex) {
    console.log("The target: " + target + " was found at index: " + foundIndex);
}
else {
    console.log("The target: " + target + " was not found in this array");
}
//# sourceMappingURL=binary-search.js.map