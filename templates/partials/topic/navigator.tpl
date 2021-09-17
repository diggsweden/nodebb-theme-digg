<div class="pagination-block text-center">
    <div class="progress-bar"></div>
    <div id="dropupPaginator" class="wrapper dropup">
        <i class="fa fa-2x fa-angle-double-up pointer fa-fw pagetop"></i>

        <a href="#" id="dropupPaginatorToggle" class="dropdown-toggle" data-toggle="dropdown">
            <span class="pagination-text"></span>
        </a>

        <i class="fa fa-2x fa-angle-double-down pointer fa-fw pagebottom"></i>
        <ul class="dropdown-menu dropdown-menu-right" role="navigation" data-trapfocus>
            <li class="row bootbox--close">
                <button id="dropupPaginatorClose" class="bootbox-close-button close">×</button> 
            </li>
            <li>
                <div class="row">
                    <div class="col-xs-8 post-content"></div>
                    <div class="col-xs-4 text-right">
                        <div class="scroller-content">
                            <span class="pointer pagetop" tabindex="0" data-keypress-enter>[[topic:first-post]] <i class="fa fa-angle-double-up"></i></span>
                            <div class="scroller-container">
                                <div class="scroller-thumb">
                                    <span class="thumb-text"></span>
                                    <div class="scroller-thumb-icon"></div>
                                </div>
                            </div>
                            <span class="pointer pagebottom" tabindex="0" data-keypress-enter>[[topic:last-post]] <i class="fa fa-angle-double-down"></i></span>
                        </div>
                    </div>
                </div>
                <label for="pagignaiton-enter-index" class='hidden'>Pagination enter dropup</label>
                <input id="pagignaiton-enter-index" type="text" class="form-control" id="indexInput" placeholder="[[global:pagination.enter_index]]">
            </li>
        </ul>
    </div>
</div>