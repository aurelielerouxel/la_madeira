<?php if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
use Bookly\Backend\Modules\Services\Proxy;
use Bookly\Lib\Entities\Service;
/**
 * @var array $service
 */
?>
<div class="bookly-js-service-advanced-container">
    <?php if ( $service['type'] == Service::TYPE_SIMPLE ) : ?>
        <?php Proxy\GroupBooking::renderSubForm( $service ) ?>
        <?php Proxy\Pro::renderOnlineMeetings( $service ) ?>
    <?php endif ?>
    <?php Proxy\Pro::renderLimitAppointmentsPerCustomer( $service ) ?>
    <?php Proxy\Taxes::renderSubForm( $service ) ?>
    <?php Proxy\RecurringAppointments::renderSubForm( $service ) ?>
</div>