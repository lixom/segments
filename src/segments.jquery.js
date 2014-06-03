// Segments plugin
// https://github.com/lixom/segments

(function($) {
	$.fn.segments = function(options) {
		
		// Establish our default settings
		var settings = $.extend({
			selectedImageSize		: 500,
			slideSpeed					: 400,
			cycleIntervall			: 5000,
			spaceWidth					: 5
		}, options);
		
		// Variables
		var parentSelector			= $(this);
		var segments = parentSelector.children('.segments');
		var intervallId				= null;
		var nonSelectedImageSize = null;

				
		/**
		 * Rezise elements and make the provided index selected
		 */ 
		var selectSegment = function(theElement) {
			
			// Update class and size
			segments.each(function() {
				// If the current is same as to selected
				if($(this).is(theElement)) {
					
					// Animate size
					$(this).stop().animate(
						{
							width: settings.selectedImageSize
						},
						{
							duration: 'slow',
							easing: 'swing',
							queue: false,
							complete: function() {
				
								// Animation complete.
								if($(this).is(segments.first())){
									$(this).find('.headline').stop().fadeIn('fast');
								}
							
							}
						});
						
						$(this).addClass('selected');
				
				// Elements to be smaller			
				} else {
				
					$(this).stop().animate(
						{
							width: nonSelectedImageSize
						},
						{
							duration: 'slow',
							easing: 'swing',
							queue: false,
						}, function() {
							// Animation complete.
						});
						
						$(this).find('.headline').stop().fadeOut('fast');
						$(this).removeClass('selected');
				}
			}) // end each
		} // end selectSegment()
		
		/**
		 * Cycle segements
		 * Just finds the next segment in order and call the selectSegment functio
		 */
		var nextSegment = function() {	
			
			var currentElement = $(parentSelector).find('.selected');
			var currentIndex = segments.index(currentElement);
			
			if(currentIndex < segments.size() -1) {
				selectSegment(segments[currentIndex +1]);
			} else {
				// First element
				selectSegment(segments.first());
			}
	  }
		 
		/**
		 * Start cycle
		 */
		 var startCycle = function() {
		   clearInterval(intervallId);
		 	 
			 intervallId = setInterval(function() {
				 nextSegment();
			  }, settings.cycleIntervall);
		 }
		
		/**
	   * Init segments
	   */
	 	var initSegments = function() {
		 	
		 	segments = $(parentSelector).children('.segment');
		 	
		 	// Calculate sizes
		 	divWidth = $(parentSelector).width();
		 	nonSelectedImageSize = ((divWidth - settings.selectedImageSize) - (settings.spaceWidth * (segments.size() -1))) / (segments.size()-1);
		 	nonSelectedImageSize = Math.floor(nonSelectedImageSize); // WIthout floor images will have to much precision and jump when animating
		 			 	
		 	var captionWidth =  settings.selectedImageSize - ($('.caption').outerWidth() - $('.caption').width())
		 	
	 		$('.caption').css({
				width: captionWidth
			});
	 	
		 	segments.each(function(){
		 		$(this).width(nonSelectedImageSize);
		 		
		 	});
		 	
		 	segments.first().width(settings.selectedImageSize)
		 									.addClass('selected');
	
	 
		 	// Bind event handler to main div, mouseout event so the segments starts cycling
		 	$(parentSelector).on('mouseleave', function() {
				startCycle(); 	
		 	});
		 	
		 	// Bind event handler to main div, mouseout event so the segments starts cycling
		 	$(parentSelector).on('mouseenter', function() {
			 	clearInterval(intervallId);
		 	});
		 
		 	// Bind event handlers to images
		 	segments.each(function(){
		 		
		 		$(this).on('hover', function() {
			 		selectSegment($(this));
		 		})
		 	
		 	});
		 	
		 	startCycle();
		 	 		
		} // End init
		
		initSegments();

	} // End plugin
		   
}( jQuery ));
