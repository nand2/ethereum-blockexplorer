angular.module('ethExplorer')
    .controller('mainCtrl', function ($rootScope, $scope, $location) {

        // Display & update block list
        updateBlockList();
        web3.eth.filter("latest", function(error, result){
          if (!error) {
            updateBlockList();
            $scope.$apply();
          }
        });

        $scope.processRequest= function(){
            var requestStr = $scope.ethRequest;


            if (requestStr!==undefined){

                // maybe we can create a service to do the reg ex test, so we can use it in every controller ?

                var regexpTx = /[0-9a-zA-Z]{64}?/;
                var regexpAddr =  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/; // TODO ADDR REGEX or use isAddress(hexString) API ?
                var regexpBlock = /[0-9]{1,7}?/;

                var result =regexpTx.test(requestStr);
                if (result===true){
                    goToTxInfos(requestStr)
                }
                else{
                    result = regexpAddr.test(requestStr);
                    if (result===true){
                        goToAddrInfos(requestStr)
                    }
                    else{
                        result = regexpBlock.test(requestStr);
                        if (result===true){
                            goToBlockInfos(requestStr)
                        }
                        else{
                            console.log("nope");
                            return null;
                        }
                    }
                }
            }
            else{
                return null;
            }
        };


        function goToBlockInfos(requestStr){
            $location.path('/block/'+requestStr);
        }

        function goToAddrInfos(requestStr){
            $location.path('/address/'+requestStr);
        }

        function goToTxInfos (requestStr){
             $location.path('/transaction/'+requestStr);
        }

        function updateBlockList() {
            var currentBlockNumber = web3.eth.blockNumber;

            $scope.blocks = [];
            for (var i=0; i < 10 && currentBlockNumber - i >= 0; i++) {
              $scope.blocks.push(web3.eth.getBlock(currentBlockNumber - i));
            }
        }

    });
