<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<?php
 $user = wp_get_current_user();
 $User_id = $user->ID;
 $prod_key1 =  get_user_meta( $User_id, 'prod_key' , true );
 if ($prod_key1 != null) 
 {
    $prod_key1 = $prod_key1; 
 }else
 {
    $prod_key1 = '';
 }
?>
<script> 
var license_key = '<?php echo $prod_key1; ?>';

</script>
