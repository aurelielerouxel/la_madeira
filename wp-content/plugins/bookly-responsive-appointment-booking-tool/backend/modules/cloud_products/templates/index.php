<?php if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
use Bookly\Backend\Components\Support;
use Bookly\Backend\Components\Controls;
use Bookly\Backend\Components\Cloud;
use Bookly\Lib;
/**
 * @var Lib\Cloud\API $cloud
 */
$update_required_modal = false;
?>
<div id="bookly-tbs" class="wrap">
    <div class="form-row align-items-center mb-3">
        <h4 class="col m-0"><?php esc_html_e( 'Bookly Cloud', 'bookly' ) ?></h4>
        <?php Support\Buttons::render( $self::pageSlug() ) ?>
    </div>
    <div class="card mb-4">
        <div class="card-body">
            <div class="row pb-3">
                <div class="col">
                </div>
                <div class="col-auto">
                    <?php Cloud\Account\Panel::render() ?>
                </div>
            </div>
            <?php foreach ( $cloud->general->getProducts() as $product ) : ?>
                <div class="card bg-light p-3 mb-3 bookly-js-cloud-product" data-product="<?php echo $product['id'] ?>">
                    <div class="form-row">
                        <div class="col-xl-10 col-md-9 col-xs-12">
                            <div class="d-flex">
                                <div class="mr-4 mb-4">
                                    <img src="<?php echo $product['icon_url'] ?>"/>
                                </div>
                                <div class="flex-fill">
                                    <div class="h4 mb-2"><?php echo $product['texts']['title'] ?></div>
                                    <?php echo $product['texts']['description'] ?>
                                    <?php if ( $product['button'] ) : ?>
                                        <div>
                                            <?php Controls\Buttons::render( null, 'btn-white border text-nowrap bookly-js-product-info-button mt-2', $product['texts']['info-button'] ); ?>
                                        </div>
                                    <?php endif ?>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-2 col-md-3 col-xs-12 mt-2 mt-md-0">
                            <div class="text-center">
                                <div class="h5 mb-3"><?php echo $product['texts']['price'] ?></div>
                                <div>
                                    <?php if ( $cloud->account->loadProfile() ) : ?>
                                        <?php if ( $cloud->account->productActive( $product['id'] ) ) : ?>
                                            <?php Controls\Buttons::render( null, 'btn-danger bookly-js-product-disable', $product['texts']['action-off'] ) ?>
                                        <?php elseif ( $product['version'] > Lib\Plugin::getVersion() ) : ?>
                                            <?php $update_required_modal = true ?>
                                            <?php Controls\Buttons::render( null, 'btn-default bookly-js-bookly-update-required', $product['texts']['action-on'], array( 'data-version' => $product['version'] ) ) ?>
                                            <div class="mt-3 text-danger"><strong><?php printf( esc_html__( 'Bookly %s required', 'bookly' ), esc_html( $product['version'] ) ) ?></strong></div>
                                        <?php else : ?>
                                            <?php Controls\Buttons::render( null, 'btn-success bookly-js-product-enable', $product['texts']['action-on'] ) ?>
                                        <?php endif ?>
                                    <?php else : ?>
                                        <?php Controls\Buttons::render( null, 'btn-success bookly-js-product-login-button', $product['texts']['action-on'] ) ?>
                                    <?php endif ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach ?>
        </div>
    </div>
    <?php include '_info.php' ?>
    <?php include '_activation.php' ?>
    <?php if ( $update_required_modal ) : ?>
        <?php include '_update_required.php' ?>
    <?php endif ?>
</div>