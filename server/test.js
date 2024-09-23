const arrayDiff = (a, b) => {

    let diffValues = []
  
    if(a.lenght > 0) {
     
     a.forEach((item) => {
        b.includes(item)
     })
  
  
    } else {
      return []
    }
    
  };
  
  console.log(arrayDiff([1, 8, 2], [])); // [1, 8, 2]
  console.log(arrayDiff([1, 2, 3], [1, 2])); // [3]
  console.log(arrayDiff([3, 4], [3])); // [4]
  console.log(arrayDiff([], [4, 5])); // []