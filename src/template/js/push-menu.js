export class PushMenu {
    DataKey = 'lte.pushmenu';

    Selector = {
        collapsed: '.sidebar-collapse',
        open: '.sidebar-open',
        mainSidebar: '.main-sidebar',
        contentWrapper: '.content-wrapper',
        searchInput: '.sidebar-form .form-control',
        button: '[data-toggle="push-menu"]',
        mini: '.sidebar-mini',
        expanded: '.sidebar-expanded-on-hover',
        layoutFixed: '.fixed'
    };

    ClassName = {
        collapsed: 'sidebar-collapse',
        open: 'sidebar-open',
        mini: 'sidebar-mini',
        expanded: 'sidebar-expanded-on-hover',
        expandFeature: 'sidebar-mini-expand-feature',
        layoutFixed: 'fixed'
    };

    Event = {
        expanded: 'expanded.pushMenu',
        collapsed: 'collapsed.pushMenu'
    };

    constructor() {
        this.collapseScreenSize = 767;
        this.isExpandOnHover = true;
        this.expandTransitionDelay = 200;

        if (this.isExpandOnHover
            || ($('body').is(this.Selector.mini + this.Selector.layoutFixed))) {
            this.expandOnHover();
            $('body').addClass(this.ClassName.expandFeature);
        }

        $(this.Selector.contentWrapper).click( () => {
            // Enable hide menu when clicking on the content-wrapper on small screens
            if ($(window).width() <= this.collapseScreenSize && $('body').hasClass(this.ClassName.open)) {
                this.close();
            }
        });

        // __Fix for android devices
        $(this.Selector.searchInput).click( (e) => {
            e.stopPropagation();
        });
    }

    toggle() {
        var windowWidth = $(window).width();
        var isOpen = !$('body').hasClass(this.ClassName.collapsed);

        if (windowWidth <= this.collapseScreenSize) {
            isOpen = $('body').hasClass(this.ClassName.open);
        }

        if (!isOpen) {
            this.open();
        } else {
            this.close();
        }
    };

    open() {
        var windowWidth = $(window).width();

        if (windowWidth > this.collapseScreenSize) {
            $('body').removeClass(this.ClassName.collapsed)
                .trigger($.Event(this.Event.expanded));
        }
        else {
            $('body').addClass(this.ClassName.open)
                .trigger($.Event(this.Event.expanded));
        }
    };

    close() {
        var windowWidth = $(window).width();
        if (windowWidth > this.collapseScreenSize) {
            $('body').addClass(this.ClassName.collapsed)
                .trigger($.Event(this.Event.collapsed));
        } else {
            $('body').removeClass(this.ClassName.open + ' ' + this.ClassName.collapsed)
                .trigger($.Event(this.Event.collapsed));
        }
    };

    expandOnHover() {
        $(this.Selector.mainSidebar).hover( () => {
            if ($('body').is(this.Selector.mini + this.Selector.collapsed)
                && $(window).width() > this.collapseScreenSize) {
                this.expand();
            }
        }, () => {
            if ($('body').is(this.Selector.expanded)) {
                this.collapse();
            }
        });
    };

    expand() {
        setTimeout(function () {
            $('body').removeClass(this.ClassName.collapsed)
                .addClass(this.ClassName.expanded);
        }, this.expandTransitionDelay);
    };

    collapse() {
        setTimeout(function () {
            $('body').removeClass(this.ClassName.expanded)
                .addClass(this.ClassName.collapsed);
        }, this.expandTransitionDelay);
    };
}