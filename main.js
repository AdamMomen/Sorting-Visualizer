// THIS IS THE MAIN JS CODE.
//===============================================
// HELPER FUNCTIONS
function each(coll, f) {
    if (Array.isArray(coll)) {
      for (var i = 0; i < coll.length; i++) {
        f(coll[i], i);
      }
    } else {
      for (var key in coll) {
        f(coll[key], key);
      }
    }
  }
  
  function filter(array, predicate) {
    var acc = [];
    each(array, function(element, i) {
      if (predicate(element, i)) {
        acc.push(element);
      }
    });
    return acc;
  }
  
  function map(array, func) {
    var acc = [];
    each(array, function(element, i) {
      acc.push(func(element, i));
    });
    return acc;
  }
  
  function reduce(array, f, acc) {
    if (acc === undefined) {
      acc = array[0];
      array = array.slice(1);
    }
    each(array, function(element, i) {
      acc = f(acc, element, i);
    });
    return acc;
  }

//*****************************************THIS CODE IS AUXILIARY TO SHOW THE SORTING IN SIMPLER FORM.**************************************
var RandGenArr = [];
var arrayLength = 10;
var maxRandValue = 5;


function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(maxRandValue));
}
 function move (array,from, to) {
      var temp =  array.splice(to, 1, array[from]);
      array.splice(from, 1, temp[0]);
 }

function sortArray(array) {
  for (var i = 0; i < array.length; i++) {  
   for(var j = i; j < array.length ; j++) {
    if (array[i] > array[j] ) {
       move(array, i, j);
      }
    }
  }
return array;
}
//====================================== MAIN PROJECT CORE ALGROTHIMS ===============================================================
var numberOfBlocks = parseInt($("#Range").val());
const container = document.querySelector(".data-container");
var sortingOperation = false;

$('input').click(function () {

   var text = $("input:checked").val();
   $('.header').text(text);

})

$('#randArrGenBtn').click(function () {
if (sortingOperation) {
  return alert ('SORTING operation is RUNNING PLEASE Wait')
  }
 generateBlocksBubble();
});

$('#sort').click(function () {
 if ($("input:checked").val() === undefined){
  return alert('Please select sorting algorithm');
 }
  if (sortingOperation) {
    return alert ('SORTING operation is RUNNING PLEASE Wait')
    }
  mergeSort();
  bubbleSort();
});
$('#Range').click(function () {
   if (sortingOperation) {
    return alert('Please wait until the sortin is done');
  }
    numberOfBlocks = parseInt($("#Range").val());
    generateBlocksBubble();
    $('#valOfSlider').text(numberOfBlocks);
})


 //============================>RANDOM BLOCK GENERATOR<==========================//
function generateBlocksBubble(num = numberOfBlocks) {
$(container).html('');
  if (typeof num !== "number") {
    alert("First argument must be a typeof Number");
    return;
  }
  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random() * 100);

    const block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${value * 3}px`;
    block.style.transform = `translateX(${i * 30}px)`;

    const blockLabel = document.createElement("label");
    blockLabel.classList.add("block__id");
    blockLabel.innerHTML = value;

    block.appendChild(blockLabel);
    $(container).append(block)
  }
}


//** each page refresh will generate a new random block
generateBlocksBubble();
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
async function bubbleSort(delay = 100) {
  if ($("input:checked").val() === 'Bubble Sort') {
    sortingOperation = true;
    if (delay && typeof delay !== "number" ) {
    alert("sort: First argument must be a typeof Number");
    return;
  }
  let blocks = document.querySelectorAll(".block");
  for (let i = 0; i < blocks.length - 1; i++) {
    for (let j = 0; j < blocks.length - i - 1; j++) {
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
        await swap(blocks[j], blocks[j + 1]);  //calling the swap function and waiting until the transition ends
        blocks = document.querySelectorAll(".block");
      }
      //set element current index and following to different color style.
      blocks[j].style.backgroundColor = "#58B7FF";
      blocks[j + 1].style.backgroundColor = "#58B7FF";
    }
    //set the last element color to green. 
    blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
  }
}
  //setting the operation flage to false, ending of sorting .
  sortingOperation = false;
}
 //==============================>MERGE SORTER FUNCTION<=============================//
async function mergeSort(delay = 100) {
  if ($("input:checked").val() === 'Merge Sort') {
    sortingOperation = true;
  if (delay && typeof delay !== "number") {
    alert("sort: First argument must be a typeof Number");
    return;
  }
  let blocks = document.querySelectorAll(".block");
  const blocksMiddleIdx = Math.floor((blocks.length - 1) / 2);
  //THIS PART FOR THE FIRST HALF OF THE BLOCK.
  for (let i = 0; i < blocksMiddleIdx ; i++) {
    for (let j = 0; j < blocksMiddleIdx - i ; j++) {
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
        await swap(blocks[j], blocks[j + 1]);  //calling the swap function and waiting until the transition ends
        blocks = document.querySelectorAll(".block");
      }
      //set element current index and following to different color style.
      blocks[j].style.backgroundColor = "#58B7FF";
      blocks[j + 1].style.backgroundColor = "#58B7FF";
    }
    //set the last element color to green. 
    blocks[blocksMiddleIdx - i ].style.backgroundColor = "#13CE66";
}
    //THIS IS FOR THE NEXT HALF OF THE BLOCKS.
    for (let i = blocksMiddleIdx + 1; i < blocks.length - 1 ; i++) {
      for (let j = blocksMiddleIdx + 1; j <blocks.length - i - 1 ; j++) {

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
        await swap(blocks[j], blocks[j + 1]);  //calling the swap function and waiting until the transition ends
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
  sortingOperation = false;
} 