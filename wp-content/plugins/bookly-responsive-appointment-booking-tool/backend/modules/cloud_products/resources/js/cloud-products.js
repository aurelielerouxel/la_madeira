jQuery(function ($) {
    'use strict';

    const $onOffButtons = $('.bookly-js-product-enable,.bookly-js-product-disable');
    const $infoButtons = $('.bookly-js-product-info-button');
    const $updateRequiredButtons = $('.bookly-js-bookly-update-required');
    const $infoModal = $('#bookly-product-info-modal');
    const infoModal = {
        $loading: $('.bookly-js-loading', $infoModal),
        $content: $('#bookly-info-content', $infoModal),
        $title: $('.modal-title',$infoModal)
    };
    const $activationModal = $('#bookly-product-activation-modal');
    const activationModal = {
            $title: $('.modal-title', $activationModal),
            $success: $('.bookly-js-success', $activationModal),
            $fail: $('.bookly-js-fail', $activationModal),
            $content: $('.bookly-js-content', $activationModal),
            $button: $('.bookly-js-action-btn', $activationModal)
        };
    const hash = window.location.href.split('#');

    $infoButtons.on('click', function () {
        const ladda = Ladda.create(this);
        const product =  $(this).closest('.bookly-js-cloud-product').data('product');
        ladda.start();
        infoModal.$loading.show();
        infoModal.$title.html(BooklyL10n.products[product].info_title).show();
        infoModal.$content.hide();
        $infoModal.booklyModal('show');
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'bookly_cloud_get_product_info',
                product: product,
                csrf_token: BooklyL10n.csrfToken,
            },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    infoModal.$loading.hide();
                    infoModal.$content.html(response.data.html).show();
                } else {
                    booklyAlert({error: [response.data.message]});
                }
            }
        }).always(ladda.stop);
    });

    $('.bookly-js-product-login-button').on('click', function (e) {
        e.preventDefault();
        $(document.body).trigger('bookly.cloud.auth.form', ['login']);
        $('#bookly-cloud-auth-modal').booklyModal('show');
    });

    $onOffButtons.on('click', function () {
        const $button = $(this);
        const ladda = Ladda.create(this);
        const product = $(this).closest('.bookly-js-cloud-product').data('product');
        const status = $button.hasClass('bookly-js-product-enable') ? 1 : 0;
        let action;
        switch (product) {
            case 'stripe':
                action = 'bookly_cloud_stripe_change_status';
                break;
            case 'sms':
                action = 'bookly_cloud_sms_change_status';
                break;
            default:
                return;
        }

        ladda.start();
        $.ajax({
            type: 'POST',
            url : ajaxurl,
            data: {
                action: action,
                status: status,
                csrf_token: BooklyL10n.csrfToken,
            },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    if (status) {
                        window.location.href = response.data.redirect_url;
                        if (product !== 'stripe') {
                            window.location.reload();
                        }
                    } else {
                        window.location.reload();
                    }
                } else {
                    booklyAlert({error: [response.data.message]});
                    ladda.stop();
                }
            }
        });
    });

    function showProductActivationMessage(product, status) {
        switch (product) {
            case 'stripe':
            case 'sms':
                $activationModal.booklyModal('show');
                activationModal.$title.html(BooklyL10n.products[product].title);
                    $.ajax({
                        type: 'POST',
                        url: ajaxurl,
                        data: {
                            action: 'bookly_cloud_get_product_activation_message',
                            product: product,
                            status: status,
                            csrf_token: BooklyL10n.csrfToken,
                        },
                        dataType: 'json',
                        success: function (response) {
                            if (response.success) {
                                activationModal.$success.show();
                                activationModal.$content.html(response.data.content);
                                if (response.data.button) {
                                    activationModal.$button
                                        .find('span').html(response.data.button.caption).end()
                                        .off().on('click', function () {
                                        window.location.href = response.data.button.url;
                                    })
                                        .show();
                                }
                            } else {
                                activationModal.$fail.show();
                                activationModal.$content.html(response.data.content);
                            }
                        }
                    });
                    break;
        }
    }

    $updateRequiredButtons.on('click', function (e) {
        $('#bookly-product-update-required-modal').booklyModal('show');
    });

    $activationModal
        .on('show.bs.modal', function () {
            activationModal.$success.hide();
            activationModal.$fail.hide();
            activationModal.$content.html('<div class="bookly-loading"></div>');
            activationModal.$button.hide();
        });

    if (hash.length > 1) {
        let hashObj = {};
        hash[1].split('&').forEach(function (part) {
            var params = part.split('=');
            hashObj[params[0]] = params[1];
        });

        if (hashObj.hasOwnProperty('cloud-product')) {
            if (hashObj.hasOwnProperty('status')) {
                showProductActivationMessage(hashObj['cloud-product'], hashObj['status']);
                if ("pushState" in history) {
                    history.pushState("", document.title, window.location.pathname + window.location.search);
                } else {
                    window.location.href = '#';
                }
            }
        }
    }

});