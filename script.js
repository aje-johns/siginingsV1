"use strict";
let inputUMR = [
  "Pencil",
  "Binder",
  "Pencil",
  "Pen",
  "Pencil",
  "Binder",
  "Pencil",
  "Pencil",
  "Pencil",
  "Binder",
  "Pencil",
  "Binder",
  "Binder",
  "Pencil",
  "Desk",
  "Pen Set",
  "Binder",
  "Pen",
  "Pen",
  "Pen Set",
  "Pencil",
  "Pen Set",
  "Binder",
  "Binder",
  "Binder",
  "Binder",
  "Pen Set",
  "Pencil",
  "Pen",
  "Pencil",
  "Binder",
  "Desk",
  "Pen Set",
  "Pen Set",
  "Pen Set",
  "Desk",
  "Pencil",
  "Pen",
  "Binder",
  "Pencil",
  "Binder",
  "Binder",
  "Binder",
];
const userArray = ["user1", "user2"];

function removeBrokerCode(umr, index) {
  //if the index is 5 Then the broker code can be removedon the acutal data
  let umrWitNoBrokerCode = [];
  umr.forEach((element) => {
    let umrWithBrokerRemoved = element.slice(index);
    umrWitNoBrokerCode.push(umrWithBrokerRemoved);
  });
  return umrWitNoBrokerCode;
}

const umrWitNoBrokerCode = removeBrokerCode(inputUMR, 2);

function getRepetetion(umrWitNoBrokerCode) {
  let umrAndCount = [];

  umrWitNoBrokerCode.forEach((umr) => {
    umrAndCount[umr] = umrAndCount[umr] ? umrAndCount[umr] + 1 : 1;
  });

  //the umrAndCount variable is an object that has umr and its count
  //Object.entries(umrAndCount) will display it in an array like fashion

  //spliting the umrAndCount object into an Array and then
  //allocationg the data in array into an object for ease of access
  let umrObjectArray = [];
  Object.entries(umrAndCount).forEach((umrArray) => {
    //we have to create the umr Objects inside the foreach loop
    //and then push it into an array
    let umrObject = { umr: umrArray[0], duplicateEntries: umrArray[1] };
    umrObjectArray.push(umrObject);
  });
  return umrObjectArray;
}
const umrAndDupicate = getRepetetion(umrWitNoBrokerCode);

//////////////////////////////////
//////////////////Allocate () ////
//////////////////////////////////
//////////////////////////////////

const userObj = createUserObj(userArray);

function allocate(umrAndDupicate, userObj) {
  console.log(umrAndDupicate);
  console.log(userObj);

  //we are doing the below step to prevent altering the original Array
  let remainingSignings = umrAndDupicate.slice();
  //sorting the remainingSignings in Ascending Order
  // assigning to a new variable is not necessary because this effects the Original Array
  remainingSignings.sort(function (a, b) {
    return a.duplicateEntries - b.duplicateEntries;
  });
  console.log("The sorted Array");
  console.log(remainingSignings);

  // We enter a loop and it will go on until there are no more signings left

  let remainingSigningsTEMP = remainingSignings.slice();

  // This loop will go on until there are no signings left
  //CHANGE IF TO WHILE

  while (remainingSigningsTEMP.length >= 0) {
    if (remainingSigningsTEMP.length == 0) {
      break;
    } else {
      console.log("remainingSigningsTEMP -- Check");
      // let allocationObj = [];
      // let userWithAllocation = {}

      userObj.forEach((user) => {
        console.log("current user is");
        console.log(user);

        function firstAllocation() {
          console.log(
            `the user ${user.userName} will have its First Allocation`
          );
          let signingsToBeAllocated = remainingSigningsTEMP.pop();
          user.allocatedUMR = signingsToBeAllocated;
          user.totalCount = signingsToBeAllocated.duplicateEntries;
        }

        // let currentUserName = user.userName;
        // let currentAllocation = user.allocatedUMR;
        // let currentTotalCount = user.totalCount;
        if (user.allocatedUMR == 0) {
          firstAllocation();
        } else if (user.allocatedUMR > 0) {
          //Time for second set of allocation
          console.log("The while condition");
          remainingSigningsTEMP.pop();
          //sort the userObj and keep allocatig to the bottom one
        } // end of Else
        //  else {
      });
    }
  }

  // for (let i = 0; i < remainingSignings.length; i++) {
  //   userObj.forEach((item) => {});

  //   const signingsObjToBeAllocated = remainingSigningsTEMP.pop();
  //   const countOfSignings = signingsObjToBeAllocated.duplicateEntries;
  //   console.log(countOfSignings);
  // }
}

//   remainingSignings.forEach((item) => {
//     let count = item.duplicateEntries;
//     console.log(item);
//     console.log(count);
//   });
// }

allocate(umrAndDupicate, userObj);

function createUserObj(userArray) {
  let userObjectArray = [];
  userArray.forEach((item) => {
    let userObj = {
      userName: item,
      allocatedUMR: [],
      totalCount: 0,
    };
    userObjectArray.push(userObj);
  });
  return userObjectArray;
}

console.log(userObj);

// const repetedUmr = getRepetetion(umrWitNoBrokerCode);

// console.log(typeof repetedUmr);
/*
removeBrokerCode()
getRepetetion()
allocate()
swapUMRandUsername()

This is you sort (if you add .reverse() in the end it will get reversed)
  // console.log(
  //   umrAndDupicate.sort(function (a, b) {
  //     return b.duplicateEntries - a.duplicateEntries;
  //   })
  // );

*/
