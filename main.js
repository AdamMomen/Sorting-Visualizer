// HELP FUNCTIONS

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

/////////////////////////////////////////////////////////////

var RandGenArr = [];
var arrayLength = 10;
var maxRandValue = 5;


function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(maxRandValue));
}

// maybe need to refactor it later in order to connect to html.
function getRandomArray() {
var array =	Array(arrayLength);
return map(array, function (element,i) {
 		 return getRandomInt();
 });
}

// $('#randArrGenBtn').click(function () {

// 	var randomNumDiv = $('#RandomNumbers').html('');
// 		RandGenArr = getRandomArray();
// 	console.log(RandGenArr);	

// 	each(RandGenArr, function (element, index) {
// 		$(randomNumDiv).append( element );
// 	});
// })
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

////////////////
var bubbleRunning = false;
$('#randArrGenBtn').click(function () {
if (bubbleRunning) {
  return alert ('BubbleSort is RUNNING')
  }
  generateBlocksBubble();
});
$('#sort').click(function () {
  if (bubbleRunning) {
  return alert ('BubbleSort is RUNNING')
  }
	bubbleSort();
 });


const container = document.querySelector(".bubbleData-container");
  
function generateBlocksBubble(num = 20) {
$(container).html('');
  if (num && typeof num !== "number") {
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
  //  container.appendChild(block);
    $(container).append(block)
  }
}

function swap(el1, el2) {
  return new Promise(resolve => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");

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

async function bubbleSort(delay = 100) {
  bubbleRunning = true;
  if (delay && typeof delay !== "number") {
    alert("sort: First argument must be a typeof Number");
    return;
  }
  let blocks = document.querySelectorAll(".block");
  for (let i = 0; i < blocks.length - 1; i++) {
    for (let j = 0; j < blocks.length - i - 1; j++) {
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
        await swap(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll(".block");
      }

      blocks[j].style.backgroundColor = "#58B7FF";
      blocks[j + 1].style.backgroundColor = "#58B7FF";
    }
    //set the last element color to green. 
    blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
  }
  bubbleRunning = false;
}
generateBlocksBubble();