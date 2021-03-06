// THIS IS THE MAIN JS CODE.
//====================================== MAIN PROJECT CORE ALGROTHIMS ===============================================================
//Variable block generation
var mySound = new sound("bounce.mp3");
var numberOfBlocks = parseInt($("#Range").val());
var delayTime = parseInt($("#myTime").val());
const container = document.querySelector(".data-container");
var sortingOperation = false;
var exitLoop = false;

//on click on the input checkbox input show the algorithm title on body.
$("input").click(function() {
  var text = $("input:checked").val();
  $(".header").text(text);
});
//on click on Random Block Generate , call generateBlocks
$("#randblkGenBtn").click(function() {
  if (sortingOperation) {
    return alert("SORTING operation is RUNNING PLEASE Wait");
  }
  generateBlocks();
});
//on click sort start sorting.
$("#sort").click(function() {
  if ($("input:checked").val() === undefined) {
    return alert("Please select sorting algorithm");
  }
  if (sortingOperation) {
    return alert("SORTING OPERATION IS RUNNING PLEASE WAIT");
  }
  mergeSort();
  bubbleSort();
  selectionSort();
});
//on click on slider show the number of blocks
$("#Range").click(function() {
  if (sortingOperation) {
    return alert("Please wait until the sorting is done");
  }
  numberOfBlocks = parseInt($("#Range").val());
  generateBlocks();
  $("#valOfSlider").text(numberOfBlocks + " Blocks");
});
//on click on slider show animation delay.
$("#myTime").click(function() {
  if (sortingOperation) {
    return alert("Please wait until the sorting is done");
  }
  delayTime = parseInt($("#myTime").val());
  $("#timeOfSlider").text(delayTime + " ms ");
});
//on stop click stop the sorting
$("#stop").click(function() {
  if (sortingOperation === false) {
    return alert("The sorting has already stopped");
  }
  exitLoop = true;
  console.log(exitLoop);
});
//This function is for sound effect
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
}
//============================>RANDOM BLOCK GENERATOR<==========================//
function generateBlocks(num = numberOfBlocks) {
  $(container).html("");
  if (typeof num !== "number") {
    alert("First argument must be a typeof Number");
    return;
  }
  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random() * 100);
    //create  cnost of div
    const block = document.createElement("div");
    //add class named block
    block.classList.add("block");
    //set the height of the block to a random generated value scaled by 3.
    block.style.height = `${value * 3}px`;
    //set a block width of 30 px.
    block.style.transform = `translateX(${i * 30}px)`;

    const blockLabel = document.createElement("label");
    blockLabel.classList.add("block__id");
    blockLabel.innerHTML = value;

    block.appendChild(blockLabel);
    $(container).append(block);
  }
}

//** each page refresh will generate a new random block
generateBlocks();
//**
function swap(el1, el2) {
  return new Promise(resolve => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");
    //fliping the styling of the element
    el1.style.transform = transform2;
    el2.style.transform = transform1;

    // Wait for the transition to end!
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 250);
    });
  });
}
//===============================>Bubble Sorted Funvtion<===========================//
//bubble function that takes the delay time value in ms;
async function bubbleSort(delay = delayTime) {
  if ($("input:checked").val() === "Bubble Sort") {
    sortingOperation = true;
    if (typeof delay !== "number") {
      alert("sort: First argument must be a typeof Number");
      return;
    }

    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i++) {
      for (let j = 0; j < blocks.length - i - 1; j++) {
        if (exitLoop === true) {
          break;
        } else {
          blocks[j].style.backgroundColor = "#FF4949";
          blocks[j + 1].style.backgroundColor = "#FF4949";
          //making delay time , asyncrounsly form the main excution time.
          await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, delay)
          );
          //takes the values of index and the following index from blocks div
          const value1 = Number(blocks[j].childNodes[0].innerHTML);
          const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

          if (value1 > value2) {
            await swap(blocks[j], blocks[j + 1]); //calling the swap function and waiting until the transition ends
            blocks = document.querySelectorAll(".block");
          }
          mySound.play();
          //set element current index and following to different color style.
          blocks[j].style.backgroundColor = "#58B7FF";
          blocks[j + 1].style.backgroundColor = "#58B7FF";

          //set the last element color to green.
          blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
          //setting the operation flage to false, ending of sorting .
        }
        sortingOperation = false;
        exitLoop = false;
      }
    }
  }
}
//==============================>MERGE SORTER FUNCTION<=============================//
async function mergeSort(delay = delayTime) {
  if ($("input:checked").val() === "Merge Sort") {
    sortingOperation = true;
    if (typeof delay !== "number") {
      alert("sort: First argument must be a typeof Number");
      return;
    }
    let blocks = document.querySelectorAll(".block");
    const blocksMiddleIdx = Math.floor((blocks.length - 1) / 2);
    //THIS PART FOR THE FIRST HALF OF THE BLOCK.
    for (let i = 0; i < blocksMiddleIdx; i++) {
      for (let j = 0; j < blocksMiddleIdx - i; j++) {
        //this will break the function if the stop button cliked.
        if (exitLoop === true) {
          break;
        } else {
          blocks[j].style.backgroundColor = "#FF4949";
          blocks[j + 1].style.backgroundColor = "#FF4949";
          await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, delay)
          );
          //takes the values of index and the followig index from blocks div
          const value1 = Number(blocks[j].childNodes[0].innerHTML);
          const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

          if (value1 > value2) {
            await swap(blocks[j], blocks[j + 1]); //calling the swap function and waiting until the transition ends
            blocks = document.querySelectorAll(".block");
          }
          //play the sound effect.
          mySound.play();
          //set element current index and following to different color style.
          blocks[j].style.backgroundColor = "#58B7FF";
          blocks[j + 1].style.backgroundColor = "#58B7FF";

          //set the last element color to green.
          blocks[blocksMiddleIdx - i].style.backgroundColor = "#13CE66";

          //THIS IS FOR THE NEXT HALF OF THE BLOCKS.
          for (let i = blocksMiddleIdx + 1; i < blocks.length - 1; i++) {
            for (let j = blocksMiddleIdx + 1; j < blocks.length - i - 1; j++) {
              blocks[j].style.backgroundColor = "#FF4949";
              blocks[j + 1].style.backgroundColor = "#FF4949";
              await new Promise(resolve =>
                setTimeout(() => {
                  resolve();
                }, delay)
              );

              //takes the values of index and the followig index from blocks div
              const value1 = Number(blocks[j].childNodes[0].innerHTML);
              const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

              if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]); //calling the swap function and waiting until the transition ends
                blocks = document.querySelectorAll(".block");
              }
              //set element current index and following to different color style.
              blocks[j].style.backgroundColor = "#58B7FF";
              blocks[j + 1].style.backgroundColor = "#58B7FF";
            }
            //set the last element color to green.
            blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
            //setting the operation flage to false, ending of sorting .
          }
        }
        //reseting the operation and exit state flags.
        sortingOperation = false;
        exitLoop = false;
      }
    }
  }
}
//=============================================SELECTION SORT ALGORITMH==========================================
async function selectionSort(delay = delayTime) {
  if ($("input:checked").val() === "Selection Sort") {
    sortingOperation = true;
    if (typeof delay !== "number") {
      alert("sort: First argument must be a typeof Number");
      return;
    }

    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i++) {
      for (let j = 0; j < blocks.length - i - 1; j++) {
        if (exitLoop === true) {
          break;
        } else {
          blocks[j].style.backgroundColor = "#FF4949";
          blocks[j + 1].style.backgroundColor = "#FF4949";
          //making delay time , asyncrounsly form the main excution time.
          await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, delay)
          );
          //takes the values of index and the following index from blocks div
          const value1 = Number(blocks[j].childNodes[0].innerHTML);
          const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

          if (value1 < value2) {
            await swap(blocks[j], blocks[j + 1]); //calling the swap function and waiting until the transition ends
            blocks = document.querySelectorAll(".block");
          }

          //play the sound effect
          mySound.play();
          //set element current index and following to different color style.
          blocks[j].style.backgroundColor = "#58B7FF";
          blocks[j + 1].style.backgroundColor = "#58B7FF";

          //set the last element color to green.
          blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";

          //setting the operation flage to false, ending of sorting .
        }
        sortingOperation = false;
        exitLoop = false;
      }
    }
  }
}
