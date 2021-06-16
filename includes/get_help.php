<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<style>
#TB_ajaxContent
{
 background-image: url('<?php echo 
 plugins_url('images/download.jpg', __FILE__ ); ?>');
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
background: transparent url('<?php echo plugins_url('images/logo.png', __FILE__ );?>') 0% 0% no-repeat padding-box;
opacity: 1;
}
.listing-box
{
  padding: 75px;
}
.bla-yellow
{
  border-color: #fecc00;
  border-style: solid;
  border-radius:10px;
  color: aliceblue;
}
div.panel {
			padding: 0 18px;
			background-color: black;
			max-height: 0;
			overflow: hidden;
			transition: 0.6s ease-in-out;
			opacity: 0;
		}
		div.panel p {
        color:white;
        }
		div.panel.show {
			opacity: 1;
			max-height: 500px;  
		}
        .close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.modal-dialog{
  max-width: 750px !important;
  height: inherit;
}
.close:hover,.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 100%!important;
}
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.modal-backdrop
{
    z-index: 0;
}
.document-box{
    text-align: center;
    
   
}
.document-box span{
  width:450;
     height:550;
}
.lc-platform {
    background-color: #fecc00;
    /* font-size: 27px; */
    font-weight: bold;
    border-radius: 100px;
    padding: 0 18px;
    line-height: 1.7em;
    white-space: nowrap;
    border-color: #000;
    color: #000!important;
    margin: 0 30px 20px 0;
    display: inline-block;
   
}
</style>

<div class="lc-main-header">
  <div class="row">
    <div class="col-md-8 logo-box"> 
      <div class="lazy-logo"></div>
      <span class="tag-line-span">The highest-performance <span class="js-tag">JavaScript</span> charting library focusing on real-time data visualization</span>
    </div>    
  </div>
</div>  

<div class="title-page">
  <h2>Resources<h2>
</div>


<div class="help-items">
  <div class="row">
    <div class="col-12 col-md-6" data-toggle="modal" data-target="#myModal">
      <div class="h-item">
        <img class="documentation-icon" src="<?php echo 
        plugins_url('../images/icons/documentation-icon.svg', __FILE__ );?>">
        <h2>Documentation</h2>
      </div>  
    </div>
    <div class="col-12 col-md-6" data-toggle="modal" data-target="#myModalyoutube">
      <div class="h-item">
        <img src="<?php echo plugins_url('../images/icons/gettingstarted-icon.svg', __FILE__ );?>">
        <h2>Getting started video</h2>
      </div>  
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <embed src="<?php echo 
     plugins_url('lcjs_documentation.pdf', __FILE__ );?>" width="90%" height="550" /> 
    </div>
  </div>
</div>

<div class="modal fade" id="myModalyoutube" tabindex="-1" role="dialog" aria-labelledby="myModalyoutube" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content" style="width:1290;height:700;">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <iframe width="100%" height="95%" src="https://www.youtube.com/embed/LAR6hoOXttk" frameborder="0" allowfullscreen></iframe>
  </div>
  </div>
</div>