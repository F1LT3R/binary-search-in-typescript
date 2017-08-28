/*
# Binary Search Alhorithm - in Typescript
- Alistair MacDonald
- Concept: https://en.wikipedia.org/wiki/Binary_search_algorithm
- Github: https://github.com/F1LT3R/binary-search-in-typescript
- Blog: https://f1lt3r.io/binary-search-with-typescript
*/
var blue = '#0af';
var orange = '#fa0';
var red = '#f00';
var green = '#af0';
var graph = document.getElementById('graph');
var input = document.getElementById('input');
var ologn = document.getElementById('ologn');
var nochop = document.getElementById('nochop');
var logElem = document.getElementById('log');
var log = function (text) {
    var logText = document.createElement('div');
    logText.innerHTML = text;
    logElem.appendChild(logText);
};
var styleCell = function (elem) {
    elem.style.width = '20px';
    elem.style.height = '20px';
    elem.style.fontSize = '12px';
    elem.style.borderRadius = '3px';
    elem.style.margin = '0px 1px';
    elem.style.textAlign = 'center';
    elem.style.display = 'inline-block';
    elem.style.backgroundColor = '#ccc';
};
var styleColor = function (elem, color) {
    elem.style.backgroundColor = color;
};
var styleLegend = function (elem) {
    elem.style.width = '20px';
    elem.style.height = '20px';
    elem.style.fontSize = '12px';
    elem.style.textAlign = 'center';
    elem.style.borderRadius = '3px';
    elem.style.margin = '0px 1px';
    elem.style.display = 'inline-block';
    elem.style.backgroundColor = orange;
};
var displayLegend = function (ary) {
    var row = document.createElement('div');
    for (var i = 0; i < ary.length; i += 1) {
        var cell = document.createElement('div');
        cell.innerHTML = String(ary[i]);
        styleLegend(cell);
        row.appendChild(cell);
    }
    graph.appendChild(row);
};
var displayArray = function (ary, start, end, color) {
    var row = document.createElement('div');
    for (var i = 0; i < ary.length; i += 1) {
        var cell = document.createElement('div');
        cell.innerHTML = String(ary[i]);
        styleCell(cell);
        if (i >= start && i <= end) {
            styleColor(cell, color);
        }
        row.appendChild(cell);
    }
    graph.appendChild(row);
};
var FailExits;
(function (FailExits) {
    FailExits[FailExits["ologn"] = 0] = "ologn";
    FailExits[FailExits["nochop"] = 1] = "nochop";
})(FailExits || (FailExits = {}));
var exit = FailExits.ologn;
var iterCount;
var maxIterations;
var compare = function (target, ary, start, end) {
    // Change the index rather than chop the array
    var range = end - start;
    var midPoint = start + (range / 2);
    var midIndex = Math.floor(midPoint);
    var midValue = ary[midIndex];
    // Fail Exit Strategy 1: Max iterations is set to O(log(n))
    if (iterCount > maxIterations && exit === FailExits.ologn) {
        log("Exited after " + maxIterations + " itterations at O(log(n)");
        displayArray(ary, midIndex, end, red);
        return false;
    }
    iterCount += 1;
    // Found index when mid = target
    if (midValue === target) {
        displayArray(ary, midIndex, midIndex, green);
        return midIndex;
    }
    // Fail Exit Strategy 2: startIndex = midIndex
    if (start === midIndex && exit === FailExits.nochop) {
        log("Exited after " + maxIterations + " itterations at No-Chop");
        displayArray(ary, midIndex, end, red);
        return false;
    }
    // Chop Left
    if (target < midValue) {
        start = start;
        end = midIndex;
    }
    // Chop Right
    if (target > midValue) {
        start = midIndex;
    }
    displayArray(ary, start, end, blue);
    return compare(target, ary, start, end);
};
var search = function (target, ary) {
    maxIterations = Math.ceil(Math['log2'](ary.length)) + 1;
    log("Max-itterations: " + maxIterations + " (worst cast scenario)");
    iterCount = 0;
    var start = 0;
    var end = ary.length;
    displayArray(ary, start, end, blue);
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
var target = 11;
var setTarget = function (newTarget) {
    target = newTarget;
};
var start = function () {
    graph.innerHTML = '';
    logElem.innerHTML = '';
    displayLegend(legendAry);
    var foundIndex = search(target, myAry);
    if (foundIndex) {
        log("The target: " + target + " was found at index: " + foundIndex);
    }
    else {
        log("The target: " + target + " was not found in this array");
    }
};
var updateTargetValue = function (event) {
    var newTargetValue = Number(event.target['value']);
    setTarget(newTargetValue);
    start();
};
input.addEventListener('click', updateTargetValue);
input.addEventListener('change', updateTargetValue);
ologn.addEventListener('click', function (event) {
    var checked = event.target['checked'];
    exit = FailExits.ologn;
    start();
});
nochop.addEventListener('click', function (event) {
    var checked = event.target['checked'];
    exit = FailExits.nochop;
    start();
});
start();
//# sourceMappingURL=binary-search.js.map