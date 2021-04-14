// Nous allons te donner une liste contenant la hauteur (en étages) d'immeubles appartenant à une rue, d'est en ouest.
// Un agent immobilier voudrait que tu écrives un algorithme qui retourne combien de bâtiments de cette rue ont au moins un appartement 
// avec une vue sur le soleil couchant(à l'ouest), afin de bien évaluer la valeur des bâtiments de la rue.

// Par exemple, avec la liste [3, 7, 8, 3, 6, 1], la fonction devrait retourner 3, puisque l'étage le plus haut des immeubles
// ayant comme taille 8, 6, et 1 ont tous une vue à l'ouest.
// Ou autre exemple la liste[1, 4, 5, 8] devrait te retourner 1 puisque seul le dernier bâtiment a au moins un appartement avec une vue à l'ouest.

let count;

const doubleLoop = (array) => {
  let sunnyBuildings = 0,
    j;
  count = 0;
  for (i = 0; i < array.length; i++){
    j = i;
    while (array[j] <= array[i] && j < array.length) {
      j++;
      count++;
    }
    if (j == array.length) {sunnyBuildings++}
  }
  console.log(`${count} reps`)
  return sunnyBuildings
}

console.log("doubleLoop tests")
console.log("\n")
console.log(doubleLoop([3, 7, 8, 3, 6, 1]))
console.log(doubleLoop([1, 4, 5, 8]))
console.log("\n")

const singleLoop = (array) => {
  let sunnyBuildings = new Array;
  count = 0;
  for (i = 0; i < array.length - 1; i++) {
    count++;
    if (array[i] == Math.max(...array.slice(i, array.length)))
    {
      sunnyBuildings.push(array[i])
      }
  }
  sunnyBuildings.push(array[array.length - 1])
  console.log(`${count} reps`)
  return sunnyBuildings.length
}

console.log("singleLoop tests")
console.log("\n")
console.log(singleLoop([3, 7, 8, 3, 6, 1]))
console.log(singleLoop([1, 4, 5, 8]))
console.log("\n")

const singlePass = (array) => {
  let i = 0;
  count = 0;
  while (i < array.length-1) {
    if (array[i] <= array[i + 1]) { array.splice(i, 1) }
    else { i++ }
    count++;
  }
  console.log(`${count} reps`)
  return array.length
}

console.log("singlePass tests")
console.log("\n")
console.log(singlePass([3, 7, 8, 3, 6, 1]))
console.log(singlePass([1, 4, 5, 8]))