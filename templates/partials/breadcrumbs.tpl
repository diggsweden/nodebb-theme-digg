<!-- IF breadcrumbs.length -->
<ol role="navigation" class="breadcrumb" itemscope="itemscope" itemprop="breadcrumb" itemtype="http://schema.org/BreadcrumbList" aria-label="[[global:aria-breadcrumb-navigation]]">
	{{{each breadcrumbs}}}
	<li<!-- IF @last --> component="breadcrumb/current"<!-- ENDIF @last --> itemscope="itemscope" itemprop="itemListElement" itemtype="http://schema.org/ListItem" <!-- IF @last -->class="active"<!-- ENDIF @last -->>
		<meta itemprop="position" content="@index" />
		<!-- IF !@last --><a href="{breadcrumbs.url}" itemprop="item"><!-- ENDIF !@last -->
			<span itemprop="name">
				{breadcrumbs.text}
				<!-- IF @last -->
				<!-- IF !feeds:disableRSS -->
				<!-- IF rssFeedUrl --><a target="_blank" href="{rssFeedUrl}" itemprop="item"><i class="fa fa-rss-square"></i></a><!-- ENDIF rssFeedUrl --><!-- ENDIF !feeds:disableRSS -->
				<!-- ENDIF @last -->
			</span>
		<!-- IF !@last --></a><!-- ENDIF !@last -->
	</li>
	{{{end}}}
</ol>
<!-- ELSE -->
<section class="digg-information">
    <header>Välkommen till Sveriges dataportals community!</header>
    <p>Vad roligt att just du hittat hit! Här kan du ställa frågor, delta i diskussioner, visa upp dina projekt, knyta nya kontakter eller hitta nya samarbeten för utveckling och innovation. Forumet kan läsas av alla, men för att skriva inlägg behöver du först registrera dig.</p>
	<p>Tillsammans bidrar vi till att data blir en bred värdeskapande resurs för hela samhället - för innovation, transparens och kunskap!</p>
</section>
<!-- ENDIF breadcrumbs.length -->