function Validator(option){
    var formElement = document.querySelector(option.form);
    var ruleSelector = {}
    function validate(inputElement, rule, errorElement){
        var errorMessage;
        var rules = ruleSelector[rule.selector];
        for(var i = 0; i < rules.length; ++i){
            errorMessage = rules[i](inputElement.value);
            if(errorMessage){
                 break;
            }
        }
        if(errorMessage){
            errorElement.innerText = errorMessage;
            getParent(inputElement, option.formGroupSelector).classList.add('invalid');
        }
        else{
            errorElement.innerText = '';
            getParent(inputElement, option.formGroupSelector).classList.remove('invalid');
        }
        return !errorMessage;
    }
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    if(formElement){
        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid = true ;
            option.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var errorElement = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
                var isValid = validate(inputElement, rule, errorElement);
                if(!isValid){
                    isFormValid = false;
                }
            });
            
            if(isFormValid){
                if(typeof option.onSubmit === 'function'){
                    var enableForm = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValid = Array.from(enableForm).reduce(function(result,index){
                        result[index.name] = index.value
                        return result;
                    }, {})
                    option.onSubmit(formValid);
                }
                else{
                    formElement.submit();
                }
            }
        }
        //Lặp qua các rule và xử lý sự kiện
        option.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector);
            var errorElement = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
            if(Array.isArray(ruleSelector[rule.selector])){
                ruleSelector[rule.selector].push(rule.test);
            }else{
                ruleSelector[rule.selector] = [rule.test];
            }
            
            if(inputElement){
                inputElement.onblur = function(){
                    validate(inputElement, rule, errorElement);   
                }

                inputElement.oninput = function(){
                    errorElement.innerText = '';
                    getParent(inputElement, option.formGroupSelector).classList.remove('invalid');
                }
            }
        })
    }
}
Validator.isRequired = function(selector , message){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
};
Validator.isEmail = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email!'
        }
    };
};
Validator.isLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : message || `Phải nhập ít nhất ${min} ký tự!`
        }
    };
}
Validator.isConfirmPassword = function(selector, getPassword, message){
    return {
        selector: selector,
        test: function(value){
            return value === getPassword() ? undefined : message ||` Nhập lại chưa đúng!`
        }
    };
}