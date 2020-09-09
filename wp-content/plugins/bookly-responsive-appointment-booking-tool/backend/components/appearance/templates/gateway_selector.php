<?php if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
use Bookly\Backend\Components\Appearance\Editable;
?>
<div class="bookly-box bookly-list">
    <label>
        <input type="radio" name="payment" id="bookly-card-payment"/>
        <?php Editable::renderString( array( $label_option_name, ), $title ) ?>
        <?php if ( $logo_url ) : ?>
            <img src="<?php echo esc_attr( $logo_url ) ?>" alt="<?php echo esc_attr( $title ) ?>"/>
        <?php endif ?>
    </label>
    <?php if ( $with_card ) : ?>
        <form class="bookly-card-form bookly-clear-bottom" style="margin-top:15px;display: none;">
            <div class="bookly-box bookly-table">
                <div class="bookly-form-group" style="width:200px!important">
                    <label>
                        <?php Editable::renderString( array( 'bookly_l10n_label_ccard_number', ) ) ?>
                    </label>
                    <div>
                        <input type="text"/>
                    </div>
                </div>
                <div class="bookly-form-group">
                    <label>
                        <?php Editable::renderString( array( 'bookly_l10n_label_ccard_expire', ) ) ?>
                    </label>
                    <div>
                        <select class="bookly-card-exp">
                            <?php for ( $i = 1; $i <= 12; ++ $i ) : ?>
                                <option value="<?php echo $i ?>"><?php printf( '%02d', $i ) ?></option>
                            <?php endfor ?>
                        </select>
                        <select class="bookly-card-exp">
                            <?php for ( $i = date( 'Y' ); $i <= date( 'Y' ) + 10; ++ $i ) : ?>
                                <option value="<?php echo $i ?>"><?php echo $i ?></option>
                            <?php endfor ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="bookly-box bookly-clear-bottom">
                <div class="bookly-form-group">
                    <label>
                        <?php Editable::renderString( array( 'bookly_l10n_label_ccard_code', ) ) ?>
                    </label>
                    <div>
                        <input class="bookly-card-cvc" type="text"/>
                    </div>
                </div>
            </div>
        </form>
    <?php endif ?>
</div>