
Sliding Boxes
================================
v.1.0.0 

For more info contact a_sharif@fastmail.fm

In its very basic form, this plugin should help create a video rotation. 
Similair to the gallery rotation approaches out there.
So how do you get started?
Very simple:

<code>

  				  <!-- start videowrapper -->
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
 </code>
 
add the this at the end of your html code. But add it before the ending body tag!

example:
<code>
 <script type="text/javascript">
    jQuery(document).ready(function() {
        jQuery("#videoSection").slidingBoxes({'type' : 'videos', 'color' : '#fff', 'bgColor' : '#444' ,'textInput': '', 'content_height' : '500', 'content_width' : '600', 'showbox_bg' : '#666' });
    });
 </script>
</code> 