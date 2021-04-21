<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<style>
#TB_ajaxContent
{
background: #202020 0% 0% no-repeat padding-box;
opacity: 1;
top: 32px;
left: 160px;
float:left;
}
.logo-box{
height: 238px;
background: transparent url('<?php echo plugins_url('images/Mask_Group_2.png', __FILE__ ); ?>') 0% 0% no-repeat padding-box;
}
.lazy-logo{
position:relative;
top: 60px;
left: 45px;
width: 408px;
height: 84px;
background: transparent url('<?php 
echo plugins_url('images/lightningchart-js-logo.svg', __FILE__ );?>')  0% 0% no-repeat padding-box;
opacity: 1;
}

#sea_butt{
  background-image: url('<?php echo plugins_url('images/icons/Union 23.svg', __FILE__ );?>');
  background-position: left 5px bottom 10px;
  border-color: #363636;
}

#toggleAll{
  background-image: url('<?php echo plugins_url('images/icons/Union 22.svg', __FILE__ );?>');
  background-position: right 5px bottom 10px;
}
.panel-heading.active {
    background-color:#FFCD00;
}
#example {
    overflow:scroll;
    height:50vh;
}
.tabularInput-table tbody tr:first-child {
  font-size:x-large;
  text-align: center;
  font-weight: bolder;
}

.export_import {
    text-align: center;
    background-color: #2d2d2d;
    padding: 10px 12px 16px;
    border-radius: 0 0 15px 15px;
}
.white-border{
  margin: initial;
  
}
.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
<div class="lc-main-header">
<div class="row">
<div class="col-md-8 logo-box"> 
<div class="lazy-logo"></div>
<span class="tag-line-span">The highest-performance <span class="js-tag">JavaScript</span> charting library focusing on real-time data visualization</span>
</div>
<div class="col-md-4 flex-menu"> 
<div class="menu-item">
<a href="#TB_inline?&width=1200&height=900&inlineId=chart-library" class="thickbox">
<div class="menu-icon">
<img src="<?php echo plugins_url('images/chart-library-icon.svg', __FILE__ ) ?>"/> 
</div>
<p class="item-txt">Chart Library</p>
</a>
</div>
<div class="menu-item"> 
<a href="#TB_inline?&width=1200&height=900&inlineId=my-content-id" class="thickbox">
<div class="menu-icon bg-yellow">
<img src="<?php echo plugins_url('images/add-chart-icon.svg', __FILE__); ?>"/>
</div>
<p class="item-txt">Add new</p>
</a>
</div>
</div>
</div>
  <?php add_thickbox(); ?>
<div id="my-content-id" style="display:none;">
<form action="<?php echo admin_url(); ?>admin.php?page=LC-JS%2Fincludes%2Fmfp-chart-listing-page.php" method="post" onsubmit="return validate_me();" id="myForm" enctype="multipart/form-data">
<div class="inner-page-header ">
<div class="row">
<div class="col-12 col-md-8 flex-section">
<button id="cancel" class="thickbox">
<div class="menu-icon">
<img src="<?php echo plugins_url('images/back-icon.svg', __FILE__);?>"> 
</div>         
</button> 
<div class="inner-title"> Code Editor</div>
</div>
<div class="col-12 col-md-4 flex-section controls top10">       
<button type="button" class="prevbtn" onclick= "preview_value()" value="preview">Preview</button>
<input type="submit" class="submitbtn" name="submit">
</div>   
</div>
</div> 
<div class="row">
<div class="lc-code-editor col-md-12 col-lg-6">           
<div class="title flex-section">                   
<label for="Chart-label">Title</label>
<input type="text" id="Title_name" name="Title_name" autocomplete="off">
<input type="hidden" name="edit_id" id="edit_id" value="">
</div>
<div class="editor_section" id="section1">
<div class="tab">
<button class="tablinks" type="button" onclick="tabs(event, 'html')"><b>Html</b></button>
<button class="tablinks" type="button" onclick="tabs(event, 'javascript')"><b>Values</b></button>
<button class="tablinks" type="button" onclick="tabs(event, 'setting')"><b>Settings</b></button>
</div>
<div id="html" class="tabcontent" value="">
<textarea id="html_code" name="html" class="Textarea" onchange="textarea_change();"></textarea>
</div>
<div id="javascript" class="tabcontent">
<textarea id="javascript_code" style="display:none" name="javascript" onchange="textarea_change();" class="Textarea"></textarea>
<div id="example"></div>

<div class="export_import row"> 
  <div class="col-md-12 col-lg-12 col-xl-6 table-controls">         
    <button type='button' title="Add new row" onClick='javascript:jQuery("#example").tabularInput("addRow")' class="edit-btn"><img src="<?php echo  plugins_url('/LC-JS/images/icons/add-row-icon.svg');?>"></button>
    <button type='button' title="Delete last row" onClick='javascript:jQuery("#example").tabularInput("deleteRow")'  class="edit-btn"><img src="<?php echo  plugins_url('/LC-JS/images/icons/delete-row-icon.svg');?>"></button>
    <button type='button' title="Add new column" onClick='javascript:jQuery("#example").tabularInput("addColumn")' class="edit-btn"><img src="<?php echo  plugins_url('/LC-JS/images/icons/add-col-icon.svg');?>"></button>
    <button type='button' title="Delete last column" onClick='javascript:jQuery("#example").tabularInput("deleteColumn")'  class="edit-btn"><img src="<?php echo  plugins_url('/LC-JS/images/icons/delete-col-icon.svg');?>"></button>
  </div>
  <input type="hidden" id="save_status" name="save_status" value="">       


  <!--<div class="row white-border">-->
  <div class="col-md-12 col-lg-12 col-xl-6 data-controls">
    <div class="row">
      <div class="col-lg-6"> 
        <div class="upload-btn-wrapper">
          <button class="submitbtn" onclick="invoke_file();" type="button" style="width: 100%;margin:0 0 15px">Import Data</button>
          <input  type="file" name="javascript_csv" id="javascript_csv" /> 
        </div> 
      </div>
      <div class="col-lg-6"> 
        <button type='button' onClick='javascript:export_sample_data();' style="width:100%" class="submitbtn">Export Data</button>
      </div>
    </div>
  </div> 
  <!--</div>-->
</div>


</div>
<div id="setting" class="tabcontent Textarea">
 <!--Tab accordian start -->
<div class="panel-group" id="accordion">
<div class="panel panel-default">
<div class="panel-heading">
<div class="panel-title">
<a class="accordion-toggle" data-toggle="collapse"data-parent="#accordion" href="#panel1">

General Settings</a>
</div>
</div>
<div id="panel1" class="panel-collapse collapse in">
<div class="panel-body">
<!--more parameter settings for chart start-->
<div class="form-group">
<label for="width" style="color:black;">Select Chart Type:</label><br>
<select id="sel_chart_type" name="sel_chart_type" >
<?php
$data_chart = $GLOBALS['chart_types'];
$ddata_chart = $GLOBALS['abc'];
if (count($data_chart) > 0) {
$i=1;
foreach ($data_chart as $key=>$value) { ?>
<optgroup label="<?php echo $value['name']; ?>">
<?php 
if(count($ddata_chart) > 0)
{
$text = $key;

$emp = $ddata_chart[$text];
if (is_array($emp)) {
if (count($emp) > 0) {
    foreach ($emp as $key=>$val) {
        ?>
<option value="<?php echo $text.'#'.$key; ?>"><?php echo $val['chart_name'] ; ?></option>
    <?php }}}} ?>
    <?php
  $i++;
        }
      }
  ?>
</select>
<div class="form-group">
<label for="width" style="color:black;">Title for chart:</label><br>
<input type="text"  id="set_title" name="set_title" >
</div> 
</div>
<!--more parameter settings for chart  end-->
</div>
</div>
</div>
<div class="panel panel-default">
<div class="panel-heading">
<div class="panel-title">
<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#panel3">
  Display Settings</a>
    </div>
</div>
<div id="panel3" class="panel-collapse collapse">
<div class="panel-body">
<div class="form-group">
<label for="height" style="width:60px;color:black;">Height:</label><br>
<input type="text" onkeypress="return isNumber(event)" id="height" name="height" > (Use only numberic value)<br><br>
</div>
<div class="form-group">
<label for="width" style="width:60px;color:black;">Width:</label><br>
<input type="text" onkeypress="return isNumber(event)" id="width" name="width" > (Use only numberic value)<br>
</div> 
</div>
</div>
</div>
</div>
<!--Tab accordian end -->
</div>
</div> 
</div>
<div class="lc-chart-preview col-md-12 col-lg-6"> 
<div class="chart_section" id="demo"></div>
<?php 
$user = wp_get_current_user();
$User_id = $user->ID;
$prod_key1 =  get_user_meta( $User_id, 'prod_key' , true );
if($prod_key1==null)
{
?>
<div class="watermark-alert">
<p>To remove watermark in the chart, purchase license key referring to:</p>
<a href="https://portal.arction.com/product/details?product_id=MTU=" target="_blank">Arction Portal</a>
</div>
<?php
}
?>
</div>
<!-- footer -->  
<div class="row plugin-footer">
<div class="col-md-10"></div>
<div class="col-md-2 logo-footer"> 
<a href="https://www.arction.com/" target="_blank"> 
  <img src="<?php echo  plugins_url('images/Footer_1.png', __FILE__ );?>"> </div>
</a>
</div>
</div>
</form>
</div>
<?php
if (isset($_POST['submit'])){
      if($_FILES['javascript_csv']['error'] == 0){
        $name = sanitize_file_name($_FILES['javascript_csv']['name']);
        $ext = strtolower(end(explode('.', sanitize_file_name($_FILES['javascript_csv']['name']))));
        // check the file is a csv
        if($ext === 'csv'){
          $tmpName = $_FILES['javascript_csv']['tmp_name'];
            if(($handle = fopen($tmpName, 'r')) !== FALSE) {
              while(($data = fgetcsv($handle, 1000, ",")) !== FALSE)
              {
                  $csv[] = $data;
              }
                fclose($handle);
            }
             $num_rows = count($csv);
             $num_cols = count($csv[0]);
             if($num_cols>0)
             {
               $j_data = array();
                for($i=0;$i<$num_cols;$i++)
                {
                   for($j=0;$j<$num_rows;$j++)
                   {
                     $j_data[$i][$j] = $csv[$j][$i];
                   }
                }
             }
        }
    }else
    {
      $csv =array();
    }
    if(isset($_POST['html']))
    {
      $html1 =  wp_kses_post($_POST['html']);
    }
    if(count($csv) > 0)
    {
      $javascript1 =  $j_data;
    }else{
      if((sanitize_text_or_array_field($_POST['my_javascript_data'])) !== null){
        $tags =(array)sanitize_text_or_array_field($_POST['my_javascript_data']);
      }else{
        $tags = array();
      } 
      $javascript1 = sanitize_text_or_array_field($tags);
    }
   
    $Title_name1 = sanitize_text_field($_POST['Title_name']);
    $height =  sanitize_text_field($_POST['height']);
    $width =  sanitize_text_field($_POST['width']);
    $set_title =  sanitize_text_field($_POST['set_title']);
    $sel_chart_type =  sanitize_text_field($_POST['sel_chart_type']);
    $ddata_chart = $GLOBALS['abc'];
    list($chart_type_name,$example_title) = explode('#',$sel_chart_type);
    $chart_method = $ddata_chart[$chart_type_name][$example_title]['chart_method'];
    $param_array = array();
    $param_array['set_title'] = $set_title;
    $param_array['chart_type'] =$sel_chart_type;
    $param_array['chart_method'] =$chart_method;
    $param_array['chart_type_case'] =$ddata_chart[$chart_type_name][$example_title]['chart_name'];
    $param_json = json_encode($param_array);
    if($height != null && $width != null){
      $height1 =  sanitize_text_field($_POST['height']);
      $width1 =  sanitize_text_field($_POST['width']);
    }else{
      $height1 =  "800";
      $width1 =  "1000";
    }
      if(isset($_POST['edit_id']) && $_POST['edit_id'] != '')
      {
        $edit_id =  sanitize_text_field($_POST['edit_id']);
        $my_post = array(
          'ID'           => $edit_id,
          'post_title'   =>  $Title_name1,
          'post_type'=>'LC-JS-Charts', 
      );
      wp_update_post( $my_post );
      update_post_meta( $edit_id, 'html_code', $html1, false ); 
      update_post_meta( $edit_id, 'javascript_code', $javascript1, false );
      update_post_meta( $edit_id, 'height', $height1, false );
      update_post_meta( $edit_id, 'width', $width1, false );
      update_post_meta( $edit_id, 'param_data', $param_json, false );
        $referer = $_SERVER['REQUEST_URI'];
        header("Location: $referer"."&editmeassage=success");
      }else
      {
            $id = wp_insert_post(array(
              'post_title'=>$Title_name1, 
              'post_type'=>'LC-JS-Charts', 
              'post_status'   => 'publish',
            'post_author'   => 1,
          ));
         add_post_meta( $id, 'html_code', $html1, true ); 
         add_post_meta( $id, 'javascript_code', $javascript1, true );
         add_post_meta( $id, 'height', $height1, true );
         add_post_meta( $id, 'width', $width1, true );
         add_post_meta( $id, 'param_data', $param_json, true );
         $referer = $_SERVER['REQUEST_URI'];
         header("Location: $referer"."&addmeassage=success");
      }
      }
 ?>
 <!--listing of user created charts starts here -->
<div class="chart-list">
<div class="row">
<div class="col-md-12 table-box">
<?php 
$meassage = '';
if(isset($_GET['addmeassage'])&& $_GET['addmeassage']=='success')
{
$meassage = "Chart is added successfully.";
} elseif(isset($_GET['editmeassage'])&& $_GET['editmeassage']=='success')
{
$meassage = "Chart is modified successfully.";
}elseif(isset($_GET['Delete'])&& $_GET['Delete']=='Success')
{
$meassage = "Chart is deleted successfully.";
}elseif(isset($_GET['meassage'])&& $_GET['Delete']=='Error')
{
$meassage = "Something went wrong.try again later";
}
if($meassage != '')
{
?>
<div id="alert-box" class="alert  alert-box">
<span><?php echo $meassage; ?> </span>
</div>
<?php } ?>
<table class="listing-table"  >
<thead>
<th width="100px">SR No </th>
<th>Title</th>
<th>Shortcode</th>
<th>Created Date</th>
<th>Action </th>
</thead>
<?php 
global $post,$wpdb,$wp_query;
$paged = (filter_var($_GET['paged'])) ? filter_var($_GET['paged']) : 1;
$limit = 10;
$args = array(
'numberposts' => -1,
'posts_per_page'=>10,
'paged' => $paged,
'post_type'   => 'LC-JS-Charts'
);

$latest = new WP_Query($args);
$latest_charts = $latest->posts;
$slug = plugin_basename( __FILE__ );

if ($latest->post_count > 0) {
?>
<tbody>
<?php 
$i = ($paged -1) * $limit + 1;
foreach ($latest_charts as $charts) {
?>
<tr>
<td width="100px"><?php echo $i; ?> </td>
<td><?php echo $charts->post_title; ?> </td>
<td><?php echo '[Lcjs_charts id='.$charts->ID.']' ?> </td>
<td><?php echo $charts->post_date; ?> </td>
<td> 
<a class="thickbox changeStatus" href="#TB_inline?&width=1200&height=900&inlineId=my-content-id" data-id="<?php echo $charts->ID; ?>">
<button class="yello-btn"><span class="">Edit</span></button>
</a>  
<a class="deletestatus"  data-id="<?php echo $charts->ID; ?>">
<button class="yello-btn"><span class="">Delete </span> </button> 
</a> 
</td>
</tr>
<?php
$i++;
} ?>
</tbody>
</table>
<?php
$big = 999999999;
$pages = paginate_links(array(
'base' => str_replace($big, '%#%', get_pagenum_link($big)),
'format' => '?paged=%#%',
'current' => max(1,filter_var($_GET['paged'])),
'total' => $latest->max_num_pages,
'prev_text' => '&laquo;',
'next_text' => '&raquo;',
'type'      => 'array'
));
if ($pages) {
?>
<div class="row col-md-12 count-pages">
<ul class="chart-pagination">
<?php
foreach ($pages as $pgl) {
echo '<li class="page-item">'.$pgl.'</li>';
}
?>
</ul>
</div>
<?php
} ?>
<?php
}else
{
?>
<tbody>
<tr><td colspan="5">No records found</td></tr>
</tbody>
</table>
<?php
}
?>
</div>  
</div> 
</div> 
<!--listing of user created charts ends here -->
<div id="chart-library" style="display:none">
<div class="inner-page-header">
<div class="row">  
<div class="col-lg-2 col-md-0"></div>
<div class="col-lg-8 col-md-12">
<div class="row">        
<div class="col-12 col-md-6 flex-section">
<button id="cancel" class="thickbox">
<div class="menu-icon">
<img src="<?php echo plugins_url('images/back-icon.svg', __FILE__);?>"> 
</div>         
</button> 
<div class="inner-title"> Chart Library </div>
</div>
<div class="col-12 col-md-6 flex-section controls">
<button  class="open_all toggle-all" >
<div class="open_name" >Open all</div></button>
</div> 
</div>  
</div>  
<div class="col-lg-2 col-md-0"></div>
</div> 
</div>  
<!--start -->
<div class="col-lg-2 col-md-0"></div>
<div class="panel-group col-lg-8 col-md-12 chart-lybrary-container" id="accordion" role="tablist" aria-multiselectable="true">
<?php 
$data_chart = $GLOBALS['chart_types'];
$ddata_chart = $GLOBALS['abc'];
if (count($data_chart) > 0) {
$i=1;
foreach ($data_chart as $key=>$value) { ?>
<div class="">
<!--<div class="" role="tab" id="collapse-heading-<?php echo $i; ?>">-->
<button role="button" class="accordion collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse-category-<?php echo $i; ?>" aria-expanded="false" aria-controls="collapse-category-<?php echo $i; ?>">
<div class="flex-section"> 
<div class="category-icon">
<img src="<?php echo $value['icon'];  ?>"> 
</div>
<?php echo $value['name']; ?> 
<p class="accord-p" >
<img src="<?php echo $value['description']; ?>">
</p>                 
</div>    
</button>
<!--</div>-->
<div class="panel-collapse collapse" id="collapse-category-<?php echo $i; ?>" role="tabpanel" aria-labelledby="collapse-heading-<?php echo $i; ?>">
<div class="multiCollapseExample2 flex-chart-examples">
<?php 
if(count($ddata_chart) > 0)
{
$text = $key;
$emp = $ddata_chart[$text];
if (is_array($emp)) {
if (count($emp) > 0) {
foreach ($emp as $key=>$val) {
?>
<div class="accordion_menu">
<a class="thickbox getexample"  data-example="<?php echo $text.'#'.$key; ?>">
<img src="<?php  echo $val['icon'] ; ?>">
<p><?php echo $val['chart_name'] ; ?></span>
</a>
</div>
<?php
}
}
}
}
?>
</div>
</div>
</div>
<?php
$i++;}}?>
</div>
<div class="col-lg-2 col-md-0"></div>
<!-- footer -->  
<div class="row plugin-footer">
<div class="col-md-10"></div>
<div class="col-md-2 logo-footer"> 
<a href="https://www.arction.com/" target="_blank"> 
<img src="<?php echo  plugins_url('images/Footer_1.png', __FILE__ );?>"> </div>
</a>
</div>
</div>
<!--end -->
</div>
</div>
<div>
<!--html body end -->
<style>
.flip {
  transform: rotate(-180deg);
}
</style>
<script>
 var num_of_rows = 0;
 var num_of_col = 0;
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}


jQuery('.accordion').click(function() {
  jQuery(this).find('.accord-p img').css({'transform': ''});
  jQuery(this).find('.accord-p img').toggleClass('flip');
 
});
jQuery('.toggle-all').click(function(){
  
    if (jQuery(this).data("lastState") === null || jQuery(this).data("lastState") === 0) {
      jQuery('.collapse.in').collapse('hide');
      jQuery(this).data("lastState",1);
      jQuery('.open_name').text("Open all");
      jQuery(".accordion").addClass("collapsed");
      jQuery(".accord-p img").removeClass("flip");
      jQuery('.panel-collapse').removeClass("show");
     
    }
    else {
      jQuery('.panel-collapse').removeData('bs.collapse')
        .collapse({toggle:false})
        .collapse('show')
        .removeData('bs.collapse')
        .collapse({parent:'#accordion', toggle:false});
        jQuery(this).data("lastState",0);
        jQuery('.open_name').text("Close all");
        jQuery(".accordion").removeClass("collapsed");
        jQuery(".accord-p img").addClass("flip");
    }

    });
		
    jQuery(document).ready(function() {
      jQuery('a.getexample').on('click', function(e) {
                var getExample = jQuery(this).data('example');
                jQuery("#TB_window").remove();
                jQuery("body").append("<div id='TB_window'></div>");
                var TB_WIDTH = (window.innerWidth-100);
                  TB_HEIGHT = (window.innerHeight-100);
                tb_show("", "#TB_inline?height="+TB_HEIGHT+"&width="+TB_WIDTH+"&inlineId=my-content-id");
                var data = {
                  'action': 'get_example',
                  'Example_name': getExample,
                  asynchronous: false,
                };
                  jQuery.post(ajaxurl, data, function(response) {
                    var obj = jQuery.parseJSON(response);
                    document.getElementsByClassName('tablinks')[0].click();
                    jQuery("#html_code").val(obj.html_code);
                    //jQuery("#javascript_code").val(obj.javascript_code);
                    var js_array = jQuery.parseJSON(obj.javascript_code);
                     num_of_rows =js_array[0].length;
                     num_of_col = js_array.length;
                        jQuery('#example').tabularInput({
                        'rows':num_of_rows,
                        'columns': num_of_col,
                        'animate': true,
                        'name': 'my_javascript_data'
                      });
                     if(js_array.length>0)
                     {
                        for(i=0;i<js_array.length;i++)
                        {
                            column_index = i;
                            column_data = js_array[column_index];
                            num_of_col = column_data.length;
                            for(j=0;j<column_data.length;j++)
                            {
                              jQuery('[name="my_javascript_data['+i+']['+j+']"]').val(column_data[j]);
                            }
                        }
                     }
                     jQuery("#example").tabularInput("addRow");			// Add a row at the end
                    jQuery("#example").tabularInput("deleteRow");			// Delete the last row
                    jQuery("#example").tabularInput("deleteRow");		// Delete row at index 2
                    jQuery("#example").tabularInput("addColumn");			// Add a column at the end
                    jQuery("#example").tabularInput("deleteColumn"); 
                    jQuery('#Title_name').val(obj.example_title);
                    jQuery('#sel_chart_type').val(getExample);
                    preview_value();
                  });
            });
        });

        jQuery( 'body' ).on( 'thickbox:removed', function() {
          location.reload();
        });
  
        jQuery('button#cancel').on('click', function(e){
            e.preventDefault();
            //jQuery('#save_status').val('unsave');
            var status = jQuery('#save_status').val();
            if(status=='unsave')
            {
              var x = confirm("Changes that you made may not be saved");
              if(x)
              {
               
                location.reload();
              }else{
                
                e.preventDefault(); 
              }
            }else
            {
              location.reload();
            }
        });
     
        function export_sample_data()
        {
                jQuery.ajax({
                  url: ajaxurl+'?action=export_sample_example',
                  data: jQuery('#myForm').serializeArray(),
                  type : 'POST',
                  success: function(data){
                      var downloadLink = document.createElement("a");
                      var fileData = [data];
                      var blobObject = new Blob(fileData,{
                        type: "octet/stream"
                      });
                      var url = URL.createObjectURL(blobObject);
                      downloadLink.href = url;
                      downloadLink.download = "sample_data.csv";
                      document.body.appendChild(downloadLink);
                      downloadLink.click();
                      document.body.removeChild(downloadLink); 
                  }
                });
        }
     
        function preview_value() {
              var html_code = document.getElementById("myForm").elements.namedItem("html").value;
              var javascript_code = document.getElementById("myForm").elements.namedItem("javascript").value;
              document.getElementById("demo").innerHTML = html_code + javascript_code ;
              var set_title=  jQuery('#set_title').val();
              var  sel_chart_type=  jQuery('#sel_chart_type').val();
              //var colorpicker = jQuery('#colorpicker').val();
              if(html_code=='')
              {
                alert("Enter Html and javascript code");
              }else
              {
                var data = {
                        'html_code': html_code,
                        'javascript_code': javascript_code,
                        'set_title': set_title,
                        'sel_chart_type': sel_chart_type,
                        //'colorpicker': colorpicker,
                        'data' : jQuery('#myForm').serializeArray()
                        
                      };
                jQuery.ajax({
                  //url: "<?php echo plugins_url('preview.php',__FILE__); ?>",
                  url:ajaxurl+"?action=get_my_preview",
                  data:jQuery('#myForm').serializeArray(),
                  type : 'POST',
                  success: function(response){
                      jQuery("#demo").html('');
                      jQuery("#demo").html(response);
                  }
                });
            }
            }

            function tabs(evt, tab) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
              tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
              tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tab).style.display = "block";
            evt.currentTarget.className += " active";
          }
          function removeURLParameter(url, parameter) {
                  var urlparts= url.split('?');   
                  if (urlparts.length>=2) {

                      var prefix= encodeURIComponent(parameter)+'=';
                      var pars= urlparts[1].split(/[&;]/g);
                      for (var i= pars.length; i-- > 0;) {    
                          if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                              pars.splice(i, 1);
                          }
                      }

                      url= urlparts[0]+'?'+pars.join('&');
                      return url;
                  } else {
                      return url;
                  }
              }
  function objectToArray(obj) {
    var array = [];
    for (prop in obj) {
      
        if (obj.hasOwnProperty(prop)) {
            array.push(obj[prop]);
        }
    }
    return array;
}
jQuery(document).ready(function() {
  jQuery('a.changeStatus').on('click', function(e) {
      var rowid = jQuery(this).data('id');
      jQuery('#edit_id').val(rowid);

      var data = {
        'action': 'edit_get_data',
        'edit_id': rowid
      };
        jQuery.post(ajaxurl,data, function(response) {
          var obj = jQuery.parseJSON(response);
          jQuery("#html_code").val(obj.html_code);
          jQuery("#javascript_code").val(obj.javascript_code);
          var js_array = jQuery.parseJSON(obj.javascript_code);
            num_of_rows =js_array[0].length;
            num_of_col = js_array.length;
                jQuery('#example').tabularInput({
              'rows':num_of_rows,
              'columns': num_of_col,
              'animate': true,
              'name': 'my_javascript_data'
            });
            
            if(js_array.length>0)
            {
              for(i=0;i<js_array.length;i++)
              {
                  column_index = i;
                  column_data = js_array[column_index];
                  num_of_col = column_data.length;
                  for(j=0;j<column_data.length;j++)
                  {
                    jQuery('[name="my_javascript_data['+i+']['+j+']"]').val(column_data[j]);
                  }
              }
            }
          jQuery("#example").tabularInput("addRow");			// Add a row at the end
          jQuery("#example").tabularInput("deleteRow");			// Delete the last row
          jQuery("#example").tabularInput("deleteRow");		// Delete row at index 2
          jQuery("#example").tabularInput("addColumn");			// Add a column at the end
          jQuery("#example").tabularInput("deleteColumn"); 
          jQuery('#resource_code').val(obj.resources);
          jQuery('#height').val(obj.height);
          jQuery('#width').val(obj.width);
          jQuery('#Title_name').val(obj.post_title);
          jQuery('#set_title').val(obj.set_title);
          jQuery('#sel_chart_type').val(obj.sel_chart_type);
          //jQuery('#colorpicker').val(obj.set_color);
          document.getElementsByClassName('tablinks')[0].click();
          preview_value();
        });

  });
  jQuery('a.deletestatus').on('click', function(e) {
    
      var x = confirm("Are you sure you want to delete?");
    if(x)
    {
      var rowid = jQuery(this).data('id');
            
        var data = {
          'action': 'delete_list',
          'delete_id': rowid,
        };
        jQuery.post(ajaxurl, data, function(response) {
          var obj = jQuery.parseJSON(response);
          key = 'addmeassage';
          url = window.location.href;
              
          // Remove specific parameter from query string
          filteredURL =removeURLParameter(url, 'addmeassage');
            if(obj.delete==1)
            {
            window.location.href = filteredURL + "&Delete=Success";
            }else
            {
            window.location.href = filteredURL + "&meassage=Error" ;
            }
        });

      }else
      {
        return false;
      }
  });


});

    function validate_me()
    {
      var str = '';
      html_code = jQuery('#html_code').val();
      sel_chart_type = jQuery('#sel_chart_type').val();
      resource_code = jQuery('#resource_code').val();
      if(html_code=='')
      {
        str += 'Please, enter html.\n';
      }
    
      if(sel_chart_type=='')
      {
        str += 'Please, select chart type in settings tab.\n';
      }
      if(str == '')
      {
        var post = JSON.stringify({"data":hot.getData()});
        document.getElementById('javascript_code').value =post ;
        return true;
      }else
      {
        alert(str);
        return false;
      }

    }
    document.getElementsByClassName('tablinks')[0].click();
  
    function textarea_change()
  {
    jQuery('#save_status').val('unsave');
    prettyPrint();
  }  


  jQuery(document).ready(function() {
  setTimeout(function() {
    key = 'addmeassage';
    url = window.location.href;
    if (window.location.href.indexOf("editmeassage") > -1) {
        filteredURL =removeURLParameter(url, 'addmeassage');
        window.location.href = filteredURL;
    }
    if (window.location.href.indexOf("Delete") > -1) {
      filteredURL =removeURLParameter(url, 'Delete');
      window.location.href = filteredURL;
    }
    if (window.location.href.indexOf("editmeassage") > -1) {
      filteredURL =removeURLParameter(url, 'editmeassage');
      window.location.href = filteredURL;
    }    
  }, 2000);
  clearInterval() ;
});

function prettyPrint() 
{
  
  var ugly = document.getElementById('javascript_code').value;
  var obj = JSON.parse(ugly);
  var pretty = JSON.stringify(obj, undefined, 4);
  document.getElementById('javascript_code').value = pretty;
}
jQuery(function ($) {
    var $active = $('#accordion .panel-collapse.in').prev().addClass('active');
    $active.find('a').prepend('<i class="glyphicon glyphicon-minus"></i>');
    $('#accordion .panel-heading').not($active).find('a').prepend('<i class="glyphicon glyphicon-plus"></i>');
    $('#accordion').on('show.bs.collapse', function (e) {
        $('#accordion .panel-heading.active').removeClass('active').find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
        $(e.target).prev().addClass('active').find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
    })
  });

  function invoke_file()
  {
    jQuery("#javascript_csv").trigger('click');
  }

jQuery('#example').tabularInput({
    'rows':2,
    'columns': 2,
    'animate': true,
    'name': 'my_javascript_data'
  }); jQuery("#example").tabularInput("addRow");			// Add a row at the end
jQuery("#example").tabularInput("deleteRow");			// Delete the last row
jQuery("#example").tabularInput("deleteRow");		// Delete row at index 2
jQuery("#example").tabularInput("addColumn");			// Add a column at the end
jQuery("#example").tabularInput("deleteColumn");
</script>  