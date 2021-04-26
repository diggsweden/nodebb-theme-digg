<div component="category-selector" class="btn-group bottom-sheet pull-right">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
        [[unread:mark_as_read]]
        <span class="caret"></span>
    </button>
    <div component="category-selector-search" class="hidden">
        <input type="text" class="form-control" autocomplete="off">
    </div>
    <ul data-trapfocus component="category/list" class="dropdown-menu category-dropdown-menu" role="menu">
        <li role="presentation">
            <a id="markAllRead" role="menuitem" tabindex="-1" href="#">Alla</a>
        </li>
        <li class="divider"></li>
        {{{each categories}}}
        <li role="presentation" class="category {{{ if ../disabledClass }}}disabled {{{ end }}}" data-cid="{../cid}"
            data-name="{../name}" data-parent-cid="{../parentCid}">
            <a role="menu-item" href="#">{../level}<span component="category-markup"
                    style="{{{ if ../match }}}font-weight: bold;{{{end}}}">{{{ if ./icon }}}<span class="fa-stack"
                        style="{function.generateCategoryBackground}"><i style="color: {../color};"
                                class="fa fa-stack-1x fa-fw {../icon}"></i></span>{{{ end }}} {../name}</span></a>
            </li>
            {{{ end }}}
        </ul>
    </div>