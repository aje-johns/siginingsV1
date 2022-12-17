function allocate(umrAndDupicate, userObj) {
  console.log(umrAndDupicate);
  console.log(userObj);

  let remainingSignings = umrAndDupicate.slice();
  remainingSignings.sort(function (a, b) {
    return a.duplicateEntries - b.duplicateEntries;
  });
  console.log("The sorted Array");
  console.log(remainingSignings);
  let remainingSigningsTEMP = remainingSignings.slice();

  while (remainingSigningsTEMP.length >= 0) {
    console.log("remainingSigningsTEMP -- Check");

    userObj.forEach((user) => {
      console.log("current user is");
      console.log(user);

      function firstAllocation() {
        console.log(`the user ${user.userName} will have its First Allocation`);
        let signingsToBeAllocated = remainingSigningsTEMP.pop();
        user.allocatedUMR = signingsToBeAllocated;
        user.totalCount = signingsToBeAllocated.duplicateEntries;
      }

      if (user.allocatedUMR == 0) {
        firstAllocation();
      } else if (user.allocatedUMR > 0) {
        //Time for second set of allocation
        //sort the userObj array in assending order
        //first item = lowers count of allocation
        //keet allocationg to the first item
        console.log("The while condition");
        console.log(remainingSigningsTEMP.pop());
      } // end of Else
    });
  }
}
