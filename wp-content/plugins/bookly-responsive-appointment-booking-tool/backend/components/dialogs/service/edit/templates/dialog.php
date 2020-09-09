<?php if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
use Bookly\Backend\Components\Controls\Buttons;
use Bookly\Backend\Components\Controls\Inputs;
use Bookly\Backend\Modules\Services\Proxy;
use Bookly\Lib;
?>
<div id="bookly-edit-service-modal" class="bookly-modal bookly-fade" tabindex=-1 role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form>
                <div class="modal-header">
                    <h5 class="modal-title"><?php esc_html_e( 'Edit service', 'bookly' ) ?></h5>
                    <button type="button" class="close" data-dismiss="bookly-modal" aria-label="Close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <ul class="nav nav-tabs mb-3 bookly-js-service-tabs">
                        <li class="nav-item">
                            <a id="bookly-services-general-tab" class="nav-link active" href="#bookly-services-general" data-toggle="bookly-tab">
                                <i class="fas fa-fw fa-cog mr-1"></i>
                                <span class="d-none d-lg-inline"><?php esc_html_e( 'General', 'bookly' ) ?></span>
                            </a>
                        </li>
                        <li class="nav-item bookly-js-service bookly-js-service-simple bookly-js-service-collaborative">
                            <a id="bookly-services-time-tab" class="nav-link" href="#bookly-services-time" data-toggle="bookly-tab">
                                <i class="far fa-fw fa-clock mr-1"></i>
                                <span class="d-none d-lg-inline"><?php esc_html_e( 'Time', 'bookly' ) ?></span>
                            </a>
                        </li>
                        <?php if ( Lib\Config::proActive() ) : ?>
                            <li class="nav-item bookly-js-service bookly-js-service-simple bookly-js-service-collaborative bookly-js-service-compound">
                                <a id="bookly-services-advanced-tab" class="nav-link" href="#bookly-services-advanced" data-toggle="bookly-tab">
                                    <i class="fas fa-fw fa-cogs mr-1"></i>
                                    <span class="d-none d-lg-inline"><?php esc_html_e( 'Advanced', 'bookly' ) ?></span>
                                </a>
                            </li>
                        <?php endif ?>
                        <?php Proxy\ServiceExtras::renderTab() ?>
                        <?php Proxy\ServiceSchedule::renderTab() ?>
                        <?php if ( Lib\Config::serviceScheduleActive() ) : ?>
                            <?php Proxy\ServiceSpecialDays::renderTab() ?>
                        <?php endif ?>
                    </ul>
                    <div class="tab-content bookly-js-service-containers">
                        <div class="bookly-loading bookly-js-loading"></div>

                        <div class="tab-pane active" id="bookly-services-general">
                            <div id="bookly-services-general-container"></div>
                        </div>
                        <div class="tab-pane" id="bookly-services-advanced">
                            <div id="bookly-services-advanced-container"></div>
                        </div>
                        <div class="tab-pane" id="bookly-services-time">
                            <div id="bookly-services-time-container"></div>
                        </div>
                        <div class="tab-pane" id="bookly-services-extras">
                            <div id="bookly-services-extras-container"></div>
                        </div>
                        <div class="tab-pane" id="bookly-services-schedule">
                            <div id="bookly-services-schedule-container"></div>
                        </div>
                        <div class="tab-pane" id="bookly-services-special-days">
                            <div id="bookly-services-special-days-container"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <span class="bookly-js-service-error text-danger float-left text-left"></span>
                    <input type="hidden" name="action" value="bookly_update_service"/>
                    <input type="hidden" name="id"/>
                    <input type="hidden" name="type"/>
                    <input type="hidden" name="update_staff" value="0"/>
                    <?php Inputs::renderCsrf() ?>
                    <?php Buttons::renderSubmit() ?>
                    <?php Buttons::renderCancel() ?>
                </div>
            </form>
        </div>
    </div>
    <div class="collapse" id="bookly-service-additional-html"></div>
</div>