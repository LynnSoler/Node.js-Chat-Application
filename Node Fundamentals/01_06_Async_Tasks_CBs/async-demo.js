fs = require('fs');

function phoneNumber(err, data) { //CB defined as function
	console.log('data:', data);
}

fs.readdir('c:/', phoneNumber); //CB passed into file sys for reading dir.. instead of exec wtg for readdir to finish, it continues to next line.. once readdir finishes, calls cb function & exec's console log on line 9 

console.log("this comes after"); //last line = exec 1st bc line 3 = c/back