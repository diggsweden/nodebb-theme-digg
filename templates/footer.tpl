		</div><!-- /.container#content -->
	</main>
	<!-- IF !isSpider -->
	<div class="topic-search hidden">
		<div class="btn-group">
			<button type="button" class="btn btn-default count"><i class='hidden'>count</i></button>
			<button type="button" class="btn btn-default prev"><i class="fa fa-fw fa-angle-up"></i><i class='hidden'>prev</i></button>
			<button type="button" class="btn btn-default next"><i class="fa fa-fw fa-angle-down"></i><i class='hidden'>next</i></button>
		</div>
	</div>

	<div component="toaster/tray" class="alert-window">
		<div id="reconnect-alert" class="alert alert-dismissable alert-warning clearfix hide" component="toaster/toast">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
			<p>[[global:reconnecting-message, {config.siteTitle}]]</p>
		</div>
	</div>
	<!-- ENDIF !isSpider -->

	<div class="hide">
	<!-- IMPORT 500-embed.tpl -->
	</div>

	<!-- IMPORT partials/footer/js.tpl -->
</body>
</html>
