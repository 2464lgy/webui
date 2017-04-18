/**
 * Created by xiongmao on 2016/11/8.
 */
var app=angular.module('myApp',[]);
app.controller('signController',function ($scope) {
    $scope.userdata={

    }
    $scope.submitForm=function () {
        /*console.log('表单提交了')*/
        console.log($scope.userdata)
       if($scope.signUpForm.$invalid){
            alert('请检查你的信息')
        }else{
            alert('提交成功')
        }
    }

})

    app.directive('compare',function () {
        var o={};
        o.strict='AE';
        o.scope={
            orgText:'=compare'
        }
        o.require='ngModel';
        o.link=function (sco,ele,att,con) {   //主函数体
            con.$validators.compare=function (v) {
                return v==sco.orgText;
            }
            sco.$watch('orgText',function () {  //orgText的值改变会被检测到，再次进行匹配
                con.$validate();
            })
        }
        return o;
    })