
/// <reference path="../angular.js" />


/// <reference path="Module.js" />
 
//The controller is having 'crudService' dependency.
//This controller makes call to methods from the service 
app.controller('crudController', function ($scope, crudService) {
   
    $scope.IsNewRecord = 1; //The flag for the new record

    loadRecords(); 

    //Function to load all Employee records
    function loadRecords() {
        var promiseGet = crudService.getEmployees(); //The MEthod Call from service

        promiseGet.then(function (pl) { $scope.Employees = pl.data },
              function (errorPl) {
                  $log.error('failure loading Employee', errorPl);
              });
    }
    


    //The Save scope method use to define the Employee object.
    //In this method if IsNewRecord is not zero then Update Employee else 
    //Create the Employee information to the server
    $scope.save = function () {
        var Employee = {
            EmpNo: $scope.EmpNo,
            EmpName: $scope.EmpName,
            Salary: $scope.Salary,
            DeptName: $scope.DeptName,
            Designation: $scope.Designation
        };
        //If the flag is 1 the it si new record
        if ($scope.IsNewRecord === 1) {
            var promisePost = crudService.post(Employee);
            promisePost.then(function (pl) {
                $scope.EmpNo = pl.data.EmpNo;
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        } else { //Else Edit the record
            var promisePut = crudService.put($scope.EmpNo,Employee);
            promisePut.then(function (pl) {
                $scope.Message = "Updated Successfuly";
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }

        
            
    };

    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = crudService.delete($scope.EmpNo);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.EmpNo = 0;
            $scope.EmpName = "";
            $scope.Salary = 0;
            $scope.DeptName = "";
            $scope.Designation = "";
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //Method to Get Single Employee based on EmpNo
    $scope.get = function (Emp) {
        var promiseGetSingle = crudService.get(Emp.EmpNo);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.EmpNo = res.EmpNo;
            $scope.EmpName = res.EmpName;
            $scope.Salary = res.Salary;
            $scope.DeptName = res.DeptName;
            $scope.Designation = res.Designation;

            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                       console.log('failure loading Employee', errorPl);
                  });
    }
    //Clear the Scopr models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.EmpNo = 0;
        $scope.EmpName = "";
        $scope.Salary = 0;
        $scope.DeptName = "";
        $scope.Designation = "";
    }
});