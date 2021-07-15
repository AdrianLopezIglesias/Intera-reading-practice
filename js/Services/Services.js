app.service('Services', function () {
      
      this.shuffle = function (a) {
            
            var j, x, i;
            
            for (i = a.length - 1; i > 0; i--) {
                  
                  j = Math.floor(Math.random() * (i + 1));
                  
                  x = a[i];
                  
                  a[i] = a[j];
                  
                  a[j] = x;
                  
            }
            return a;
      }
      
      this.arraysMatch = function (arr1, arr2) {
            
            if (arr1.length !== arr2.length) return false;
            
            for (var i = 0; i < arr1.length; i++) {
                  
                  if (arr1[i] !== arr2[i]) return false;
                  
            }
            
            return true;

      };
      
      
}); 
