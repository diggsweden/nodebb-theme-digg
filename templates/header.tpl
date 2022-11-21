<!DOCTYPE html>
<html lang="{function.localeToHTML, userLang, defaultLang}" <!-- IF languageDirection -->data-dir="{languageDirection}" style="direction: {languageDirection};" <!-- ENDIF languageDirection --> >
<head>
	<title>{browserTitle}</title>
	{{{each metaTags}}}{function.buildMetaTag}{{{end}}}
	<link rel="stylesheet" type="text/css" href="{relative_path}/assets/client<!-- IF bootswatchSkin -->-{bootswatchSkin}<!-- END -->.css?{config.cache-buster}" />
	{{{each linkTags}}}{function.buildLinkTag}{{{end}}}

	<script>
		var config = JSON.parse('{{configJSON}}');
		var app = {
			user: JSON.parse('{{userJSON}}')
		};
	</script>

	<!-- IF useCustomHTML -->
	{{customHTML}}
	<!-- END -->
	<!-- IF useCustomCSS -->
	<style>{{customCSS}}</style>
	<!-- END -->
</head>

<body class="{bodyClass} skin-<!-- IF bootswatchSkin -->{bootswatchSkin}<!-- ELSE -->noskin<!-- END -->">

	<button class="skip-to-content" aria-label="[[header:skip-to-content]]">[[header:skip-to-content]]</button>

	<header class="digg-navigation container">
		<div class="digg-logo">
			<a href="https://www.dataportal.se/sv">
				<span class="digg-logo_space">Sveriges Dataportal </span> <span class="digg-logo_space digg-logo_space__divider">|</span> <span class="digg-logo_community">COMMUNITY</span>
			</a>
		</div>
		<nav class="digg-menu" aria-label="[[global:aria-header-navigation]]">
			<!-- <a href="https://www.dataportal.se/sv/datasets?q=&f=">[[header:search-data]]</a> -->
			<!-- <a href="https://www.dataportal.se/sv/nyheter">[[header:news]]</a> -->
			<!-- <a href="https://www.dataportal.se/sv/om-oss/">[[header:about]]</a> -->
			<a href="https://www.dataportal.se"><span class="digg-menu_back--link">Tillbaka till</span> Dataportalen <svg width="16" height="16" viewBox="0 0 16 16"
					fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M9.75 2.5C9.33438 2.5 9 2.16406 9 1.75C9 1.33594 9.33438 1 9.75 1H14.25C14.6656 1 15 1.33594 15 1.75V6.25C15 6.66563 14.6656 7 14.25 7C13.8344 7 13.5 6.66563 13.5 6.25V3.55938L7.25313 9.75313C6.9875 10.0719 6.5125 10.0719 6.21875 9.75313C5.92812 9.4875 5.92812 9.0125 6.21875 8.71875L12.4406 2.5H9.75ZM1 3.75C1 2.78344 1.78344 2 2.75 2H6.25C6.66563 2 7 2.33594 7 2.75C7 3.16563 6.66563 3.5 6.25 3.5H2.75C2.61188 3.5 2.5 3.6125 2.5 3.75V13.25C2.5 13.3875 2.61188 13.5 2.75 13.5H12.25C12.3875 13.5 12.5 13.3875 12.5 13.25V9.75C12.5 9.33438 12.8344 9 13.25 9C13.6656 9 14 9.33438 14 9.75V13.25C14 14.2156 13.2156 15 12.25 15H2.75C1.78344 15 1 14.2156 1 13.25V3.75Z"
						fill="white" />
				</svg>
</a>
		</nav>
	</header>
        <div id="banner" class="container">
			<div class="digg-divider"></div>
			<!-- IF breadcrumbs.length -->
			<!-- ELSE -->
			<div class="digg-image">
				<img src="/plugins/nodebb-theme-digg/images/community_bg.jpg" alt="" />
			</div>
			<!-- ENDIF breadcrumbs.length -->
			<nav class="navbar navbar-default header" id="header-menu" component="navbar" aria-label="[[global:aria-main-navigation]]">
				<div class="container">
					<!-- IMPORT partials/menu.tpl -->
				</div>
			</nav>
			<nav id="menu" class="slideout-menu hidden" aria-label="[[global:aria-slideout-navigation]]">
				<div class="container">
				<!-- IMPORT partials/slideout-menu.tpl -->
				</div>
			</nav>
			<nav id="chats-menu" class="slideout-menu hidden" aria-label="[[global:aria-chat-navigation]]">
				<div class="container">
				<!-- IMPORT partials/chats-menu.tpl -->
				</div>
			</nav>
        </div>
        
	<main id="panel" class="slideout-panel">
		<div class="container" id="content">
		<!-- IMPORT partials/noscript/warning.tpl -->
		<!-- IMPORT partials/noscript/message.tpl -->
            