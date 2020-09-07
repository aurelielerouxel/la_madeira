/**
* Custom Js for backend 
*
* @package Holidays
*/
jQuery(document).ready(function($) {
    $('#holidays-img-container li label img').click(function(){    	
        $('#holidays-img-container li').each(function(){
            $(this).find('img').removeClass ('holidays-radio-img-selected') ;
        });
        $(this).addClass ('holidays-radio-img-selected') ;
    });                    
});

( function( api ) {

	api.sectionConstructor['upsell'] = api.Section.extend( {

		// No events for this type of section.
		attachEvents: function () {},

		// Always make the section active.
		isContextuallyActive: function () {
			return true;
		}
	} );

} )( wp.customize );