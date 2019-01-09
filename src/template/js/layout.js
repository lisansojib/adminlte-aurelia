export class Layout {
    DataKey = 'lte.layout';

    Selector = {
        wrapper: '.wrapper',
        contentWrapper: '.content-wrapper',
        layoutBoxed: '.layout-boxed',
        mainFooter: '.main-footer',
        mainHeader: '.main-header',
        sidebar: '.sidebar',
        controlSidebar: '.control-sidebar',
        fixed: '.fixed',
        sidebarMenu: '.sidebar-menu',
        logo: '.main-header .logo'
    };

    ClassName = {
        fixed: 'fixed',
        holdTransition: 'hold-transition'
    };

    constructor() {
        this.slimscroll = true;
        this.resetHeight = true;
        this.activate();
    }

    activate() {
        this.fix();
        this.fixSidebar();

        $('body').removeClass(this.ClassName.holdTransition);

        if (this.resetHeight) {
            $('body, html, ' + this.Selector.wrapper).css({
                'height': 'auto',
                'min-height': '100%'
            });
        }

        if (!this.bindedResize) {
            $(window).resize(function () {
                this.fix();
                this.fixSidebar();

                $(this.Selector.logo + ', ' + this.Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                    this.fix();
                    this.fixSidebar();
                }.bind(this));
            }.bind(this));

            this.bindedResize = true;
        }

        $(this.Selector.sidebarMenu).on('expanded.tree', function () {
            this.fix();
            this.fixSidebar();
        }.bind(this));

        $(this.Selector.sidebarMenu).on('collapsed.tree', function () {
            this.fix();
            this.fixSidebar();
        }.bind(this));
    };

    fix() {
        // Remove overflow from .wrapper if layout-boxed exists
        $(this.Selector.layoutBoxed + ' > ' + this.Selector.wrapper).css('overflow', 'hidden');

        // Get window height and the wrapper height
        var footerHeight = $(this.Selector.mainFooter).outerHeight() || 0;
        var headerHeight = $(this.Selector.mainHeader).outerHeight() || 0;
        var neg = headerHeight + footerHeight;
        var windowHeight = $(window).height();
        var sidebarHeight = $(Selector.sidebar).height() || 0;

        // Set the min-height of the content and sidebar based on
        // the height of the document.
        if ($('body').hasClass(this.ClassName.fixed)) {
            $(this.Selector.contentWrapper).css('min-height', windowHeight - footerHeight);
        } else {
            var postSetHeight;

            if (windowHeight >= sidebarHeight) {
                $(this.Selector.contentWrapper).css('min-height', windowHeight - neg);
                postSetHeight = windowHeight - neg;
            } else {
                $(this.Selector.contentWrapper).css('min-height', sidebarHeight);
                postSetHeight = sidebarHeight;
            }

            // Fix for the control sidebar height
            var $controlSidebar = $(this.Selector.controlSidebar);
            if (typeof $controlSidebar !== 'undefined') {
                if ($controlSidebar.height() > postSetHeight)
                    $(this.Selector.contentWrapper).css('min-height', $controlSidebar.height());
            }
        }
    };

    fixSidebar() {
        // Make sure the body tag has the .fixed class
        if (!$('body').hasClass(this.ClassName.fixed)) {
            if (typeof $.fn.slimScroll !== 'undefined') {
                $(this.Selector.sidebar).slimScroll({ destroy: true }).height('auto');
            }
            return;
        }

        // Enable slimscroll for fixed layout
        if (this.slimscroll) {
            if (typeof $.fn.slimScroll !== 'undefined') {
                // Destroy if it exists
                // $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')

                // Add slimscroll
                $(this.Selector.sidebar).slimScroll({
                    height: ($(window).height() - $(this.Selector.mainHeader).height()) + 'px'
                });
            }
        }
    };
}