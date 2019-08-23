
let error = "данные введены не верною. Повторите попытку.";
let errorEmpty = "* данное поле обязательно для заполнения.";
function validate_fio() {
    let fioReg = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/;
    let fio = document.getElementById('fio');
    let fioValue = fio.value;
    if (fioValue == ""){
        fio.setAttribute('placeholder', errorEmpty);
        return false;
    }else {
        if (fioValue.match(fioReg)){
            fio.setAttribute('placeholder', '');
            return true;
        }else {
            fio.value = '';
            fio.setAttribute('placeholder', error);
            return false;
        }
    }
}

function validate_email() {
    let mailFormat = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    let email = document.getElementById('email');
    let emailValue = email.value;
    // let htmlEmail = '';
    if (emailValue == "") {
        email.setAttribute('placeholder', errorEmpty);
        return false;
    } else {
        if (emailValue.match(mailFormat)){
            email.setAttribute('placeholder', '');
            return true;
        }else {
            email.value = '';
            email.setAttribute('placeholder', error);
            return false;
        }
    }

}

let phoneFormat = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
function validate_phone(input) {
    input.setAttribute('data-validate', '0');

    if (input.value == '')
        input.setAttribute('placeholder', errorEmpty);

    else
    if (input.value.match(phoneFormat)) {
        input.setAttribute('data-validate', '1');
        input.setAttribute('placeholder', '');
    } else{
        input.value = '';
        input.setAttribute('placeholder', error);
    }


    return input.getAttribute('data-validate') == '1';
}
function validate_phones() {
    let validate = true;
    let inputs = document.getElementById('phone_container').getElementsByClassName('phones');
    for (let i = 0; i < inputs.length; i++)
        if ( !validate_phone(inputs[i]) )
            validate = false;
    return validate;
}

function validate_age() {
    let age = document.getElementById('age');
    let ageValue = age.value;
    // let htmlAge = '';
    if (ageValue == "") {
        age.setAttribute('placeholder', errorEmpty);
        return false;
    } else {
        if (isNaN(ageValue) || ageValue <= 0 || ageValue > 150 || ageValue.indexOf(".") >= 0){
            age.value = '';
            age.setAttribute('placeholder', error);
            return false;
        }else {
            age.setAttribute('placeholder', '');
            return true;
        }
    }
}

function validate_photo() {
    let validateSize = 2*1024*1024;
    let photo = document.getElementById('photo');
    let photoFile = photo.files[0];
    if (photoFile === undefined){
        photo.nextElementSibling.innerHTML = errorEmpty;
        document.getElementById('label-photo-box').innerHTML = '<img src="/nina-iaremenko-jsfw1-basis/stage5/images/upload.png" alt="Upload foto">';
        return false;
    } else {
        if (!photoFile.type.match('image/jp.*')) {
            photo.nextElementSibling.innerHTML = "Файл неверного формата. Только JPG формат. Повторите попытку";
            document.getElementById('label-photo-box').innerHTML = '<img src="/nina-iaremenko-jsfw1-basis/stage5/images/upload.png" alt="Upload foto">';
            return false;
        }
        if (photoFile.size > validateSize ) {
            photo.nextElementSibling.innerHTML = "Файл превышает допустимый размер 2МВ. Повторите попытку.";
            document.getElementById('label-photo-box').innerHTML = '<img src="/nina-iaremenko-jsfw1-basis/stage5/images/upload.png" alt="Upload foto">';
            return false;
        }



        let reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                document.getElementById('label-photo-box').innerHTML = '';
                document.getElementById('label-photo-box').innerHTML = ['<img class="thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '" width="150" height="127" style="margin-top:0;"/>'].join('');
                document.getElementById('photo').nextElementSibling.innerHTML = '';
            };
        })(photoFile);

        // Read in the image file as a data URL.
        reader.readAsDataURL(photoFile);
        return true;
    }
}

function validate_resume() {
    let resume = document.getElementById('resume');
    let resumeValue = resume.value;
    if (resumeValue == ''){
        resume.setAttribute('placeholder', errorEmpty);
        return false;
    }else {
        resume.setAttribute('placeholder', '');
        return true;
    }
}



function checkForm() {
    let validate = true;
    if ( !validate_fio() ) 		validate = false;
    if ( !validate_email() )  	validate = false;
    if ( !validate_phones() ) 	validate = false;
    if ( !validate_age() ) 		validate = false;
    if ( !validate_photo() ) 	validate = false;
    if ( !validate_resume() ) 	validate = false;

    return validate;
}

$(document).ready(function() {
    let count = 1;
    // create new fields for extra phones
    plus.addEventListener("click", function(){
        let input = document.createElement('INPUT');
        input.type = 'text';
        input.className = 'phones';
        input.id = "phone" + count;
        input.setAttribute('data-validate', '0');
        input.name = "phone[]";
        let span = document.createElement('SPAN');
        span.className = 'error';
        let pre = document.createElement('PRE');
        let deleteBtn = document.createElement('INPUT');
        deleteBtn.type = 'button';
        deleteBtn.setAttribute("class", "delete_extra_phone");
        deleteBtn.value = 'Удалить';

        document.querySelector('#phone_container').appendChild(input);
        document.querySelector('#phone_container').appendChild(span);
        document.querySelector('#phone_container').appendChild(deleteBtn);
        document.querySelector('#phone_container').appendChild(pre);
        count++;
        deleteBtn.addEventListener("click", function() {
            this.previousElementSibling.remove();
            this.previousElementSibling.remove();
            this.nextElementSibling.remove();
            this.remove();
        });

    });

    document.getElementById('fio').addEventListener( 'blur', function(){
        validate_fio();
    });

    document.getElementById('email').addEventListener( 'blur', function(){
        validate_email();
    });

    let phone_container = document.getElementById('phone_container');
    phone_container.addEventListener( 'focusout', function(event) {
        if (event.target.className == 'phones') {
            validate_phone(event.target);
        }
    });

    document.getElementById('age').addEventListener( 'blur', function(){
        validate_age();
    });

    document.getElementById('photo').addEventListener( 'change', function(){
        validate_photo();
    });

    document.getElementById('resume').addEventListener( 'blur', function(){
        validate_resume();
    });

    $('.form').submit(function (event) {
        event.preventDefault();
        if (checkForm()){
            var fd = new FormData(this);
            var files = $('input[type=file]')[0].files[0];
            fd.append('file',files);
            $.ajax({
                url:     'send-form.php',
                type:     "POST",
                processData: false,
                cache: false,
                contentType: false,
                dataType: 'json',
                data: fd,
                success: function(response) { //Данные отправлены успешно
                    if (response !== '') {alert(response);}
                },
                error: function(response) { // Данные не отправлены
                    alert('error');
                }
            });
        }else {
            return;
        }

    });
});