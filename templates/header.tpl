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
				<img src="/plugins/nodebb-theme-digg/images/dataportal_logo.svg" alt="Sveriges dataportal, DIGG - Myndigheten för digital förvaltning">
			</a>
		</div>
		<nav class="digg-menu" aria-label="[[global:aria-header-navigation]]">
			<a href="https://www.dataportal.se/sv/datasets?q=&f=">[[header:search-data]]</a>
			<a href="https://www.dataportal.se/sv/nyheter">[[header:news]]</a>
			<a href="https://www.dataportal.se/sv/om-oss/">[[header:about]]</a>
			<a href="/" class="active">Community</a>
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
			<nav class="navbar navbar-default header" id="header-menu" data-component="navbar" aria-label="[[global:aria-main-navigation]]">
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
            