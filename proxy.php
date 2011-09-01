<?php

	if( !isset( $_GET["url"] ) )
		die( "" );
	
	$url = $_GET["url"];
	$ext = strtolower( strrchr( $url, "." ) );

	$lf = "cache/proxycache_".md5( $url );

	$typ = "";
	if( $ext == ".jpg" || $ext==".jpeg" ) $typ = "image/jpeg";
	if( $ext == ".png") $typ = "image/png";
	if( $ext == ".gif") $typ = "image/gif";


	if( $typ == "" ) die( "" );

	if( !file_exists( $lf ) )
		@copy( $url, $lf );

	$format = "";
	if( isset( $_GET["format"] ) )
		$format = $_GET["format"];

	$callback = "callback";
	if( isset( $_GET["callback"] ) )
		$callback = $_GET["callback"];

	if( $format == "base64" ) {
		$data = join( "", file( $lf ) );
		header( "Content-type: text/javascript" );
		echo $callback."('".base64_encode( $data )."');";
		die( "" );
	}
	
	header( "Content-type: ".$typ );
	readfile( $lf );
	die( "" );

?>
