/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

var sieve = function (n) {
  "use strict";
  console.log("n:"+ n);
  var array = [],
    primes = [],
    i,
    j;

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.
  array[0] = array[1] = false;
  for (i = 2;i * i <= n; i++) {
    
      for (j = i * i; j <= n; j += i) {
        array[j] = false;
      }
    
  }

  for (i = 2; i <= n; i++) {
    if (array[i]!=false) {
      primes.push(i);
    }
  }

  return primes;
};

const seeprimes=function (n){
  const arreglo=sieve(1000000);
  var mostrar="";
  for(var i=0;arreglo[i]<=n;i++){
  mostrar+=arreglo[i]+", ";
  }
  $("#primes").text(mostrar);
}

$(document).ready(function(){
$("#btn").click(function(){
seeprimes($('#num').val());

});
});
console.log(sieve(1000000));
