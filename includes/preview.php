<?php 
  $width1 = 550; 
  $height1 = 700;
 echo '<style>
 #target_'.$id.'{
   width:  ' . $width1 . 'px;
   height: ' . $height1 . 'px;
   margin:0;
 }
 #chart-1
 {
   width:  ' . $width1 . 'px;
   height: ' . $height1 . 'px;
 }
 </style>';
    ?>
	<body class="box">
        <?php echo stripslashes($html); ?>
        <script>
       <?php  echo $callscript; ?>
        </script>
	</body>
