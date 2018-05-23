angular
    .module('moneyWeb')
    .filter('secret', function(){
        return value => {
            let cad = String(value);
            let aux = "";
    
            if (cad) {
                for(let i =0 ;i < cad.length; i++){
                    if (i<cad.length-3) {
                        aux +="*";
                    }else{
                        aux += cad[i];
                    }
                }
                return aux;
            }else{
                return value;
            }
        };
    });