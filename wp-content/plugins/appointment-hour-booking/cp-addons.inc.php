<?php

if ( !is_admin() ) 
{
    echo 'Direct access not allowed.';
    exit;
}

global $wpdb, $cpappb_addons_active_list, $cpappb_addons_objs_list;

$message = "";

if( isset( $_GET[ 'b' ] ) && $_GET[ 'b' ] == 1 )
{
    $this->verify_nonce ($_GET["anonce"], 'cpappb_actions_list');
	// Save the option for active addons
	delete_option( 'cpappb_addons_active_list' );
	if( !empty( $_GET[ 'cpappb_addons_active_list' ] ) && is_array( $_GET[ 'cpappb_addons_active_list' ] ) ) 
	{
		update_option( 'cpappb_addons_active_list', $_GET[ 'cpappb_addons_active_list' ] );
	}	
	
	// Get the list of active addons
	$cpappb_addons_active_list = get_option( 'cpappb_addons_active_list', array() );
    $message = "Add Ons settings updated";
}

$nonce = wp_create_nonce( 'cpappb_actions_list' );

?>
<style>
	.clear{clear:both;}
	.ahb-addons-container {
		border: 1px solid #e6e6e6;
		padding: 20px;
		border-radius: 3px;
		-webkit-box-flex: 1;
		flex: 1;
		margin: 1em 1em 1em 0;
		min-width: 200px;
		background: white;
		position:relative;
	}
	.ahb-addons-container h2{margin:0 0 20px 0;padding:0;}
	.ahb-addon{border-bottom: 1px solid #efefef;padding: 10px 0;}
	.ahb-addon:first-child{border-top: 1px solid #efefef;}
	.ahb-addon:last-child{border-bottom: 0;}
	.ahb-addon label{font-weight:600;}
	.ahb-addon p{font-style:italic;margin:5px 0 0 0;}
	.ahb-first-button{margin-right:10px !important;}
    
    .ahb-buttons-container{margin:1em 1em 1em 0;}
    .ahb-return-link{float:right;}

	.ahb-disabled-addons {
		background: #f9f9f9;
	}
	.ahb-addons-container h2{margin-left:30px;}
	.ahb-disabled-addons *{
		color:#888888;
	}
	.ahb-disabled-addons input{
		pointer-events: none !important;
	}

	/** For Ribbon **/
	.ribbon {
		position: absolute;
		left: -5px; top: -5px;
		z-index: 1;
		overflow: hidden;
		width: 75px; height: 75px;
		text-align: right;
	}
	.ribbon span {
		font-size: 10px;
		font-weight: bold;
		color: #FFF;
		text-transform: uppercase;
		text-align: center;
		line-height: 20px;
		transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
		width: 100px;
		display: block;
		background: #79A70A;
		background: linear-gradient(#2989d8 0%, #1e5799 100%);
		box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
		position: absolute;
		top: 19px; left: -21px;
	}
	.ribbon span::before {
		content: "";
		position: absolute; left: 0px; top: 100%;
		z-index: -1;
		border-left: 3px solid #1e5799;
		border-right: 3px solid transparent;
		border-bottom: 3px solid transparent;
		border-top: 3px solid #1e5799;
	}
	.ribbon span::after {
		content: "";
		position: absolute; right: 0px; top: 100%;
		z-index: -1;
		border-left: 3px solid transparent;
		border-right: 3px solid #1e5799;
		border-bottom: 3px solid transparent;
		border-top: 3px solid #1e5799;
	}
</style>

<script type="text/javascript">
    
 function cp_activateAddons()
 {
    var cpappb_addons = document.getElementsByName("cpappb_addons"),
		cpappb_addons_active_list = [];
	for( var i = 0, h = cpappb_addons.length; i < h; i++ )
	{
		if( cpappb_addons[ i ].checked ) cpappb_addons_active_list.push( 'cpappb_addons_active_list[]='+encodeURIComponent( cpappb_addons[ i ].value ) );
	}	
	document.location = 'admin.php?page=<?php echo $this->menu_parameter; ?>_addons&anonce=<?php echo $nonce; ?>&b=1&r='+Math.random()+( ( cpappb_addons_active_list.length ) ? '&'+cpappb_addons_active_list.join( '&' ) : '' )+'#addons-section';
 }    
 
</script>

<a id="top"></a>

<h1><?php _e('Appointment Hour Booking - Add Ons','appointment-hour-booking'); ?></h1>

<?php if ($message) echo "<div id='setting-error-settings_updated' class='updated' style='margin:0px;'><h2>".$message."</h2></div> <br />";
 ?>

<div class="ahb-buttons-container">
	<a href="<?php print esc_attr(admin_url('admin.php?page='.$this->menu_parameter));?>" class="ahb-return-link">&larr;<?php _e('Return to the calendars list','appointment-hour-booking'); ?></a>
	<div class="clear"></div>
</div>


<input type="button" value="Activate/Deactivate Marked Add Ons" onclick="cp_activateAddons();" class="button button-primary ahb-first-button" />
<input type="button" value="Get The Full List of Add Ons" onclick="document.location='?page=cp_apphourbooking_upgrade';"class="button" />
<div class="clear"></div>

<!-- Add Ons -->
<h2><?php _e('Active Add Ons','appointment-hour-booking'); ?></h2>
<div class="ahb-addons-container">
	<div class="ahb-addons-group">

	<?php
	foreach( $cpappb_addons_objs_list as $key => $obj )
	{
		print '<div class="ahb-addon" style="border:0;"><label><input type="checkbox" id="'.$key.'" name="cpappb_addons" value="'.$key.'" '.( ( $obj->addon_is_active() ) ? 'CHECKED' : '' ).'>'.$obj->get_addon_name().'</label><p>'.$obj->get_addon_description().'</p></div>';
	}
	?>    
		
	</div>
</div>

<!-- Disabled Add Ons -->
<h2><?php _e('The following Add Ons are included in the commercial versions of the plugin:','appointment-hour-booking'); ?></h2>

<div class="ahb-addons-container ahb-disabled-addons">
	<div class="ribbon"><span>Upgrade</span></div>
	<h2>Payment Gateways Integration</h2>
	<div class="ahb-addons-group">
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>PayPal Standard Payments Integration</label>
			<p>The add-on adds support for PayPal Standard payments</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Authorize.net Server Integration Method</label>
			<p>The add-on adds support for Authorize.net Server Integration Method payments</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>iDeal Mollie</label>
			<p>The add-on adds support for iDeal via Mollie payments</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>iDeal TargetPay</label>
			<p>The add-on adds support for iDeal via TargetPay payments</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>PayPal Pro</label>
			<p>The add-on adds support for PayPal Payment Pro payments to accept credit cars directly into the website</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>RedSys TPV</label>
			<p>The add-on adds support for RedSys TPV payments</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>SagePay Payment Gateway</label>
			<p>The add-on adds support for SagePay payments</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>SagePayments Payment Gateway</label>
			<p>The add-on adds support for SagePayments payments</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Skrill Payments Integration</label>
			<p>The add-on adds support for Skrill payments</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Square</label>
			<p>The add-on adds support for Square (squareup.com) payments</p>
		</div>        
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Stripe</label>
			<p>The add-on adds support for Stripe payments</p>
		</div>
	</div>
</div>
<div class="ahb-to-top"><a href="#top">&uarr; Top</a></div>

<div class="ahb-addons-container ahb-disabled-addons">
	<div class="ribbon"><span>Upgrade</span></div>
	<h2>Integration with third party plugins</h2>
	<div class="ahb-addons-group">
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>WooCommerce</label>
			<p>The add-on allows integrate the forms with WooCommerce products</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>myCred: Integration with myCred credit payments</label>
			<p>The add-on adds support for <a href="https://wordpress.org/plugins/mycred/" target="_blank">myCred plugin</a> payments</p>
		</div>        
	</div>
</div>
<div class="ahb-to-top"><a href="#top">&uarr; Top</a></div>


<div class="ahb-addons-container ahb-disabled-addons">
	<div class="ribbon"><span>Upgrade</span></div>
	<h2>Integration with External Calendars</h2>
	<div class="ahb-addons-group">  
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>iCal Automatic Import</label>
			<p>The add-on adds support for importing iCal files from external websites/services</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Google Calendar API</label>
			<p>The add-on adds support for Google Calendar API integration</p>
		</div>       
	</div>
</div>
<div class="ahb-to-top"><a href="#top">&uarr; Top</a></div>

<div class="ahb-addons-container ahb-disabled-addons">
	<div class="ribbon"><span>Upgrade</span></div>
	<h2>Improvements</h2>
	<div class="ahb-addons-group">
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Appointment Cancellation</label>
			<p>The add-on adds support for cancellation links into the notification emails</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Appointment Follow-up</label>
			<p>The add-on adds the follow-up emails/notifications for appointments feature</p>
		</div>        
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Appointment Reminders</label>
			<p>The add-on adds the reminder emails/notifications for appointments feature</p>
		</div>        
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Coupon codes</label>
			<p>The add-on adds support for coupons / discounts codes</p>
		</div>  
        <div class="ahb-addon">
			<label><input type="checkbox" disabled>Data Lookup</label>
			<p>The add-on enables data lookup in previous bookings to auto-fill fields</p>
		</div>         
        <div class="ahb-addon">
			<label><input type="checkbox" disabled>Deposit Payments</label>
			<p>The add-on enables the option to accept payment deposit as fixed amount or percent of the booking cost</p>
		</div> 
        <div class="ahb-addon">
			<label><input type="checkbox" disabled>Double opt-in email verification</label>
			<p>Double opt-in email verification link to mark the booking as approved</p>
		</div>         
        <div class="ahb-addon">
			<label><input type="checkbox" disabled>Edition / Booking modification for customers</label>
			<p>The add-on allows customers to modify/edit bookings</p>
		</div>         
        <div class="ahb-addon">
            <label><input type="checkbox" disabled>Frontend List: Grouped by Date Add-on</label>
            <p>The add-on allows to displays list (schedule) of bookings grouped by date in the frontend</p>
        </div>        
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Limit the number of appointments per user</label>
			<p>The add-on adds support for limiting the number of appointments per user</p>
		</div>
        <div class="ahb-addon">
            <label><input type="checkbox" disabled>Password for making bookings</label>
            <p>The add-on is for requiring a password to make a booking.</p>
        </div>           
        <div class="ahb-addon">
            <label><input type="checkbox" disabled>QRCode Image - Barcode</label>
            <p>Generates a QRCode image for each booking.</p>
        </div>                 
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Remove or Ignore Old Bookings</label>
			<p>The add-on allows to automatically remove or ignore old bookings to increase the booking form speed.</p>
		</div>        
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Schedude Calendar Contents Customization</label>
			<p>The add-on allows to customize the content displayed on the schedule calendar for each form.</p>
		</div>
        <div class="ahb-addon">
            <label><input type="checkbox" disabled>Shared Availability between Calendars</label>
            <p>The add-on allows to share the booked times between calendars (for blocking booked times)"</p>
        </div>                
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Signature Fields</label>
			<p>The add-on allows to replace form fields with "Signature" fields</p>
		</div>
        <div class="ahb-addon">
            <label><input type="checkbox" disabled>Status Modification Emails</label>
            <p>The add-on allows to define emails to be sent when the booking status is changed from the bookings list or by a payment add-on</p>
        </div>           
        <div class="ahb-addon">
			<label><input type="checkbox" disabled>Timezone Conversion</label>
			<p>The add-on applies the timezone conversion to display the time-slots in the customer timezone</p>
		</div>        
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Uploads</label>
			<p>The add-on allows to add the uploaded files to the Media Library, and the support for new mime types</p>
		</div>      
        <div class="ahb-addon">
			<label><input type="checkbox" disabled>User Calendar Creation</label>
			<p>The add-on creates and assign a calendar for each new registered user</p>
		</div>        
	</div>
</div>
<div class="ahb-to-top"><a href="#top">&uarr; Top</a></div>

<div class="ahb-addons-container ahb-disabled-addons">
	<div class="ribbon"><span>Upgrade</span></div>
	<h2>Integration with third party services</h2>
	<div class="ahb-addons-group">
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>MailChimp</label>
			<p>The add-on creates MailChimp List members with the submitted information</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>reCAPTCHA</label>
			<p>The add-on allows to protect the forms with reCAPTCHA service of Google</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>SalesForce</label>
			<p>The add-on allows create SalesForce leads with the submitted information</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>WebHook</label>
			<p>The add-on allows put the submitted information to a webhook URL, and integrate the forms with the Zapier service</p>
		</div>
        <div class="ahb-addon">
			<label><input type="checkbox" disabled>Zoom.us Meetings Integration</label>
			<p>Automatically creates a Zoom.us meeting for the booked time</p>
		</div>         
	</div>
</div>
<div class="ahb-to-top"><a href="#top">&uarr; Top</a></div>

<div class="ahb-addons-container ahb-disabled-addons">
	<div class="ribbon"><span>Upgrade</span></div>
	<h2>SMS Text Delivery</h2>
	<div class="ahb-addons-group">
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Twilio</label>
			<p>The add-on allows to send notification and reminder messages (SMS) via Twilio</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>Clickatell</label>
			<p>The add-on allows to send notification and reminder messages (SMS)  via Clickatell</p>
		</div>
		<div class="ahb-addon">
			<label><input type="checkbox" disabled>SMSBroadcast.com.au</label>
			<p>The add-on allows to send notification and reminder messages (SMS) via SMSBroadcast.com.au</p>
		</div>        
	</div>
</div>
<div class="ahb-to-top" style="margin-bottom:10px;"><a href="#top">&uarr; Top</a></div>

<input type="button" value="Activate/Deactivate Marked Add Ons" onclick="cp_activateAddons();" class="button button-primary ahb-first-button" />
<input type="button" value="Get The Full List of Add Ons" onclick="document.location='?page=cp_apphourbooking_upgrade';"class="button" />
<div class="clear"></div>