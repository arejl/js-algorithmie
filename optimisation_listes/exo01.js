// Avec une liste de nombres entiers relatifs et un nombre k, crée une méthode retournant un booléen qui affiche si deux nombres de cette liste
// ont k comme résultat de leur somme.
// Par exemple, si je te donne la liste [10, 15, 3, 7] et k = 17, la fonction devra sortir true car 10 + 7 = 17.
// Si je te donne la liste[1, 8, 10, 21] et k = 19, la fonction devra sortir false car il n'y a pas deux nombres ayant 19 comme résultat de leur addition.

let count;

const doubleLoop = (array, total) => {
  count = 0;
  for (i = 0; i < array.length-1; i++){
    for (j = 1; j < array.length; j++){
      count++;
      if (array[i] + array[j] == total) { console.log(`${count} reps`); return true }
    }
  }
  console.log(`${count} reps`)
  return false
}

console.log("doubleLoop tests")
console.log("\n")
console.log(doubleLoop([10, 15, 3, 7], 17))
console.log("\n")
console.log(doubleLoop([1, 8, 10, 21], 19))
console.log("\n")
console.log(doubleLoop([3, 7, 8, 3, 6, 1], 15))
console.log("\n")
console.log(doubleLoop([3, 7, 8, 3, 6, 1], 2))
console.log("\n")

const singleLoop = (array, total) => {
  let controlArray = new Array;
  count = 0;
  for (i = 0; i < array.length; i++) {
    controlArray.push(total - array[i])
    count++;
  }
  for (i = 0; i < array.length; i++) {
    count++;
    if (controlArray.includes(array[i]) && (controlArray[i] != array[i] || array.filter(element => array.indexOf(element) != i && element == array[i]).length > 0)) { console.log(`${count} reps`) ; return true}
  }
  console.log(`${count} reps`)
  return false
}

console.log("singleLoop tests")
console.log("\n")
console.log(singleLoop([10, 15, 3, 7], 17))
console.log("\n")
console.log(singleLoop([1, 8, 10, 21], 19))
console.log("\n")
console.log(singleLoop([3, 7, 8, 3, 6, 1], 15))
console.log("\n")
console.log(singleLoop([3, 7, 8, 3, 6, 1], 2))
console.log("\n")

const singlePass = (array, total) => {
  let i = 0;
  count = 1;
  while (!array.includes(total - array[i]) && array.indexOf(total - array[i]) != i && i != array.length - 1) {
    count++;
    i++;
  }
  console.log(`${count} reps`)
  return (i != array.length-1)
}

console.log("singlePass tests\n")
console.log(singlePass([10, 15, 3, 7], 17))
console.log("\n")
console.log(singlePass([1, 8, 10, 21], 19))
console.log("\n")
console.log(singlePass([3, 7, 8, 3, 6, 1], 15))
console.log("\n")
console.log(singlePass([3, 7, 8, 3, 6, 1], 2))