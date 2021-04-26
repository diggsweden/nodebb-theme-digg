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

	<button class="skip-to-content">Till innehållet</button>

	<main id="panel" class="slideout-panel">
        <div class="container">
			<div class="digg-navigation">
				<div class="digg-logo">
					<a href="https://www.dataportal.se/sv">
						<img src="/plugins/nodebb-theme-digg/images/dataportal_logo.svg" alt="">
					</a>
				</div>
				<nav class="digg-menu">
					<a href="https://www.dataportal.se/sv/datasets?q=&f=">Sök data</a>
					<a href="https://www.dataportal.se/sv/nyheter">Nyheter</a>
					<a href="https://www.dataportal.se/sv/om-oss/">Om oss</a>
					<a href="/" class="active">Community</a>
				</nav>
			</div>
			<div class="digg-divider"></div>
			<!-- IF breadcrumbs.length -->
			<!-- ELSE -->
			<div class="digg-image">
				<img src="/plugins/nodebb-theme-digg/images/community_bg.jpg" alt="" />
			</div>
			<!-- ENDIF breadcrumbs.length -->
			<nav class="navbar navbar-default header" id="header-menu" component="navbar">
				<div class="container">
					<!-- IMPORT partials/menu.tpl -->
				</div>
			</nav>
			<nav id="menu" class="slideout-menu hidden">
				<!-- IMPORT partials/slideout-menu.tpl -->
			</nav>
			<nav id="chats-menu" class="slideout-menu hidden">
				<!-- IMPORT partials/chats-menu.tpl -->
			</nav>
        </div>
        
		<div class="container" id="content">
		<!-- IMPORT partials/noscript/warning.tpl -->
		<!-- IMPORT partials/noscript/message.tpl -->
            