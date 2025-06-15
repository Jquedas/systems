function calcular(){

  let dados = new FormData();
  dados.append('numero1', $('#pNumero').val());
  dados.append('numero2', $('#sNumero').val());
  dados.append('op', $('#operacao').val());

 
  $.ajax({
    url: "src/controller/controllerScript.php",
    method: "POST",
    data: dados,
    dataType: "html",
    cache: false,
    contentType: false,
    processData:false,
  })
  
  .done(function( x ) {
    

    if($('#operacao').val() == 5){
      let obj = JSON.parse(x);
      $('#resultado').val(obj.resultado);

      alert(obj.informacao)
    }else{
      $('#resultado').val(x);
    }
  })
  
  .fail(function( jqXHR, textStatus ) {
    alert( "Request failed: " + textStatus );
  });

}