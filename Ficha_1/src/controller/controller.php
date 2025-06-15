<?php

require_once("../model/model.php");

if (isset($_POST['areabase']) && isset($_POST['altura'])) {

  $vol = new Volume();
  $result = $vol->volulu($_POST['areabase'], $_POST['altura']);
  echo trim($result);

} else if (isset($_POST['numberA']) && isset($_POST['numberB']) && isset($_POST['numberC'])) {

  $alg = new Algoritmo();
  $resultado = $alg->exerc2($_POST['numberA'], $_POST['numberB'], $_POST['numberC']);
  echo trim($resultado);

} else if (isset($_POST['number1']) && isset($_POST['number2']) && isset($_POST['operacao'])) {

  $calc = new Calculos();

  if ($_POST['operacao'] == 1) {
    echo trim($calc->soma($_POST['number1'], $_POST['number2']));
  } else if ($_POST['operacao'] == 2) {
    echo trim($calc->divisao($_POST['number1'], $_POST['number2']));
  } else if ($_POST['operacao'] == 3) {
    echo trim($calc->subtracao($_POST['number1'], $_POST['number2']));
  } else if ($_POST['operacao'] == 4) {
    echo trim($calc->multiplicacao($_POST['number1'], $_POST['number2']));
  } else if ($_POST['operacao'] == 5) {
    echo trim($calc->somaInfo($_POST['number1'], $_POST['number2']));
  }

}else if(isset($_POST['saldo'])) {
  echo $_POST['saldo'];
}


?>



