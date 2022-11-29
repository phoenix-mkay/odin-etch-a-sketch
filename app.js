const gridContainer = document.querySelector('.grid-container')
const setBoxesButton = document.querySelector('.rqst_sqrs')
const resetBtn = document.querySelector('.reset')

const defaultColor = document.querySelector('.default')
const randomColor = document.querySelector('.random')
const eraserBtn = document.querySelector('.eraser')
let colorBtnType


setBoxesButton.addEventListener('click',setBoxes)
function setBoxes(){
    let boxesSize=parseInt(prompt('Number of squares per side for the new grid'));
    if(boxesSize >18 || boxesSize < 1){
        alert('A larger number of squares results in more computer resources being used, potentially causing delays, freezing, or crashing that we want to prevent.Kindly use a maximum of 18')
    }
    else{
        resetGrid()
        createGrid(+boxesSize)
    }
}

function createGrid(inputSize){
    for(let i = 0;i<(inputSize * inputSize);i++){
        const squareBox =document.createElement('div')
        squareBox.classList.add('square')
        squareBox.addEventListener("mouseover",changeColor)
        gridContainer.appendChild(squareBox)

    }

    gridContainer.style.gridTemplateColumns = `repeat(${inputSize},1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${inputSize},1fr)`
}

// Create our divs on load
window.addEventListener('load',createGrid(16))


// Function to clear the grid divs, and call on createGrid to create a new set of grid divs
function resetGrid() {
    while (gridContainer.firstChild) { 
      gridContainer.removeChild(gridContainer.firstChild);  
    }
  }

// add event on the reset button
resetBtn.addEventListener('click',() =>{
    resetGrid()
    createGrid(16)
    colorBtnType = "reset"
    defaultColor.classList.remove("active")
    randomColor.classList.remove("active")
    eraserBtn.classList.remove('active')
})

// function to change background color using mouseover event
function changeColor(e){
    if (colorBtnType === "random") {  
        const randomR = Math.floor(Math.random() * 256) 
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        e.target.classList.remove('erasing')
      } else if (colorBtnType === "default") {
        e.target.style.backgroundColor = '#f7797d' ;
        e.target.classList.remove('erasing')
      }else if(colorBtnType === "erase"){
        e.target.style.background = `transparent`
        e.target.classList.add('erasing')
      }
      else if(colorBtnType = "reset"){
        e.target.classList.remove('erasing')
      }
}

// Default color button
defaultColor.addEventListener("click",() =>{
    colorBtnType = "default"
    defaultColor.classList.add("active")
    randomColor.classList.remove("active")
    eraserBtn.classList.remove('active')
    clearBackground()
})

// Random color Button
randomColor.addEventListener('click',()=>{
    colorBtnType = "random"
    randomColor.classList.add("active")
    defaultColor.classList.remove("active")
    eraserBtn.classList.remove('active')
    clearBackground()
})

// Clear Background Color
function clearBackground(){
    //  Get All siblings
    const getAllSiblings = gridContainer.querySelectorAll('div')
    // console.log(getAllSiblings)
    getAllSiblings.forEach(sibling =>{
        sibling.style.background = 'transparent'
        
    })
}


// Add eraser functionality
eraserBtn.addEventListener('click',()=>{
    colorBtnType = "erase"
    eraserBtn.classList.add('active')
    randomColor.classList.remove("active")
    defaultColor.classList.remove("active")
})