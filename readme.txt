=== Gravity Forms Fields Persistence ===
Contributors: radishconcepts, acsnaterse
Tags: grafity forms, forms, persistence
Requires at least: 3.0
Tested up to: 4.9.7
Stable tag: 4.9.7
Requires PHP: 5.6
License: GPL-3.0-only
License URI: https://www.gnu.org/licenses/gpl-3.0.html

# GravityForms Field Persistence plugin

This plugin makes it able to save users data, in order to prefill the data in other forms on the site.

## How does it work?
This plugin uses the dynamic input name, which can be entered in a Gravity Forms field. As long these names are the same across different forms, the fields will be automatically populated. The data will be stored in a cookie. 

Since all the functionality is handled by Javascript, it will also work on site with Varnish cache.

## What fields does it support
Currently only text and textarea fields are supported. We will add more fields along the way. Please also submit you requests as an issue!

## Props
Thanks to https://wisdmlabs.com/blog/gravity-forms-data-persistent-for-save-progress/ which gave us the initial idea, however we needed it to work with Varnish, so we created this Javascript-based version.
 


== Changelog ==

= 1.0.2 =
* Stupid JS fix (debug info removed)


= 1.0 =
* Initial plugin


