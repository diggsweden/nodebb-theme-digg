<!-- IF breadcrumbs.length -->
<nav>
	<ol class="breadcrumb" itemscope="itemscope"  itemtype="http://schema.org/BreadcrumbList" aria-label="[[global:aria-breadcrumb-navigation]]">
		{{{each breadcrumbs}}}
		<li<!-- IF @last --> component="breadcrumb/current"<!-- ENDIF @last --> itemscope="itemscope" itemprop="itemListElement" itemtype="http://schema.org/ListItem" <!-- IF @last -->class="active"<!-- ENDIF @last -->>
			<meta itemprop="position" content='{@index}' />
			<!-- IF !@last --><a href="{breadcrumbs.url}" itemprop="item"><!-- ENDIF !@last -->
				<span itemprop="name">
					{breadcrumbs.text}
					<!-- IF @last -->
					<!-- IF !feeds:disableRSS -->
					<!-- IF rssFeedUrl --><a target="_blank" href="{rssFeedUrl}" itemprop="item"><i class="fa fa-rss-square"></i><i class='hidden'>breadcrumb link</i></a><!-- ENDIF rssFeedUrl --><!-- ENDIF !feeds:disableRSS -->
					<!-- ENDIF @last -->

				
				</span>
			<!-- IF !@last --><i class='hidden'>breadcrumb link</i></a><!-- ENDIF !@last -->
		</li>
		{{{end}}}
	</ol>
</nav>
<!-- ELSE -->
<section class="digg-information">
    <header>Välkommen till Sveriges dataportals community!</header>
    <p>Vad roligt att just du hittat hit! Här kan du ställa frågor, delta i diskussioner, visa upp dina projekt, knyta nya kontakter eller hitta nya samarbeten för utveckling och innovation. Forumet kan läsas av alla, men för att skriva inlägg behöver du först registrera dig. Mer information om hur det fungerar här hittar du i kategorin "<a href="https://community.dataportal.se/category/11/om-detta-community">Om detta community</a>"</p>
	<p>Tillsammans bidrar vi till att data blir en bred värdeskapande resurs för hela samhället - för innovation, transparens och kunskap!</p>
</section>
<!-- ENDIF breadcrumbs.length -->