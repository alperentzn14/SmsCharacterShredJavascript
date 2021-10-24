let $remaining = $('#remaining'),
    $messages = $remaining.next();
$('#message').keyup(function(){
    var chars = this.value.length,
        messages = Math.ceil(chars / 500),
        remaining = messages * 500 - (chars % (messages * 500) || messages * 500);
    $remaining.text(remaining + ' characters remaining');
    $messages.text(messages + ' message(s)');
});
$('#btn').click(function(){
    var text = $('#message').val();
    function splitTextAtWords(input, len) {
        len = len || 500;
        var chk = new RegExp('.{1,' + len + '}(?=([\\s\\-:]|$))', 'g');
        var output = input.match(chk);
        output = output.map(function (element) {
            return element.trim();
        });
        return output;
    }
    function splitSms(input) {
        var sms = splitTextAtWords(input, 492);

        function addCounter(element, index, array) {
            if((index==0)){
                return(element);
            }

            else{
                return '(' + (index + 1) + '/' + array.length + ') ' + element;
            }


        }
        return sms.map(addCounter);
    }

    var out_ = splitSms(text);
    out_.forEach(function (element, index) {
        $('.sonuc').append(element);
    });
})