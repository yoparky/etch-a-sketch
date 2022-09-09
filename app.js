"use strict";
const DEFAULT_SIZE = 16;
let ERASER_MARKER = true;
let BLACK_MARKER = false;
let COLOR_MARKER = false;

let drawmode = false;

const grid = document.getElementById('grid');
const slider = document.getElementById('slider');
const colorPicker = document.getElementById('colorpicker');
const monochromeButton = document.getElementById('black');
const eraserButton = document.getElementById('eraser');
const colorButton = document.getElementById('color');
const clearButton = document.getElementById('clear');
const sliderValueIndicator = document.getElementById('slidervaluecontainer');

// Color control
function eraserMarker() {
    ERASER_MARKER = true;
    BLACK_MARKER = false;
    COLOR_MARKER = false;
    monochromeButton.classList.remove('active');
    eraserButton.classList.add('active');
    colorButton.classList.remove('active');
}

function blackMarker() {
    ERASER_MARKER = false;
    BLACK_MARKER = true;
    COLOR_MARKER = false;
    monochromeButton.classList.add('active');
    eraserButton.classList.remove('active');
    colorButton.classList.remove('active');
}

function colorMarker() {
    ERASER_MARKER = false;
    BLACK_MARKER = false;
    COLOR_MARKER = true;
    monochromeButton.classList.remove('active');
    eraserButton.classList.remove('active');
    colorButton.classList.add('active');
}

// Grid
function getSize() {
    return slider.value;
}

function initGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('mouseover', colorCell);
//        cell.style.borderStyle = 'solid';
//        cell.style.borderWidth = 'thin';
        grid.appendChild(cell);
    }
}

function clearGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function toggleDrawMode(e) {
    if (e.type === 'mousedown') {
        drawmode = true;
    } else if (e.type === 'mouseup') {
        drawmode = false;
    }
}
function colorCell(e) {
    if (ERASER_MARKER && drawmode) {
        e.target.style.backgroundColor = 'white';
    } else if (BLACK_MARKER && drawmode) {
        e.target.style.backgroundColor = 'black';
    } else if (COLOR_MARKER && drawmode) {
        e.target.style.backgroundColor = colorPicker.value;
    }
}

function mouseClickListner(e) {
    if (e.type === 'mousedown') {
        alert('mousedown');
    } else if (e.type === 'mouseup') {
        alert('mouseup');
    }
}

// Slider control
function updateSliderValueIndicator() {
    while(sliderValueIndicator.firstChild) {
        sliderValueIndicator.removeChild(sliderValueIndicator.firstChild);
    }
    const size = getSize();
    const indicator = document.createElement('p');
    indicator.innerText = `${size} x ${size}`;
    sliderValueIndicator.appendChild(indicator);
}

function updateSlider() {
    clearGrid();
    const size = getSize();
    initGrid(size);
    blackMarker();
    updateSliderValueIndicator();
}


function clearButtonWipeGrid() {
    clearGrid();
    const size = getSize();
    initGrid(size);
}


function startup() { 
    document.body.addEventListener('mousedown', toggleDrawMode);
    document.body.addEventListener('mouseup', toggleDrawMode);
    slider.addEventListener('click', updateSlider);
    monochromeButton.addEventListener('click', blackMarker);
    colorButton.addEventListener('click', colorMarker);
    eraserButton.addEventListener('click', eraserMarker);
    clearButton.addEventListener('click', clearButtonWipeGrid);
    initGrid(DEFAULT_SIZE);
    updateSliderValueIndicator();
    blackMarker();
}

startup();