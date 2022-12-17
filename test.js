let userArr = ["userA", "userB"];

let umrList = [10, 55, 43, 55, 444, 76, 3, 22, 4, 90];

function allocate(userList, umrList) {
  let users = userList;
  let umrLeft = umrList.slice();
  let userObjectArray = [];

  //create the user Object
  users.forEach((userName) => {
    let userObj = {
      userName: userName,
      allocatedUMR: [],
    };
    userObjectArray.push(userObj);
  });

  //  userObj{
  //     userName:
  //     allocatedUMR
  //  }
}

function createUserObject(userArray) {
  let userObjectArray = [];
  userArray.forEach((user) => {
    let userObj = {
      userName: user,
      allocaterUMR: [],
      totalCountOfAllocation: 0,
    };
    userObjectArray.push(userObj);
  });
}

allocate(userArr, umrList);

//Add this function inside the loop

function User(userName, umrObject) {
  this.userName = userName;
  this.allocatedUMR = umrObject;
  this.getTotalAllocation = function () {
    return this.allocatedUMR.count;
  };
}

let obj = {
  umr: 1234567,
  count: 20,
};

let NewUser = new User("AJe", obj);

console.log(NewUser.getTotalAllocation());
