<?php
/*

*/
require_once dirname( __FILE__ ).'/base.addon.php';

if( !class_exists( 'CPAPPB_iCalExport' ) )
{
    class CPAPPB_iCalExport extends CPAPPB_BaseAddon
    {

        /************* ADDON SYSTEM - ATTRIBUTES AND METHODS *************/
		protected $addonID = "addon-iCalExport-20170903";
		protected $name = "iCal Export Addon";
		protected $description;
        
		public function get_addon_form_settings( $form_id )
		{
			global $wpdb, $cp_appb_plugin;
            
            $cp_appb_plugin->add_field_verify ($wpdb->prefix.$this->form_table, 'attachical');
            $cp_appb_plugin->add_field_verify ($wpdb->prefix.$this->form_table, 'base_summary');
            $cp_appb_plugin->add_field_verify ($wpdb->prefix.$this->form_table, 'base_description');
            
			// Insertion in database
			if(
				isset( $_REQUEST[ 'CPAPPB_icalexport_id' ] )
			)
			{
			    $wpdb->delete( $wpdb->prefix.$this->form_table, array( 'formid' => $form_id ), array( '%d' ) );
				$wpdb->insert(
								$wpdb->prefix.$this->form_table,
								array(
									'formid' => $form_id,

									'observe_day_light'	 => $_REQUEST["observe_day_light"],									
									'ical_daylight_zone'	 => $_REQUEST["ical_daylight_zone"],
									'cal_time_zone_modify'	 => $_REQUEST["cal_time_zone_modify"],
                                    'attachical'	 => $_REQUEST["attachical"],
                                    'base_summary'	 => $_REQUEST["base_summary"],
                                    'base_description'	 => $_REQUEST["base_description"]

								),
								array( '%d', '%s', '%s', '%s', '%s', '%s', '%s' )
							);
			}

			$rows = $wpdb->get_results(
						$wpdb->prepare( "SELECT * FROM ".$wpdb->prefix.$this->form_table." WHERE formid=%d", $form_id )
					);
			if (!count($rows))
			{
			    $row["observe_day_light"] = "true";
			    $row["ical_daylight_zone"] = "EUROPE";
                $row["cal_time_zone_modify"] = '';
                $row["attachical"] = '';
                $row["base_summary"] = 'Booking for %email%';
                $row["base_description"] = 'Booking for %email%';
			} else {
			    $row["observe_day_light"] = $rows[0]->observe_day_light;
			    $row["ical_daylight_zone"] = $rows[0]->ical_daylight_zone;
                $row["cal_time_zone_modify"] = $rows[0]->cal_time_zone_modify;
                $row["attachical"] = $rows[0]->attachical;
                $row["base_summary"] = $rows[0]->base_summary;
                $row["base_description"] = $rows[0]->base_description;
			}			
			?>
			<div id="metabox_basic_settings" class="postbox" >
				<h3 class='hndle' style="padding:5px;"><span><?php print $this->name; ?></span></h3>
				<div class="inside">
				   <input type="hidden" name="CPAPPB_icalexport_id" value="1" />
                   iCal link:
                   <div style="border:1px dotted black;padding:5px;">
                    <a href="<?php echo $this->getiCalLink($form_id); ?>"><?php echo $this->getiCalLink($form_id); ?></a>
                   </div>
                   <p>To export the iCal link with Google Calendar on a regular basis, please read the instructions on this Google page:</p>
                   <p><a href="https://support.google.com/calendar/answer/37100?hl=en">https://support.google.com/calendar/answer/37100?hl=en</a></p>
                   <p>This will automatically export the bookings stored in the plugin to the Google Calendar (one way sync).</p>
                   <hr />
                   <table class="form-table">
                    <tr valign="top">
                    <th scope="row"><?php _e('iCal timezone difference', 'appointment-hour-booking'); ?></th>
                    <td><select name="cal_time_zone_modify">
                          <option value="">- none -</option> 
                          <?php for ($i=-23;$i<24; $i++) { ?>        
                           <option value="<?php $text = " ".($i<=0?"":"+").$i." hours"; $text2 = " ".($i<=0?"+".(-1*$i):"-".$i)." hours"; echo $text; ?>" <?php if ($row["cal_time_zone_modify"] == $text) echo ' selected'; ?>><?php echo $text2; ?></option>
                          <?php } ?>
                         </select>
                         <br /><em>Note: Based in your computer timezone the recommended setting for this field is <strong><span id="ahbrectime"></span> hours</strong></em>
                    </td>
                    </tr>
                    <tr valign="top">
                    <th scope="row"><?php _e('Observe daylight saving time?', 'appointment-hour-booking'); ?></th>
                    <td><select name="observe_day_light">
                          <option value="true" <?php if ($row["observe_day_light"] == '' || $row["observe_day_light"] == 'true') echo ' selected'; ?>>Yes</option> 
                          <option value="false" <?php if ($row["observe_day_light"] == 'false') echo ' selected'; ?>>No</option>
                         </select>
                    </td>
                    </tr>
                    <tr valign="top">
                    <th scope="row"><?php _e('Daylight saving time zone', 'appointment-hour-booking'); ?></th>
                    <td><select name="ical_daylight_zone">
                          <option value="EUROPE" <?php if ($row["ical_daylight_zone"] == '' || $row["ical_daylight_zone"] == 'EUROPE') echo ' selected'; ?>>Europe</option> 
                          <option value="USA" <?php if ($row["ical_daylight_zone"] == 'USA') echo ' selected'; ?>>USA</option>
                         </select>
                    </td>
                    </tr>
                    <tr valign="top">
                    <th scope="row"><?php _e('Attach iCal file to notification emails?', 'appointment-hour-booking'); ?></th>
                    <td><select name="attachical">
                          <option value="0" <?php if ($row["attachical"] == '' || $row["attachical"] == '0') echo ' selected'; ?>>No</option> 
                          <option value="1" <?php if ($row["attachical"] == '1') echo ' selected'; ?>>Yes</option>
                         </select>
                         <br />
                         <em>* Important note: The folder "/wp-content/uploads/" must exist and have enough permissions to generate the iCal file to be attached.</em>
                    </td>
                    </tr>   
                    <tr valign="top">
                    <th scope="row"><?php _e('iCal entry summary', 'appointment-hour-booking'); ?></th>
                    <td><textarea name="base_summary"><?php echo esc_textarea($row["base_summary"]); ?></textarea>
                         <br />
                         <em>* Note: You can get the field IDs/tags from the form builder.</em>
                    </td>
                    </tr>
                    <tr valign="top">
                    <th scope="row"><?php _e('iCal entry description', 'appointment-hour-booking'); ?></th>
                    <td><textarea name="base_description"><?php echo esc_textarea($row["base_description"]); ?></textarea>
                         <br />
                         <em>* Note: You can get the field IDs/tags from the form builder.</em>
                    </td>
                    </tr>                    
                  </table>
				</div>
			</div>
            <script>
function ahbstartTime() {
  var today = new Date();
  var diff = -1*parseInt(today.getTimezoneOffset()/60);
  if (diff >0) diff = "+"+diff;
  document.getElementById("ahbrectime").innerHTML = diff; 
}
ahbstartTime();              
            </script>
			<?php
		} // end get_addon_form_settings



		/************************ ADDON CODE *****************************/

        /************************ ATTRIBUTES *****************************/

        private $form_table = 'cpappbk_icalexport';
        private $_inserted = false;

        /************************ CONSTRUCT *****************************/

        function __construct()
        {
			$this->description = __("The add-on adds support for exporting iCal files.", 'appointment-hour-booking' );
            // Check if the plugin is active
			if( !$this->addon_is_active() ) return;

			add_action( 'init', array( &$this, 'pp_iCalExport_update_status' ), 10, 1 );
            
            add_filter( 'cpappb_email_attachments', array( &$this, 'attach_ical_file' ), 10, 3 );
            
            $this->update_database();
            
            $passcode = get_option('CPAHB_PASSCODE',"");
            if ($passcode == '')
            {
                $passcode = wp_generate_uuid4();
                update_option( 'CPAHB_PASSCODE', $passcode);
            }

        } // End __construct


        		/**
         * Create the database tables
         */
        protected function update_database()
		{
			global $wpdb;
			$charset_collate = $wpdb->get_charset_collate();
			$sql = "CREATE TABLE IF NOT EXISTS ".$wpdb->prefix.$this->form_table." (
					id mediumint(9) NOT NULL AUTO_INCREMENT,
					formid INT NOT NULL,
					cal_time_zone_modify varchar(255) DEFAULT '' NOT NULL ,
                    observe_day_light varchar(255) DEFAULT '' NOT NULL ,
                    ical_daylight_zone varchar(255) DEFAULT '' NOT NULL ,
                    attachical varchar(10) DEFAULT '' NOT NULL ,
                    base_summary TEXT DEFAULT '' NOT NULL ,
                    base_description TEXT DEFAULT '' NOT NULL ,
					UNIQUE KEY id (id)
				) $charset_collate;";

			$wpdb->query($sql);
		} // end update_database

        /************************ PRIVATE METHODS *****************************/

        private function getiCalLink($form_id)
        {
            global $cp_appb_plugin;
            return $cp_appb_plugin->get_site_url()."?cpappb_app=calfeed&id=".$form_id."&verify=".substr(md5($form_id.get_option('CPAHB_PASSCODE',"")),0,10);            
        }

		/**
		 * mark the item as paid
		 */
		private function _log($adarray = array())
		{
			$h = fopen( __DIR__.'/logs.txt', 'a' );
			$log = "";
			foreach( $_REQUEST as $KEY => $VAL )
			{
				$log .= $KEY.": ".$VAL."\n";
			}
			foreach( $adarray as $KEY => $VAL )
			{
				$log .= $KEY.": ".$VAL."\n";
			}
			$log .= "================================================\n";
			fwrite( $h, $log );
			fclose( $h );
		}

		public function pp_iCalExport_update_status( )
		{
            global $wpdb, $cp_appb_plugin;

            if (!isset($_GET["cpappb_app"]) || $_GET["cpappb_app"] != 'calfeed')
                return;
            
            if (isset($_GET["id"]) && isset($_GET["verify"]) && substr(md5($_GET["id"].get_option('CPAHB_PASSCODE',"")),0,10) == $_GET["verify"])
                $this->export_iCal(intval($_GET["id"]));
            else
                echo 'Access denied - verify value is not correct.';         
            exit ();
		}
       
       	private function export_iCal( $form_id, $date_from = 'today -1 month', $date_to = 'today +10 years')
		{
            global $wpdb, $cp_appb_plugin;
            
            header("Content-type: application/octet-stream");
            header("Content-Disposition: attachment; filename=events".date("Y-M-D_H.i.s").".ics");
            
            echo "BEGIN:VCALENDAR\n";
            echo "PRODID:-//CodePeople//Appointment Hour Booking for WordPress//EN\n";
            echo "VERSION:2.0\n";
    
            $icalSettings = $wpdb->get_results(
						$wpdb->prepare( "SELECT * FROM ".$wpdb->prefix.$this->form_table." WHERE formid=%d", $form_id )
					);
    
            $from = date("Y-m-d",strtotime($date_from));
            $to = date("Y-m-d",strtotime($date_to));
            
            $rows = $wpdb->get_results( $wpdb->prepare("SELECT id,time,notifyto,posted_data,data,ipaddr FROM ".$wpdb->prefix.$cp_appb_plugin->table_messages." WHERE ".($form_id?'formid='.intval($form_id).' AND ':'')."time<=%s ORDER BY time DESC LIMIT 0,1000", $to) );
            
            foreach($rows as $item)
                if ($item->ipaddr != 'remote-ical-file')
                {
                    $data = unserialize($item->posted_data);
                    $ct = 0;
                    foreach($data["apps"] as $app)
                        if ($app["date"] >= $from && $app["date"] <= $to)
                        {
                            $ct++;
                            $time = explode("/", $app["slot"]);                        
                            $datetime = $app["date"]." ".trim($time[0]); 
                            $duration = "+".$app["duration"]." minutes";
                            $submissiontime = strtotime($item->time);
                            if ($icalSettings[0]->observe_day_light)
                            {
                                $full_date = gmdate("Ymd",strtotime($datetime.$icalSettings[0]->cal_time_zone_modify));
                                $year = substr($full_date,0,4);
                                if (strtoupper($icalSettings[0]->ical_daylight_zone) == 'EUROPE')
                                {
                                    $dst_start = strtotime('last Sunday GMT', strtotime("1 April $year GMT"));
                                    $dst_stop = strtotime('last Sunday GMT', strtotime("1 November $year GMT"));
                                } else { // USA
                                    $dst_start = strtotime('first Sunday GMT', strtotime("1 April $year GMT"));
                                    $dst_stop = strtotime('last Sunday GMT', strtotime("1 November $year GMT"));
                                }
                                if ($full_date >= gmdate("Ymd",$dst_start) && $full_date < gmdate("Ymd",$dst_stop))
                                    $datetime = date("Y-m-d H:i",strtotime($datetime." -1 hour"));
                            }
                            
                            $base_summary = $icalSettings[0]->base_summary;
                            $base_description = $icalSettings[0]->base_description;
                            
                            $base_summary = str_replace ('<%', '%', $base_summary);
                            $base_description = str_replace ('<%', '%', $base_description);
                            $base_summary = str_replace ('%>', '%', $base_summary);
                            $base_description = str_replace ('%>', '%', $base_description);
                
                            $base_summary = str_replace('%apps%', $cp_appb_plugin->get_appointments_text($data["apps"]), $base_summary);
                            $base_description = str_replace('%apps%', $cp_appb_plugin->get_appointments_text($data["apps"]), $base_description);
                            foreach ($data as $itemgt => $value)
                            {
                                $base_summary = str_replace('%'.$itemgt.'%',(is_array($value)?(implode(", ",$value)):($value)),$base_summary);
                                $base_description = str_replace('%'.$itemgt.'%',(is_array($value)?(implode(", ",$value)):($value)),$base_description);
                            }
                            
                            $base_summary = str_replace("<br>",'\n',str_replace("<br />",'\n',str_replace("\r",'',str_replace("\n",'\n',$base_summary)) ));
                            $base_description = str_replace("<br>",'\n',str_replace("<br />",'\n',str_replace("\r",'',str_replace("\n",'\n',$base_description)) ));
                            
                            echo "BEGIN:VEVENT\n";
                            echo "DTSTART:".gmdate("Ymd",strtotime($datetime.$icalSettings[0]->cal_time_zone_modify))."T".gmdate("His",strtotime($datetime.$icalSettings[0]->cal_time_zone_modify))."Z\n";
                            echo "DTEND:".gmdate("Ymd",strtotime($datetime.$icalSettings[0]->cal_time_zone_modify.$duration))."T".gmdate("His",strtotime($datetime.$icalSettings[0]->cal_time_zone_modify.$duration))."Z\n";
                            echo "DTSTAMP:".gmdate("Ymd",$submissiontime)."T".gmdate("His",$submissiontime)."Z\n";
                            echo "UID:uid".$item->id.'_'.$ct."@".$_SERVER["SERVER_NAME"]."\n";
                            echo "DESCRIPTION:".sanitize_textarea_field($base_description)."\n";
                            echo "LAST-MODIFIED:".gmdate("Ymd",$submissiontime)."T".gmdate("His",$submissiontime)."Z\n";
                            echo "LOCATION:\n";
                            echo "SEQUENCE:0\n";
                            echo "STATUS:CONFIRMED\n";
                            echo "SUMMARY:".$base_summary."\n";
                            echo "TRANSP:OPAQUE\n";
                            echo "END:VEVENT\n";
                        }
                }  
            
            echo 'END:VCALENDAR';
            exit ();
		}
        
        
        function attach_ical_file( $attachments, $params, $form_id) 
        {
            global $wpdb, $cp_appb_plugin;
            
            $buffer  = "BEGIN:VCALENDAR\n";
            $buffer .= "PRODID:-//CodePeople//Appointment Hour Booking for WordPress//EN\n";
            $buffer .= "VERSION:2.0\n";
            $buffer .= "X-MS-OLK-FORCEINSPECTOROPEN:TRUE\n";
    
            $icalSettings = $wpdb->get_results(
						$wpdb->prepare( "SELECT * FROM ".$wpdb->prefix.$this->form_table." WHERE formid=%d", $form_id )
					);
    
            if ($icalSettings[0]->attachical != '1')
                return $attachments;
            
            $data = $params;
            $ct = 0;
            foreach($data["apps"] as $app)
            {
                $ct++;
                $time = explode("/", $app["slot"]);                        
                $datetime = $app["date"]." ".trim($time[0]); 
                $duration = "+".$app["duration"]." minutes";
                $submissiontime = time();
                if ($icalSettings[0]->observe_day_light)
                {
                    $full_date = gmdate("Ymd",strtotime($datetime.$icalSettings[0]->cal_time_zone_modify));
                    $year = substr($full_date,0,4);
                    if (strtoupper($icalSettings[0]->ical_daylight_zone) == 'EUROPE')
                    {
                        $dst_start = strtotime('last Sunday GMT', strtotime("1 April $year GMT"));
                        $dst_stop = strtotime('last Sunday GMT', strtotime("1 November $year GMT"));
                    } else { // USA
                        $dst_start = strtotime('first Sunday GMT', strtotime("1 April $year GMT"));
                        $dst_stop = strtotime('last Sunday GMT', strtotime("1 November $year GMT"));
                    }
                    if ($full_date >= gmdate("Ymd",$dst_start) && $full_date < gmdate("Ymd",$dst_stop))
                        $datetime = date("Y-m-d H:i",strtotime($datetime." -1 hour"));
                }
                
                $base_summary = $icalSettings[0]->base_summary;
                $base_description = $icalSettings[0]->base_description;
                
                $base_summary = str_replace ('<%', '%', $base_summary);
                $base_description = str_replace ('<%', '%', $base_description);
                $base_summary = str_replace ('%>', '%', $base_summary);
                $base_description = str_replace ('%>', '%', $base_description);
                
                $base_summary = str_replace('%apps%', $cp_appb_plugin->get_appointments_text($data["apps"]), $base_summary);
                $base_description = str_replace('%apps%', $cp_appb_plugin->get_appointments_text($data["apps"]), $base_description);
                foreach ($data as $itemgt => $value)
                {
                    $base_summary = str_replace('%'.$itemgt.'%',@(is_array($value)?(implode(", ",$value)):($value)),$base_summary);
                    $base_description = str_replace('%'.$itemgt.'%',@(is_array($value)?(implode(", ",$value)):($value)),$base_description);
                }
                
                $base_summary = str_replace("<br>",'\n',str_replace("<br />",'\n',str_replace("\r",'',str_replace("\n",'\n',$base_summary)) ));
                $base_description = str_replace("<br>",'\n',str_replace("<br />",'\n',str_replace("\r",'',str_replace("\n",'\n',$base_description)) ));                
                
                
                $buffer .= "BEGIN:VEVENT\n";
                $buffer .= "DTSTART:".gmdate("Ymd",strtotime($datetime.$icalSettings[0]->cal_time_zone_modify))."T".gmdate("His",strtotime($datetime.$icalSettings[0]->cal_time_zone_modify))."Z\n";
                $buffer .= "DTEND:".gmdate("Ymd",strtotime($datetime.$icalSettings[0]->cal_time_zone_modify.$duration))."T".gmdate("His",strtotime($datetime.$icalSettings[0]->cal_time_zone_modify.$duration))."Z\n";
                $buffer .= "DTSTAMP:".gmdate("Ymd",$submissiontime)."T".gmdate("His",$submissiontime)."Z\n";
                $buffer .= "UID:uid".$params["itemnumber"].'_'.$ct."@".$_SERVER["SERVER_NAME"]."\n";
                $buffer .= "DESCRIPTION:".$base_description."\n";
                $buffer .= "LAST-MODIFIED:".gmdate("Ymd",$submissiontime)."T".gmdate("His",$submissiontime)."Z\n";
                $buffer .= "LOCATION:\n";
                $buffer .= "SEQUENCE:0\n";
                $buffer .= "STATUS:CONFIRMED\n";
                $buffer .= "ORGANIZER;CN=\"".$_SERVER["HTTP_HOST"]."\":MAILTO:".$cp_appb_plugin->get_option('fp_from_email')."\r\n";
                $buffer .= "SUMMARY:".$base_summary."\n";
                $buffer .= "TRANSP:OPAQUE\n";
                $buffer .= "END:VEVENT\n";
            }
  
            $buffer .= 'END:VCALENDAR';
       
            $filename1 = sanitize_file_name('Appointment'.'_'.$params["itemnumber"].'_admin.ics');
            $filename1 = WP_CONTENT_DIR . '/uploads/'.$filename1;
            $handle = fopen($filename1, 'w');
            fwrite($handle,$buffer);
            fclose($handle);
            $attachments[] = $filename1;

            return $attachments;            
        }


        
    } // End Class

    // Main add-on code
    $cpappb_iCalExport_obj = new CPAPPB_iCalExport();

	// Add addon object to the objects list
	global $cpappb_addons_objs_list;
	$cpappb_addons_objs_list[ $cpappb_iCalExport_obj->get_addon_id() ] = $cpappb_iCalExport_obj;
}

