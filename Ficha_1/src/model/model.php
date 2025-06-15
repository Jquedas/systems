<?php

class Calculos{

  function soma($num1, $num2){

    $msg = $num1 + $num2;
    return $msg;
    
  }

  function divisao($num1,$num2){
    return($num1 / $num2);
  }

  function subtracao($num1,$num2){
    return($num1 - $num2);
  }

  function multiplicacao($num1,$num2){
    return ($num1 * $num2);
  }

  function somaInfo($num1,$num2){
    $res = $num1 + $num2;
    $info = "";

    if($res > 10){
      $info = "É SUPERIOR A 10!!";
    
    }else{
      $info = "SOMA É IGUAL OU INFERIOR A 10!!";
    }

    $msg = array(
      "resultado" => $res,
      "informacao" => $info
    );
    return(json_encode($msg));
  }
}

class Volume{

  function volulu($nu1, $nu2){

    return (1/3)*($nu1*$nu2);

  }
}

class Algoritmo {

  function exerc2($na,$nb,$nc){

    $res = ($na + $nb) / $nc ;

    $info = "";

    if($res > 100){
      $info = "Resultado superior a 100!";
    }else{
      $info = "Resultado inferior a 100!";
    }

    $msg = array(
      "resultado" => $res,
      "informacao" => $info,
    );
    return(json_encode($msg));
  }
}


?>