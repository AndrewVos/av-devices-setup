const arrayStats = {
  sum: function (array) {
    var num = 0
    for (var i = 0, l = array.length; i < l; i++) num += array[i]
    return num
  },

  mean: function (array) {
    return arrayStats.sum(array) / array.length
  },

  median: function (array) {
    array.sort(function (a, b) {
      return a - b
    })
    var mid = array.length / 2
    return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2
  },

  variance: function (array) {
    var mean = arrayStats.mean(array)
    return arrayStats.mean(
      array.map(function (num) {
        return Math.pow(num - mean, 2)
      })
    )
  },

  standardDeviation: function (array) {
    return Math.sqrt(arrayStats.variance(array))
  },
}
export { arrayStats }
