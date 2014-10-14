<? include("includes/header.php") ?>
<div data-dom-cache="false" data-role="page" class="pages" id="home" data-theme="a">
	<div data-role="header">
            <div class="left">
                <a href="#" class="showMenu menu-button"><img src="images/menu-button.png" width="40" /></a>
                <a href="#" class="back-button"><img src="images/back-button.png" width="40" /></a>
            </div>
            <h1><p class="no-margin">Blog Details</p><p class="no-margin">Klassio RSV</p></h1>
            
	</div>
        <div class="header-shadow"></div>
        <!-- /header -->
    
	<div data-role="content" data-theme="a" class="minus-shadow">
            <div class="white-content-box">
		<script>
		function setCookie(c_name,value,exdays) {
			var exdate=new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
			document.cookie=c_name + "=" + c_value;
		}
		function getCookie(c_name) {
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++)
			{
			  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			  x=x.replace(/^\s+|\s+$/g,"");
			  if (x==c_name)
			    {
			    return unescape(y);
			    }
			  }
		}
		$(document).ready(function() {
			var str = "<script src='blog-detail-remote.php?link="+ escape(getCookie("url")) +"' />";
			$(str).appendTo("body");
		});
		</script>
		<div id="blog-post"><br><br><center>Loading post</center><br><br></div>
		<script src="blog-detail-remote.php"></script>
            </div>
	</div><!-- /content -->
        
        <div class="bread-crumb">
            <ul>
                <li><a data-transition="pop" href="index.php"><img src="images/bc-home.png" width="16" /></a></li>
                <li><span>Blog</span></li>
            </ul>
        </div>
        <div data-role="footer"><p>&copy; Klassio RSV. All Rights Reserved. <span><a class="scroll-to-top"><img src="images/top.png" width="32"/></a></span></p></div>
</div><!-- /page -->
<? include("includes/footer.php") ?>