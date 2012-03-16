/**
 * Sliding Boxes
 * v.1.0.0 
 * 
 * Copyright (c) 2012 A. Sharif
 *
 * In its very basic form, this plugin should help create a video rotation. Similair to the gallery rotation approaches out there.
 * So how do you get started?
 * Very simple:
 * 				  <!-- start videowrapper -->
						<div class="videoWrapper">
							<!-- start simpleVideoRotation -->
							<div class="simpleVideoRotation">
								<div id="nextBtn"></div>
								<div id="prevBtn"></div>
								<div id="showBox"></div>
								<!-- left/right buttons -->
								<div class="wrapLeft"></div>
								<div class="wrapRight"></div>
								<!-- end left/right buttons -->
								<div class="wrapVideo">
								
								<!-- start videoSection -->
									<div id="videoSection">
										<div>http://www.youtube.com/watch?v=P9spezXhJuU</div>
                      <div>http://www.youtube.com/watch?v=4XWtiaEBFUM</div>
                      <div>http://www.youtube.com/watch?v=GeTkXXSC0kQ&amp;feature=related</div>
                      <div>http://www.youtube.com/watch?v=Dpo8sRF_ciw&amp;feature=related</div>
                      <div>http://www.youtube.com/watch?v=q-GQf2vmB90&amp;feature=related</div>
                      <div>http://www.youtube.com/watch?v=eHUsXVTw-hk&amp;feature=related</div>
                      <div>http://www.youtube.com/watch?v=KiR-mCIAUXY&amp;feature=related</div>
                      <div>http://www.youtube.com/watch?v=UR5ybcorq4I&amp;feature=related</div>
                      <div>http://www.youtube.com/watch?v=4LFwSr64oCQ?sdsa</div>
									</div>
								<!-- end videoSection -->
								</div>
							</div>
							<!-- end simpleVideoRotation -->
						</div>
						<!-- end videowrapper -->
 *
 *  add the this at the end of your html code. But add it before the </body> tag!
 *  example:
 *  <script type="text/javascript">
 *			jQuery(document).ready(function() {
 *					jQuery("#videoSection").slidingBoxes({'type' : 'videos', 'color' : '#fff', 'bgColor' : '#444' ,'textInput': '', 'content_height' : '500', 'content_width' : '600', 'showbox_bg' : '#666' });
 *	    });
 *	</script>
 *  
 *		
 *		vimeo embed code:
 *		<iframe src="http://player.vimeo.com/video/VIDEO_ID" width="WIDTH" height="HEIGHT" frameborder="0"></iframe>
 *
 */


(function(jQuery) {

	jQuery.fn.slidingBoxes = function(options) {
		
		// Default configuration properties
		var defaults =
		{
			type : 'images',
			color : 'white',
			bgColor:	'red',
			content_height:	470,
			content_width : 300,
			textInput : 'hello',
			thumbs_width: 120,
			thumbs_height: 90,
			showbox_bg : 'blue',
			showbox_width : 600,
			showbox_height : 400,
			showcase_speed : 600
		};

		
		
		// Declare and set up some important variables
		options = jQuery.extend(defaults, options);
		var current_id = 1;
		var showcase = jQuery(this);
		var showBox = jQuery('#showBox');
		var showChildren = showcase.children();
		// nr of Videos or Images
		var lengthElements = showcase.children().length;		
		// current Box nr.
		var activeBox = 0;
		// clicked btn
		var clickedBtn;
		
		var nextBtn = jQuery('#nextBtn');
		var prevBtn = jQuery('#prevBtn');
		
		// load the video url
		var loadVideo;
		
		// save the collected videoIds
		var videoIds = [];
		
		// check to see if the divs are moving
		var moving = false;
		
		// margin-left / position of the thumbnail box
		var xPos = 0;
		
		// direction of the rotation - to make the thumbnail box move correctly
		var direction = "right";
		
		// thumbnails right btn
		var thumbBtnRight = jQuery('.wrapRight');
		thumbBtnRight.click(function(){
		
			xPos = xPos + ((options.thumbs_width * 4) +60);
			thumbBtnLeft.css("display", "block");
			// make sure that there thumbnails to display
			if((lengthElements * options.thumbs_width ) < xPos) {
				var rest = lengthElements % 4;
				xPos = lengthElements * (options.thumbs_width + 15) - (rest * (options.thumbs_width + 15));
			}
			
			showcase.animate({'margin-left': - xPos}, options.showcase_speed, checkArrows() );
		});
		
		// thumbnails left btn
		var thumbBtnLeft = jQuery('.wrapLeft');
		
		thumbBtnLeft.click(function(){
			xPos = xPos - ((options.thumbs_width * 4) +60);
			// make sure that the thumbnails remain visible
			if(xPos < 0) {
				xPos = 0;
			}
			showcase.animate({'margin-left': - xPos}, options.showcase_speed, checkArrows() );
			
		});
		
		var debug = jQuery('#debug');
		
		nextBtn.click(function() {
			if(!moving) {

				moving=true;
				nextItem();
				
			} else {
				debug.text("wait for the nextBtn");
			}
		});
		
		prevBtn.click(function() {
			if(moving == false) {
				moving=true;
				prevItem();
				
			} else {
				debug.text("wait for the prevBtn");
				moving=false;
			}
		});
		
		jQuery(this).children().click(function() {
		if(!moving) {
				direction = "right";
				flipVideo(jQuery(this).parent().children().index(this));
				highlighted(jQuery(this));
				
		} else {
			debug.text("please wait");
		}
				
		});
		
		// setup the thumbnails
		
		//jQuery(this).css({"top": options.content_height, 'position' : 'absolute', 'margin-left' : '-260px', 'width' : options.content_width, 'left' : '50%' });
		
		
		showBox.css({"background": options.showbox_bg, "width" : options.showbox_width, "height" : options.showbox_height, "margin-left" :  - options.showbox_width/2});
		
		showcase.children().each(function() {
			
			var content_container = jQuery(this)
			.css('color', options.color)
			.css('overflow', 'hidden')
			.css('background', options.bgColor)
			.css('width', options.thumbs_width)
			.css('height', options.thumbs_height)
			.css('position', 'relative')
			.css('z-index', current_id)
			.html(checkBox(jQuery(this).text()))
			.css('margin-right', '11px')
			.css('opacity', (current_id == 1)? 1 :1)
			.addClass('divBlock')
			//.prependTo(showcase);		
			current_id +=1;
			
			});
		contentSlider();
		// video section
		
		function loadVideo(nr) {
			var widthVideoBox = ((options.content_width - 520)/2);
			var heightVideoBox = (options.content_height - 380)/2;
			var videoUrl = videoIds[nr + 1];
			var videoBox = '<iframe width="520" style="margin-left:' + widthVideoBox + 'px; margin-top:10px;" height="380" src="http://www.youtube.com/embed/' + videoUrl + '" frameborder="0" allowfullscreen></iframe>';
			
			return videoBox;
			//return '<div style="font-size:70px; padding-top:40px;">' + nr + '</div>';
		}
		
		highlighted = function(pressedBtn) {
			if(clickedBtn) {
				//clickedBtn.bind('click');
				clickedBtn.removeClass('clicked').addClass('divBlock');
			}

			clickedBtn = pressedBtn;
			//clickedBtn.unbind('click');
			clickedBtn.removeClass('divBlock').addClass('clicked');
			moveThumbs(clickedBtn);			
		}
		
		
		
		moveThumbs = function(currentItem) {
			if(lengthElements > 1) {
				//xPos = (options.thumbs_width + 15) * activeBox;
				if(activeBox == 0) {
					xPos = 0;
					showcase.animate({'margin-left' : 0 }, options.showcase_speed, checkArrows());
					thumbBtnLeft.css("display", "none");
					
				} else if((activeBox) % 4 == 0 && direction == 'right') {
					xMove = (options.thumbs_width + 15) * (activeBox);
					xPos = xMove;
					showcase.animate({'margin-left' : -xPos}, options.showcase_speed, checkArrows());
				} else if ((activeBox+1) % 4 == 0 && direction == 'left' && activeBox != 1) {
					xMove =  (options.thumbs_width + 15) * (activeBox+1) - (options.thumbs_width + 15) * 4;
					xPos = xMove;
					showcase.animate({'margin-left' : -xPos}, options.showcase_speed, checkArrows());
				} else if (activeBox +1 == lengthElements) {
					if(direction == 'right') {
						//xPos = 0;
					} else {
						var rest = lengthElements % 4;
						xPos = lengthElements * (options.thumbs_width + 15) - (rest * (options.thumbs_width + 15));
						showcase.animate({'margin-left' : -xPos}, options.showcase_speed, checkArrows());
					}
				}
			
				//debug.text(activeBox);
			}
			//debug.text(showcase.css('margin-left'));
		}
		
		flipVideo = function (numClicked) {

			/* element.animate({'margin-left' : '-600px', 'opacity' : 0}, 400 );
			element.css("z-index", 0);
			
			if(element.next().parent().attr('id') == showcase.attr('id')) {
				element.next().animate({"margin-left" : "+600px", 'opacity' : 1}, 1000, finished());
				element.css("z-index", 2);
			} else {
				element.parent().children().eq(0).animate({"margin-left" : "0px", 'opacity' : 1}, 1000, finished("over"));
			} */
			var current =  showBox.children().eq(activeBox);
			current.animate({'margin-left' : '-600px', 'opacity' : 0}, 1000, removeHtml(current));
			current.css("z-index", 0);
			
			// make the selected video move
			activeBox = numClicked;
			current = current.parent().children().eq(numClicked);
			current.animate({"margin-left" : "0px", 'opacity' : 1}, 1000, finished("over"));
			debug.text(activeBox);
			current.html(loadVideo(activeBox));
			
		}
		
		//***********
		// FUNCTIONS
		//***********
		
		
		// remove the html form the divs
		function removeHtml(current) {
			current.empty();
		} 
		
		// check if we need the thumbnail box arrows
		function checkArrows() {
			if(xPos == 0 ) {
				thumbBtnLeft.css("display", "none");
				thumbBtnRight.css("display", "block");
			} else if((options.thumbs_width +15) * lengthElements >= xPos) {
				thumbBtnLeft.css("display", "block");
				thumbBtnRight.css("display", "block");
			} 
			
			if((options.thumbs_width + 15) * lengthElements <= (xPos + ((options.thumbs_width + 15)*4))) {
				thumbBtnRight.css("display", "none");
			}
			debug.text("-->" + xPos + ' --- ' +  activeBox);	
		}
		
		function contentSlider() {
			var current_ids = 1;
			showcase.children().each(function() {
				var thisObj = jQuery(this);
				var slider = jQuery(document.createElement('div'))
				.css('color', options.color)
				.css('overflow', 'hidden')
				.css('width', options.content_width)
				.css('height', options.content_height)
				.css('left', '0px')
				.css('top', '0px')
				.css('position', 'absolute')
				.css('z-index', current_ids)
				.css("border", "1px solid #ccc")
				//.html((current_ids == 1)? loadVideo(thisObj.html()) + current_ids + 'hallo' : '--')
				.html(current_ids)
				.css('margin-left', (current_ids == 1)? '-600px' : '-600px')
				.css('opacity', (current_ids == 1)? 1 :0);
				showBox.append(slider);
				//(current_ids == 1)? highlighted(thisObj) : '';
				current_ids +=1;
			});
			
			// make the first element slide into the view
			showBox.children().eq(0).html(loadVideo(0));
			showBox.children().eq(0).animate({'margin-left': '0px'}, 1000, checkArrows());
			
		}
		highlighted(showcase.children().eq(0));
		function checkBox(url) {
			switch (options.type) {
				//alert(options.type);
				case 'videos':
				// parse the url
				//var ytUrl = url.split('?v=');
				var ytUrl = url.match(/[A-z0-9\/\:\.]*[\?]v=*([A-z0-9\-\+\_]*)[\?]*/);
				var videoUrl = ytUrl[1];
				videoIds[current_id] = videoUrl;
				if(videoUrl) {
					return '<img src="http://img.youtube.com/vi/' + videoUrl + '/2.jpg"><br/>';
				} else {
					return 'no video available';
				}
				case 'images':
				return "images!!!";
			}	
		}
		
		
		function moveUp(element) {
			element.animate({'margin-left' : '-600px', 'opacity' : 0}, 1000 );
			element.css("z-index", 0);
			
			if(element.next().parent().attr('id') == showcase.attr('id')) {
				element.next().animate({"margin-left" : "+600px", 'opacity' : 1}, 1000, finished());
				element.css("z-index", 2);
			} else {
				element.parent().children().eq(0).animate({"margin-left" : "0px", 'opacity' : 1}, 1000, finished("over"));
			}
		}
		
		
		// next box item
		function nextItem() {
			direction = 'right';
			var current =  showBox.children().eq(activeBox);
			current.animate({'margin-left' : '-600px', 'opacity' : 0}, 1000, 'linear');
			current.css("z-index", 0);
			current.empty();
		
		
			if(current.next().parent().attr('id') == showBox.attr('id')) {
				activeBox += 1;
				current.next().html(loadVideo(activeBox));
				current.next().animate({"margin-left" : "0px", 'opacity' : 1}, 1000, finished());
				current.next().css("z-index", 2);
				highlighted(showcase.children().eq(activeBox));	
			} else {
				activeBox = 0;
				current = current.parent().children().eq(0);
				current.html(loadVideo(activeBox));
				current.animate({"margin-left" : "0px", 'opacity' : 1}, 1000, finished("over"));
				highlighted(showcase.children().eq(activeBox));
				
			} 
		}
		
		// previous box item
		function prevItem() {
			direction = 'left';
			var current =  showBox.children().eq(activeBox);
			current.animate({'margin-left' : '-600px', 'opacity' : 0}, 1000 );
			current.css("z-index", 0);
			current.empty();
			
			if(current.prev().parent().attr('id') == showBox.attr('id')) {
				activeBox -= 1;
				current.prev().html(loadVideo(activeBox));
				current.prev().animate({"margin-left" : "0px", 'opacity' : 1}, 1000,'linear',finished());
				current.prev().css("z-index", 2);
				highlighted(showcase.children().eq(activeBox));
			} else {
				activeBox = lengthElements-1;
				current = current.parent().children().eq(activeBox);
				current.html(loadVideo(activeBox));
				current.animate({"margin-left" : "0px", 'opacity' : 1}, 1000, 'linear', finished("over"));
				highlighted(showcase.children().eq(activeBox));
			}
		}
		
	
		function finished(texts) {
			moving = false;
			//debug.text("target reached");
			if(texts == undefined) {
				texts = '';
			}
			jQuery("#box").text("finished" + texts);	
		}
		
	
	/* 	this.each(function() {
			current_id += 1;
			showcase.css("background", "red");
			showcase.append(current_id);
			showcase.animate({'margin-left' :  '+400px'});
		});
		 */
		
		
	};

})(jQuery);
