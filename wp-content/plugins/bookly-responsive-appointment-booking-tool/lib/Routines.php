<?php
namespace Bookly\Lib;

/**
 * Class Routines
 * @package Bookly\Lib
 */
abstract class Routines
{
    /**
     * Init routines.
     */
    public static function init()
    {
        // Register daily routine.
        add_action( 'bookly_daily_routine', function () {
            // Daily info routine.
            Routines::handleDailyInfo();
            // Cloud routine.
            Routines::loadCloudInfo();
            // Statistics routine.
            Routines::sendDailyStatistics();
            // Sms weekly summary routine (also updates the number of undelivered sms).
            Routines::sendCloudWeeklySummary();
            // Calculate goal by number of customer appointments achieved
            Routines::calculateGoalOfCA();
            // Let add-ons do their daily routines.
            Proxy\Shared::doDailyRoutine();
        }, 10, 0 );

        // Register hourly routine.
        add_action( 'bookly_hourly_routine', function () {
            // Email and SMS notifications routine.
            Notifications\Routine::sendNotifications();
            // Let add-ons do their hourly routines.
            Proxy\Shared::doHourlyRoutine();
        }, 10, 0 );

        // Schedule daily routine.
        if ( ! wp_next_scheduled( 'bookly_daily_routine' ) ) {
            wp_schedule_event( time(), 'daily', 'bookly_daily_routine' );
        }

        // Schedule hourly routine.
        if ( ! wp_next_scheduled( 'bookly_hourly_routine' ) ) {
            wp_schedule_event( time(), 'hourly', 'bookly_hourly_routine' );
        }
    }

    /**
     * Daily info routine.
     */
    public static function handleDailyInfo()
    {
        $data = API::getInfo();

        if ( is_array( $data ) ) {
            if ( isset ( $data['plugins'] ) ) {
                $seen = Entities\Shop::query()->count() ? 0 : 1;
                foreach ( $data['plugins'] as $plugin ) {
                    $shop = new Entities\Shop();
                    if ( $plugin['id'] && $plugin['envatoPrice'] ) {
                        $shop->loadBy( array( 'plugin_id' => $plugin['id'] ) );
                        $shop
                            ->setPluginId( $plugin['id'] )
                            ->setType( $plugin['type'] ? 'bundle' : 'plugin' )
                            ->setHighlighted( $plugin['highlighted'] ?: 0 )
                            ->setPriority( $plugin['priority'] ?: 0 )
                            ->setDemoUrl( $plugin['demoUrl'] )
                            ->setTitle( $plugin['title'] )
                            ->setSlug( $plugin['slug'] )
                            ->setDescription( $plugin['envatoDescription'] )
                            ->setUrl( $plugin['envatoUrl'] )
                            ->setIcon( $plugin['envatoIcon'] )
                            ->setPrice( $plugin['envatoPrice'] )
                            ->setSales( $plugin['envatoSales'] )
                            ->setRating( $plugin['envatoRating'] )
                            ->setReviews( $plugin['envatoReviews'] )
                            ->setPublished( isset ( $plugin['envatoPublishedAt']['date'] )
                                ? date_create( $plugin['envatoPublishedAt']['date'] )->format( 'Y-m-d H:i:s' )
                                : current_time( 'mysql' )
                            )
                            ->setCreated( current_time( 'mysql' ) )
                            ->setSeen( $shop->isLoaded() ? $shop->getSeen() : $seen )
                            ->save();
                    }
                }
            }

            if ( isset( $data['messages'] ) ) {
                foreach ( $data['messages'] as $data ) {
                    $message = new Entities\Message();
                    $message->loadBy( array( 'message_id' => $data['message_id'] ) );
                    if ( ! $message->isLoaded() ) {
                        $message
                            ->setFields( $data )
                            ->setCreated( current_time( 'mysql' ) )
                            ->save();
                    }
                }
            }
        }
    }

    /**
     * Load Bookly Cloud products, promotions, etc.
     */
    public static function loadCloudInfo()
    {
        Cloud\API::getInstance()->general->loadInfo();
    }

    /**
     * Bookly Cloud weekly summary routine.
     */
    public static function sendCloudWeeklySummary()
    {
        $cloud = Cloud\API::getInstance();
        if ( $cloud->account->loadProfile() ) {  // Update number of undelivered sms.
            if (
                get_option( 'bookly_cloud_notify_weekly_summary' ) &&
                get_option( 'bookly_cloud_notify_weekly_summary_sent' ) != date( 'W' )
            ) {
                $admin_emails = Utils\Common::getAdminEmails();
                if ( ! empty ( $admin_emails ) ) {
                    $start   = date_create( 'last week' )->format( 'Y-m-d 00:00:00' );
                    $end     = date_create( 'this week' )->format( 'Y-m-d 00:00:00' );
                    $summary = $cloud->account->getSummary( $start, $end );
                    if ( $summary !== false ) {
                        $notification_list = '';
                        foreach ( $summary['notifications'] as $type_id => $count ) {
                            $notification_list .= PHP_EOL . Entities\Notification::getTitle( Entities\Notification::getTypeString( $type_id ) ) . ': ' . $count['delivered'];
                            if ( $count['delivered'] < $count['sent'] ) {
                                $notification_list .= ' (' . $count['sent'] . ' ' . __( 'sent to our system', 'bookly' ) . ')';
                            }
                        }
                        $message =  __( 'Hope you had a good weekend! Here\'s a summary of messages we\'ve delivered last week:
{notification_list}

Your system sent a total of {total} messages last week (that\'s {delta} {sign} than the week before).
Cost of sending {total} messages was {amount}. Your current Bookly SMS balance is {balance}.

Thank you for using Bookly SMS. We wish you a lucky week!
Bookly SMS Team', 'bookly' );
                        $message = strtr( $message,
                            array(
                                '{notification_list}' => $notification_list,
                                '{total}'             => $summary['total'],
                                '{delta}'             => abs( $summary['delta'] ),
                                '{sign}'              => $summary['delta'] >= 0 ? __( 'more', 'bookly' ) : __( 'less', 'bookly' ),
                                '{amount}'            => '$' . $summary['amount'],
                                '{balance}'           => '$' . $cloud->account->getBalance(),
                            )
                        );
                        wp_mail( $admin_emails, __( 'Bookly SMS weekly summary', 'bookly' ), $message );
                        update_option( 'bookly_cloud_notify_weekly_summary_sent', date( 'W' ) );
                    }
                }
            }
        }
    }

    /**
     * Statistics routine.
     */
    public static function sendDailyStatistics()
    {
        if ( get_option( 'bookly_gen_collect_stats' ) ) {
            API::sendStats();
        }
    }

    public static function calculateGoalOfCA()
    {
        /** @global \wpdb $wpdb */
        global $wpdb;

        $ca_count = get_option( 'bookly_сa_count' );
        $log10 = (int) log10( Entities\CustomerAppointment::query()->count() );
        $current = $log10 > 0 ? pow( 10, $log10 ) : 0;

        if ( $ca_count != $current ) {
            // New goal by number of customer appointments achieved,
            // corresponding hide until values are reset to show call to rate Bookly on WP
            $wpdb->query( $wpdb->prepare(
                'UPDATE `' . $wpdb->usermeta . '` SET `meta_value` = %d WHERE `meta_key` = \'bookly_notice_rate_on_wp_hide_until\' AND meta_value != 0',
                time()
            ) );

            update_option( 'bookly_сa_count', $current );
        }
    }
}