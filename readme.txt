#LC JS Charts

Contributors:      chetanakamble
Plugin Name:       LC JS Charts
Plugin URI:        https://github.com/Arction/lcjs-wordpress-plugin
Tags:              comments, spam
Author URI:        https://www.arction.com/
Author:            Arction
Donate link:       https://www.arction.com/contact/
Requires at least: 4.7
Tested up to:      5.5.1
Requires PHP:      5.6
Stable tag:        4.3
Version:           1.0
License:           Apache-2.0
License URI:       http://www.apache.org/licenses/LICENSE-2.0

LCJS Charts is a LightningChart JS plugin that can easily be used to create, update, manage 
and embed interactive charts into your WordPress posts and pages.


== Description ==

= Important disclaimer =
This plugin loads JavaScript libraries, LightningChart® JS, from external @arction, 
which is a data visualization library (free for non-commercial use), provided by Arction Ltd.
 LightningChart® JS shows a logo in the corner of the chart. 
 This small contribution comes from LightningChart® JS, and is not added by this plugin itself.

Relatated links :
https://www.arction.com/community-license
https://www.arction.com/terms-and-conditions/

= What is it? =
LightningChart® JS’s exceptionally powerful rendering ensures smooth animations exceeding all 
industry standards in amount of data per chart. The graphing library provides intuitive touch 
screen interactivity with zooming, panning, moving data cursors and so on.
Dashboard control makes it easy and convenient to manage dozens of charts, legend boxes, buttons, check boxes and other UI elements. 
The dashboard is rendered resource efficiently in single GPU scene which also makes resizeing columns and rows very fast.

#Installation
1. Use GitLab Page to clone the LC-JS plugin or downloaded the .zip or .rar file.
2. Copy all files of plugin in folder and name the folder as "LC-JS".(If your downloaded zip name folder is other than 'LC-JS' then rename it to "LC-JS") 
3. After downloading the archive file make sure to place all files in directory as follows:
      Xampp > htdocs > wordpress(Project folder) > wp-content > plugins > LC-JS
4.Login to wordpress admin panel,In plugins list ,activate LC-JS plugin. It is ready to use.

#Description
LC-JS plugin provides Chart Library which includes all exsisting charts that you can change or update. Also you can create new charts with custom data.
        
##features:
        * Create new chart
        * Create shortcode
        * Edit or Delete Chart
        * Preview Chart
        * Add Custom data
        * Import and Export Data
        * Add Column,Add Row,Delete Column,Delete Row
        * Custom set Height,Width and chart title

You can also use a built-in PHP function to invoke the chart anywhere in your template:
`<?php code(do_shortcode('[Lcjs_charts id=$chart_id]')); ?>`


The plugin has also many helpful functions:
 * Default working example for reference in each chart type
 * Required libraries and available resources load automatically.


#Upgrade Notice
  1.0 

Upgrade notices describe the reason a user should upgrade.
# Screenshots
1. screenshot-1
2. screenshot-2

#Changelog
  1.0 
* LightningChart JS bundle is distributed containing CommonJS and IIFE builds with types declaration file for convenient development experience for both JavaScript and TypeScript developers.

#Upgrade Notice
  1.0
#Frequently Asked Questions 
#1.What is LightningChart JS best at?
LightningChart JS shines at building applications with the following properties:
	Applications that deal with extensive datasets.
	Applications that deal with high-intensity data streams.
	Applications that deploy on multiple platforms.
#2.What LightningChart JS can do? For what it can be used for?
	LightningChart JS is developed to provide high-performance data-visualization solutions for websites and web applications.
	LightningChart JS can draw:
           1.Charts and Graphs (Line plot, Scatter plot, Area plot, etc.);
           2.UI elements (Buttons, Checkboxes, Annotations, etc.);
           3.Dashboard with multiple charts and UI inside one pane.

#Related links :
https://www.arction.com/community-license
https://www.arction.com/terms-and-conditions/
