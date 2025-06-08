
let lista = [];

function registar(){

  lista.push(["Mark", "Smith", "MS"])

  console.log(lista);

  listar();
}

function listar(){

  if ( $.fn.DataTable.isDataTable('#dtExample') ) {
    $('#dtExample').DataTable().destroy();
  }

  let txt = "";

  for(let i = 0; i < lista.length; i++){
   txt+= "<tr>";
    txt+= "<th scope='row'>"+(i+1)+"</th>";
    txt+= "<td>"+lista[i][0]+"</td>";
    txt+= "<td>"+lista[i][1]+"</td>";
    txt+= "<td>"+lista[i][2]+"</td>";
  txt+= "</tr>";
  }

  $("#listagem").html(txt);

  $('#dtExample').DataTable( {
    "pageLength": 25
    });

}

$(function() {
  $('#dtExample').DataTable( {
    "pageLength": 25
    });
});