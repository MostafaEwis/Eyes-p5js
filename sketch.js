let pupilOff = { x: 0, y: 0 }; //for the pupil offset
let wideOff = { x: 0, y: 0 }; //for the glasses sticks
let narrowOff = { x: 0, y: 0 }; //for the eye and the frames of the glasses
// the offset from every eye to the center
let initialEyeOff = 100;
//the stroke of the eye keeper that holds the pupil from getting outside of the eye
let keeperStrokeWidth = 50;
//the eyes are drawn with an ellipse, these are its dimensions
let eyeWidth = 130;
let eyeHeight = 60;
//the radius of the eye pupil
let pupilRadius = 70;
//the space between the eyes and the glasses frame
let frameOff = 20;
let extenderLength = 15;
let halFrame = eyeWidth / 2 + frameOff / 2;
let wearGlasses;
// the eye place and the pupil place are used in many cases here so I created an object for them, so I don't need to calculate them everytime
let eyePlace = { xLeft: 0, xRight: 0, y: 0 };
let pupilPlace = { xLeft: 0, xRight: 0, y: 0 };

function setup() {
  createCanvas(700, 700);
  // changing the cursor to the forbidden
  cursor("not-allowed");
  wearGlasses = createCheckbox("Wear Glasses", true);
  wearGlasses.changed(resetOffset);
  //styling the checkbox
  wearGlasses.style("font-family", "Arial");
  wearGlasses.style("position", "relative");
  wearGlasses.style("margin-top", "-100px");
  wearGlasses.style("margin-left", `${width / 2 - 50}px`);
  wearGlasses.style("text-size", "40px");
  wearGlasses.style("color", "white");
}

const resetOffset = () => {
  pupilOff = { x: 0, y: 0 };
  wideOff = { x: 0, y: 0 };
  narrowOff = { x: 0, y: 0 };
};

function draw() {
  background("pink");
  //movement of the eyes and the glasses
  //the eyes or the glasses only move if the mouse is between the borders of the sketch else it gets to its original position.
  if (mouseX < width && mouseY < height) {
    if (wearGlasses.checked()) {
      //moving the sticks of the glasses in a wider range, as it's supposed to be on the sides of the head if the head moves.
      wideOff.x = map(mouseX, 0, width, 135, -135);
      wideOff.y = map(mouseY, 0, width, 135, -135);
      //moving the eye and the rest of the glasses in a narrow range as it's supposed to be on the front of the face if the head moves.
      narrowOff.x = map(mouseX, 0, width, 38, -38);
      narrowOff.y = map(mouseY, 0, width, 38, -38);
      //the pupil should move slightly in an opposite way of the eye.
      pupilOff.x = map(mouseX, 0, width, -7, 7);
      pupilOff.y = map(mouseY, 0, width, 7, -7);
    } else {
      //moving only the pupil, to make an illusion that pupil is following the cursor while the rest of the head is staying still.
      pupilOff.x = map(mouseX, 0, width, -30, 30);
      pupilOff.y = map(mouseY, 0, width, -30, 30);
    }
  } else {
    resetOffset();
  }

  //the eyes are drawn with an offset from the center equal to intialEyeoff, then moved away in cases like wearing glasses by the narrow offset
  eyePlace.xLeft = width / 2 + narrowOff.x - initialEyeOff;
  eyePlace.xRight = width / 2 + narrowOff.x + initialEyeOff;
  eyePlace.y = height / 2 + narrowOff.y;
  //the eye pupils are drawn with an offset from the center equal to intialEyeoff, then moved away in cases like wearing glasses or looking at the curssor by the pupil offset
  pupilPlace.xLeft = width / 2 + pupilOff.x - initialEyeOff;
  pupilPlace.xRight = width / 2 + pupilOff.x + initialEyeOff;
  pupilPlace.y = height / 2 + pupilOff.y;

  noStroke();

  //rigth eye
  fill("white");
  ellipse(eyePlace.xRight, eyePlace.y, eyeWidth, eyeHeight);
  //right eye pupil
  fill("purple");
  circle(pupilPlace.xRight, pupilPlace.y, pupilRadius);
  //left eye
  fill("white");
  ellipse(eyePlace.xLeft, eyePlace.y, eyeWidth, eyeHeight);
  //left eye pupil
  fill("purple");
  circle(pupilPlace.xLeft, pupilPlace.y, pupilRadius);
  //drawing an empty circles wrapping around the eyes to prevent the pupil from showing outside of the eye
  noFill();
  strokeWeight(keeperStrokeWidth);
  //changing this color will show you the borders
  stroke("pink");
  //right eye keeper
  ellipse(
    eyePlace.xRight,
    eyePlace.y,
    eyeWidth + keeperStrokeWidth,
    eyeHeight + keeperStrokeWidth
  );
  //left eye keeper
  ellipse(
    eyePlace.xLeft,
    eyePlace.y,
    eyeWidth + keeperStrokeWidth,
    eyeHeight + keeperStrokeWidth
  );
  //drawing the glasses
  if (wearGlasses.checked()) {
    //this part starts from the end of the left eye frame and ends at the start of the right frame
    //drawing the middle part of the glasses with a heavier stroke
    stroke("black");
    strokeWeight(5);

    line(
      eyePlace.xLeft + halFrame,
      eyePlace.y,
      eyePlace.xRight - halFrame,
      eyePlace.y
    );
    //drawing the glasses lenses

    //using a lighter stroke for the rest of the glasses
    strokeWeight(3);
    //the frames are at the same palce of the eyes, but made bigger

    //right lense
    ellipse(
      eyePlace.xRight,
      eyePlace.y,
      eyeWidth + frameOff,
      eyeHeight + frameOff
    );
    //left lense
    ellipse(
      eyePlace.xLeft,
      eyePlace.y,
      eyeWidth + frameOff,
      eyeHeight + frameOff
    );
    //the right glasses stick
    line(
      eyePlace.xRight + halFrame + extenderLength,
      eyePlace.y,
      width / 2 + initialEyeOff + halFrame + extenderLength + wideOff.x,
      200 + wideOff.y
    );
    //the left glasses stick
    line(
      eyePlace.xLeft - halFrame - extenderLength,
      eyePlace.y,
      width / 2 - initialEyeOff - halFrame - extenderLength + wideOff.x,
      200 + wideOff.y
    );
    //the right stick extender
    line(
      eyePlace.xRight + halFrame,
      eyePlace.y,
      eyePlace.xRight + halFrame + extenderLength,
      eyePlace.y
    );
    //the left stick extender
    line(
      eyePlace.xLeft - halFrame,
      eyePlace.y,
      eyePlace.xLeft - halFrame - extenderLength,
      eyePlace.y
    );
  }
}
