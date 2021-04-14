const fs = require('fs');

const fileName = process.argv[2];

const arrayClass = require('./SortedArray')

const functions = require('./functions')

fs.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
        console.error(error.message);
        return ;
    }

  //Tri à bulles
  let bubbleSort = new arrayClass.SortedArray (data.split(" ").map(number => Number(number)))
  for (i = bubbleSort.array.length - 1; i > 0; i--) {
    for (j = 0; j < i; j++) {
      bubbleSort.controlTurns += 1;
      if (bubbleSort.array[j + 1] < bubbleSort.array[j]) {
        [bubbleSort.array[j+1], bubbleSort.array[j]] = [bubbleSort.array[j], bubbleSort.array[j+1]];
      }
    }
  }
  console.log(`Tri à bulles : ${bubbleSort.controlTurns} comparaisons : ${bubbleSort.array}`)

  //Tri par insertion
  let insertionSort = new arrayClass.SortedArray (data.split(" ").map(number => Number(number)))
  let selectedElement;
  for (i = 1; i < insertionSort.array.length; i++) {
    selectedElement = insertionSort.array[i];
    for (j = i; j > 0; j--){
      if (insertionSort.array[j - 1] > selectedElement) {
        insertionSort.controlTurns+=1;
        insertionSort.array.splice(j, 1, insertionSort.array[j - 1])
        delete insertionSort.array[j-1]
        insertionSort.array.fill(selectedElement, j-1, j)
      }
    }
  }
  console.log(`Tri par insertion : ${insertionSort.controlTurns} comparaisons : ${insertionSort.array}`)

  //Tri par sélection
  let selectionSort = new arrayClass.SortedArray (data.split(" ").map(number => Number(number)))
  let minIndex = 0;
  for (i = 0; i < selectionSort.array.length - 1; i++){
    minIndex = i;
    for (j = i + 1; j < selectionSort.array.length; j++){
      selectionSort.controlTurns++;
      if (selectionSort.array[j] < selectionSort.array[minIndex]) { minIndex = j }      
    }
    if (minIndex != i) { functions.swap(selectionSort.array, i, minIndex) }
  }
  console.log(`Tri par sélection : ${selectionSort.controlTurns} comparaisons : ${selectionSort.array}`)

  //Tri rapide 

  // Dans un array donné, on donne deux index (qui délimitent un sous-array) et on prend un pivot qui est la valeur au milieu de ce sous-array.
  // On avance ensuite de part et d'autre du pivot en commençant par regarder si toutes les valeurs à gauche sont bien plus petites.
  // Quand on trouve une valeur qui n'est pas bien placée à gauche, on sort de la boucle et on commence à regarder à droite
  // si toutes les valeurs sont bien plus grandes.
  // Quand on trouve une valeur qui n'est pas bien placée à droite, on sort de la boucle et on échange les deux valeurs mal placées,
  // puis on reprend l'analyse.
  // Une fois que les deux côtés sont arrivés au niveau du pivot, on "return i" alias l'index auquel on s'est arrêté.
  // On se retrouve alors avec un array de départ qui a bien tous les éléments plus petits que le pivot à gauche, et les plus grands à droite.

  const _partition = (givenArray, leftIndex, rightIndex) => {
    let pivot   = givenArray.array[Math.floor((rightIndex + leftIndex) / 2)],
        i       = leftIndex, 
        j       = rightIndex;
    while (i <= j) {
        while (givenArray.array[i] < pivot) {
          i++;
          givenArray.controlTurns++;
        }
        while (givenArray.array[j] > pivot) {
          j--;
          givenArray.controlTurns++;
        }
        if (i <= j) {
          functions.swap(givenArray.array, i, j);
          i++;
          j--;
          givenArray.controlTurns++;
        }
    }
    return i;
  }

  // On sélectionne une partition initiale (qui fera tout l'array quand on va utiliser la fonction)
  // La fonction _partition retourne la variable index, qui représente l'index pour lequel on sait que les éléments plus petits sont à gauche
  // et les autres à droite.
  // A partir de là, si cet index est au milieu d'un sous-array plus long que 1 seul élément, on répète le processus de manière récursive.
  // On va se retrouver à trier des sous-arrays de plus en plus petits, jusqu'à ce qu'ils ne comprennent plus qu'un seul élément,
  // ce qui veut dire que tout aura été trié.
  
  const quickSortProcess = (givenArray, leftIndex, rightIndex) => {
    let index;
    if (givenArray.array.length > 1) {
        index = _partition(givenArray, leftIndex, rightIndex);
        if (leftIndex < index - 1) {
          quickSortProcess(givenArray, leftIndex, index - 1);
        }
        if (index < rightIndex) {
          quickSortProcess(givenArray, index, rightIndex);
        }
    }
    return givenArray;
  }

  let quickSort = new arrayClass.SortedArray(data.split(" ").map(number => Number(number)));
  quickSortProcess(quickSort, 0, quickSort.array.length - 1);
  
  console.log(`Tri rapide : ${quickSort.controlTurns} comparaisons : ${quickSort.array}`)

  //Tri par fusion

  let mergeSort = new arrayClass.SortedArray(data.split(" ").map(number => Number(number)));
  
  // On définit d'abord une méthode qui va prendre deux arrays et les fusionner en un seul, en triant en même temps.
  // Pour cela, on compare la première valeur dans l'array 1 et l'array 2, et on rajoute la plus petite des deux à un array fusionné.
  // S'il reste des valeurs à la fin de la comparaison (notamment si les deux arrays ne sont pas de la même taille),
  // on rajoute tout ce qui reste à la fin de l'array fusionné.

  const _mergeArrays = (array1, array2) => {
    let mergedArray = []  
    while (array1.length && array2.length) {
      mergedArray.push(array1[0] > array2[0] ? array2.shift() : array1.shift())
    }  
    while (array1.length) {
      mergedArray.push(array1.shift())
    }
    while (array2.length) {
      mergedArray.push(array2.shift())
    }  
    return mergedArray
  }
  
  // On prend un array donné et on le divise en deux au milieu.
  // Sur chacune de ces deux moitiés, on répète le processus par récursivité, jusqu'à obtenir des sous-arrays contenant une seule valeur (donc déjà triés).
  // La récursivité retourne alors ces sous-arrays fusionnés les uns avec les autres en les triant dans l'ordre croissant, grâce à la méthode _mergeArrays.
  
  let count = 0;
  const mergeSortProcess = (givenArray) => {
    count++;
    if (givenArray.length < 2) return givenArray
    const middle = Math.floor(givenArray.length / 2)
    const a_l = givenArray.slice(0, middle)
    const a_r = givenArray.slice(middle, givenArray.length)
    const sorted_l = mergeSortProcess(a_l)
    const sorted_r = mergeSortProcess(a_r)
    return _mergeArrays(sorted_l, sorted_r)
  }

  mergeSortProcess(mergeSort.array);
  mergeSort.controlTurns = count;  
  console.log(`Tri par fusion : ${mergeSort.controlTurns} comparaisons : ${mergeSortProcess(mergeSort.array)}`);

  //Tri par tas

  //Dans la fonction de tamisage, on décompose un array de longueur n en "arbres" où un élément à l'index k est le parent de deux éléments aux index 2k et 2k+1.
  //On échange le noeud racine à l'index k avec le plus grand de ses enfants.

  const sieve = (givenArray, node, n) => {
      let k = node;
      let j = 2 * k;
    while (j <= n) {
      givenArray.controlTurns++;
      if ((j < n) && (givenArray.array[j] < givenArray.array[j + 1]))
          j++;
      if (givenArray.array[k] < givenArray.array[j]) {
          functions.swap(givenArray.array, k, j);
          k = j;
          j = 2 * k;
      } else
          break;
      }
  }
  
  //On répète la fonction de tamisage en prenant des arrays de plus en plus petits : ainsi, l'élément le plus grand est à chaque fois sorti de la boucle,
  // et le tri reprend sur le reste des éléments.

  const heapSortProcess = (givenArray) => {
      for (let i = givenArray.array.length >> 1; i >= 0; i--)
          sieve(givenArray, i, givenArray.array.length - 1);
      for (let i = givenArray.array.length - 1; i >= 1; i--) {
          functions.swap(givenArray.array, i, 0);
          sieve(givenArray, 0, i - 1);
      }
  }

  let heapSort = new arrayClass.SortedArray(data.split(" ").map(number => Number(number)));
  heapSortProcess(heapSort);
  console.log(`Tri par tas : ${heapSort.controlTurns} comparaisons : ${heapSort.array}`);

  //Tri de Shell

  //On compare des éléments entre eux, espacés d'un index donné, qui est de plus en plus petit.
  //Pour ce faire, on prend chacun des espacements (pré-déterminés mathématiquement, indiqués dans la constante spacing) et on leur applique le raisonnement suivant
  // (par exemple, en prenant l'espacement 4 sur un array d'une longueur 15) :
  // On regarde si array[0] <= array[4]. Si oui, on ne fait rien.
  // Si non, on échange array[0] et array[4].
  // On reproduit le processus en comparant 1 / 5, 2 / 6 etc.jusqu'à 10/14.
  // A chaque fois, on compare tous les éléments espacés de 4 en partant de l'indice le plus haut, donc on va comparer 10/14, puis 6/10, puis 2/6 (d'où la boucle while).
  // Ensuite, on passe à l'espacement de 1.

  const spacing = [701, 301, 132, 57, 23, 10, 4, 1];

  const shellSortProcess = (givenArray) => {
    spacing.forEach(element => {
      for (i = element; i < givenArray.array.length; i++){
        let temp = givenArray.array[i],
          j = i;
        while (j >= element && givenArray.array[j - element] > temp) {
          givenArray.array[j] = givenArray.array[j - element];
          j -= element;
          givenArray.array[j] = temp;
        }
        givenArray.controlTurns++;
      }
    });
    return givenArray
  }
  
  let shellSort = new arrayClass.SortedArray(data.split(" ").map(number => Number(number)));
  shellSortProcess(shellSort);
  console.log(`Tri de Shell : ${shellSort.controlTurns} comparaisons : ${shellSort.array}`);

});
