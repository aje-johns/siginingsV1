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
    console.log("remainingSigningsTEMP -- Check");
    // let allocationObj = [];
    // let userWithAllocation = {}

    userObj.forEach((user) => {
      console.log("current user is");
      console.log(user);

      function firstAllocation() {
        console.log(`the user ${user.userName} will have its First Allocation`);
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

  // for (let i = 0; i < remainingSignings.length; i++) {
  //   userObj.forEach((item) => {});

  //   const signingsObjToBeAllocated = remainingSigningsTEMP.pop();
  //   const countOfSignings = signingsObjToBeAllocated.duplicateEntries;
  //   console.log(countOfSignings);
  // }
}
