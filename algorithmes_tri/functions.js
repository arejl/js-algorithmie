const swap = (givenArray, leftIndex, rightIndex) => {
  let temp = givenArray[leftIndex];
  givenArray[leftIndex] = givenArray[rightIndex];
  givenArray[rightIndex] = temp;
}

module.exports = { swap };