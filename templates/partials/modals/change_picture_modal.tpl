<div class="row">
	<div class="col-xs-6 col-sm-8 col-md-6">
		<div class="list-group media">
            <div data-outlineparent>
                <button type="button" class="list-group-item" data-type="default">
                    <div class="media-left">
                        <!-- IF defaultAvatar -->
                        <img class="media-object" src="{defaultAvatar}"  />
                        <!-- ELSE -->
                        <div class="user-icon media-object" style="background-color: {icon.bgColor};">{icon.text}</div>
                        <!-- ENDIF defaultAvatar -->
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">[[user:default_picture]]</h4>
                    </div>
                </button>
            </div>
			{{{each pictures}}}
            <div data-outlineparent>
                <button type="button" class="list-group-item" data-type="{pictures.type}">
                    <div class="media-left">
                        <img class="media-object" src="{pictures.url}" title="{pictures.text}" />
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">{pictures.text}</h4>
                    </div>
                </button>
            </div>
			{{{end}}}
		</div>
	</div>
	<div class="col-xs-6 col-sm-4 col-md-6">
		<div class="btn-group-vertical btn-block" role="group">
			<!-- IF allowProfileImageUploads -->
			<button type="button" class="btn btn-default" data-action="upload">
				<span class="hidden-xs hidden-sm">
					[[user:upload_new_picture]]
				</span>
				<span class="visible-xs-inline visible-sm-inline">
					[[user:upload_new_picture_short]]
				</span>
			</button>
			<!-- ENDIF allowProfileImageUploads -->
			<button type="button" class="btn btn-default" data-action="upload-url">
				<span class="hidden-xs hidden-sm">
					[[user:upload_new_picture_from_url]]
				</span>
				<span class="visible-xs-inline visible-sm-inline">
					[[user:upload_new_picture_from_url_short]]
				</span>
			</button>
			<!-- IF uploaded -->
			<button type="button" class="btn btn-default" data-action="remove-uploaded">
				<span class="hidden-xs hidden-sm">
					[[user:remove_uploaded_picture]]
				</span>
				<span class="visible-xs-inline visible-sm-inline">
					<i class="fa fa-picture-o"></i>
					<i class="fa fa-long-arrow-right"></i>
					<i class="fa fa-trash-o"></i>
				</span>
			</button>
			<!-- ENDIF uploaded -->
		</div>
	</div>
</div>

<hr />

<h4>[[user:avatar-background-colour]]</h4>

<label tabindex="0" data-keypress-enter class="changepicmod--label"><input type="radio" name="icon:bgColor" value="transparent" /><span></span></label>
{{{ each iconBackgrounds }}}
<label tabindex="0" data-keypress-enter class="changepicmod--label"><input type="radio" name="icon:bgColor" value="{@value}" /><span style="background-color: {@value};"></span></label>
{{{ end }}}