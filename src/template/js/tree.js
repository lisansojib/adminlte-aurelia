export class Tree {
    DataKey = 'lte.tree';

    Selector = {
        tree: '.tree',
        treeview: '.treeview',
        treeviewMenu: '.treeview-menu',
        open: '.menu-open, .active',
        li: 'li',
        data: '[data-widget="tree"]',
        active: '.active'
    };

    ClassName = {
        open: 'menu-open',
        tree: 'tree'
    };

    Event = {
        collapsed: 'collapsed.tree',
        expanded: 'expanded.tree'
    };

    constructor() {
        this.animationSpeed = 500;
        this.accordion = true;
        this.followLink = false;
        this.trigger = '.treeview a';
    }

    activate(){
        $(this.element).addClass(ClassName.tree);
        $(Selector.treeview + Selector.active, this.element).addClass(ClassName.open);
        this._setUpListeners();
    }

    toggle(link, event) {
        var treeviewMenu = link.next(Selector.treeviewMenu);
        var parentLi = link.parent();
        var isOpen = parentLi.hasClass(ClassName.open);

        if (!parentLi.is(Selector.treeview)) {
            return;
        }

        if (!this.followLink || link.attr('href') === '#') {
            event.preventDefault();
        }

        if (isOpen) {
            this.collapse(treeviewMenu, parentLi);
        } else {
            this.expand(treeviewMenu, parentLi);
        }
    };

    expand(tree, parent) {
        var expandedEvent = $.Event(Event.expanded);

        if (this.accordion) {
            var openMenuLi = parent.siblings(Selector.open);
            var openTree = openMenuLi.children(Selector.treeviewMenu);
            this.collapse(openTree, openMenuLi);
        }

        parent.addClass(ClassName.open);
        tree.slideDown(this.animationSpeed, function () {
            $(this.element).trigger(expandedEvent);
        }.bind(this));
    };

    collapse(tree, parentLi) {
        var collapsedEvent = $.Event(Event.collapsed);

        //tree.find(Selector.open).removeClass(ClassName.open);
        parentLi.removeClass(ClassName.open);
        tree.slideUp(this.animationSpeed, function () {
            //tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
            $(this.element).trigger(collapsedEvent);
        }.bind(this));
    };

    // Private

    _setUpListeners() {
        var that = this;

        $(this.element).on('click', this.trigger, function (event) {
            that.toggle($(this), event);
        });
    };
}