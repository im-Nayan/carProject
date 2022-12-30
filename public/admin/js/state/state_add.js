const model = require('../../../../Admin/Countries/model/countries_model');

function getSelectValue(){
    var selectedValue = document.getElementById('countryName').value;
    // console.log('selectedValue', selectedValue);
    // model.findById({_id:selectedValue}).then(result=>{
    //     console.log(result);
    // })
    document.getElementById('idOfCountry').value=selectedValue
}
getSelectValue();


var id = document.getElementById('idOfCountry');
document.write("<br>")
document.write(id.value)
console.log('zzz',id.value);