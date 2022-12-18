"use strict";
const textareaInput = document.getElementById("inputValues");
const outputUniqueValue = document.getElementById("outputValueUnique");
const button = document.getElementById("button");
const sliderValue = document.getElementById("sliderValue");
const slider = document.getElementById("numberOfAllocations");
let tBodyEl = document.querySelector("tbody");
let numberOfUsers = 0;
let userObj;
let inputUMR;
let userArray = [];

slider.addEventListener("input", () => {
  sliderValue.innerHTML = slider.value;
  numberOfUsers = slider.value;
});

console.log("no of users" + numberOfUsers);

button.addEventListener("click", () => {
  //REPLACE THESE CARIABLE NAMES TO MATCH THE CODE
  // const textAreaValue = textareaInput.value;
  // const originalInputValue = testInputValue.split("\n");
  const noOfAllocation = Number(numberOfUsers);
  console.log(noOfAllocation);

  getUserList(noOfAllocation);

  const umrInput = textareaInput.value;
  inputUMR = umrInput.split("\n");

  const umrWitNoBrokerCode = removeBrokerCode(inputUMR, 2);

  const umrAndDupicate = getRepetetion(umrWitNoBrokerCode);

  userObj = createUserObj(userArray);

  allocate(umrAndDupicate, userObj);
  const finalAllocation = swap(userObj);
  console.log("here end");
  console.log(finalAllocation);
});

function getUserList(count) {
  for (let i = 0; i < count; i++) {
    let userName = prompt(`Enter Name of user ${i + 1}: `);
    userArray.push(userName);
  }
  console.log(userArray);
}

// const umrInput = textareaInput.value;
// const inputUMR = umrInput.split("\n");

// const umrWitNoBrokerCode = removeBrokerCode(inputUMR, 2);

// const umrAndDupicate = getRepetetion(umrWitNoBrokerCode);

// const userObj = createUserObj(userArray);

// allocate(umrAndDupicate, userObj);

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

function allocate(umrAndDupicate, userObj) {
  //we are doing the below step to prevent altering the original Array
  let remainingSignings = umrAndDupicate.slice();
  //sorting the remainingSignings in Ascending Order
  // assigning to a new variable is not necessary because this effects the Original Array
  remainingSignings.sort(function (a, b) {
    return a.duplicateEntries - b.duplicateEntries;
  });

  for (let i = 0; i < umrAndDupicate.length; i++) {
    // userObj.forEach((user) => {//the forEach wont work, i have to use a for loop
    //sort it and allocate to the user that has the least count
    for (let j = 0; j < userObj.length; j++) {
      userObj.sort(function (a, b) {
        return b.totalCount - a.totalCount;
      });

      let singingsOnStage = remainingSignings.pop();
      let currentUser = userObj.at(-1);
      if (singingsOnStage == undefined) {
        return;
      } else {
        currentUser.allocatedUMR.push(singingsOnStage);
        currentUser.totalCount =
          currentUser.totalCount + singingsOnStage.duplicateEntries;
      }
    }
    // });//end of forEach()
  }
}

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

function removeBrokerCode(umr, index) {
  //if the index is 5 Then the broker code can be removedon the acutal data
  let umrWitNoBrokerCode = [];
  umr.forEach((element) => {
    let umrWithBrokerRemoved = element.slice(index);
    umrWitNoBrokerCode.push(umrWithBrokerRemoved);
  });
  return umrWitNoBrokerCode;
}

function replaceUmrWithUsername(originalInput, allocation) {
  originalInputArray = originalInput.slice();

  console.log(originalInputArray);
  const filteredAllocation = allocation.filter((e) => {
    return e.allocaredUmr !== undefined;
  });
  console.log(filteredAllocation);

  filteredAllocation.forEach((e) => {
    console.log(`${e.allocaredUmr["umrNumber"]} Is Allocated To ${e.userName}`);

    const allocatedUmr = e.allocaredUmr["umrNumber"];
    const allocatedUserName = e.userName;
    originalInputArray.forEach((item) => {
      if (item == allocatedUmr) {
        let newIndex = originalInputArray.indexOf(item);
        originalInputArray[newIndex] = allocatedUserName;
      }
    });
  });
  for (let i = 0; i < originalInputArray.length; i++) {
    // the logic to push data into the table

    tBodyEl.innerHTML += `
      <tr>
       <td>${originalInput[i]}</td>
        <td>${originalInputArray[i]}</td>
     </tr>
    `;
  }
}

//////////////////////
//Swap the User name with the Original Input UMR array
//////////////////////

function swap(userObj) {
  let tempUmrArray = inputUMR.slice();
  // console.log(userObj[0]);
  // console.log(inputUMR);
  //we have to consider the REGEX, since we had removed the Broker code

  //////test
  userObj.forEach((userObj) => {
    userObj["allocatedUMR"].forEach((umr) => {
      let currentUserName = userObj["userName"];
      let currentUmr = umr["umr"];
      console.log(`${currentUserName} has  ${currentUmr} allocated`);
      tempUmrArray.forEach((entry) => {
        let tempRegex = new RegExp(`^..${currentUmr}$`);
        if (tempRegex.test(entry)) {
          let ogArrayIndex = tempUmrArray.indexOf(entry);
          tempUmrArray[ogArrayIndex] = currentUserName;
        }
      });
    });
  });
  return tempUmrArray;
  //////End test
}
