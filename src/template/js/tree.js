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

    constructor(tree) {
        this.animationSpeed = 500;
        this.accordion = true;
        this.followLink = false;
        this.trigger = '.treeview a';
    }

    activate() {
        if (!this.element)
            this.element = $('ul[data-widget="tree"]');

        this.element.addClass(this.ClassName.tree);
        $(this.Selector.treeview + this.Selector.active, this.element).addClass(this.ClassName.open);
        this._setUpListeners();
    }

    toggle(link, event) {
        var treeviewMenu = link.next(this.Selector.treeviewMenu);
        var parentLi = link.parent();
        var isOpen = parentLi.hasClass(this.ClassName.open);

        if (!parentLi.is(this.Selector.treeview)) {
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
        var expandedEvent = $.Event(this.Event.expanded);

        if (this.accordion) {
            var openMenuLi = parent.siblings(this.Selector.open);
            var openTree = openMenuLi.children(this.Selector.treeviewMenu);
            this.collapse(openTree, openMenuLi);
        }

        parent.addClass(this.ClassName.open);
        tree.slideDown(this.animationSpeed, () => {
            this.element.trigger(expandedEvent);
        });
    };

    collapse(tree, parentLi) {
        var collapsedEvent = $.Event(this.Event.collapsed);

        //tree.find(Selector.open).removeClass(ClassName.open);
        parentLi.removeClass(this.ClassName.open);
        tree.slideUp(this.animationSpeed, () => {
            //tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
            this.element.trigger(collapsedEvent);
        });
    };

    // Private

    _setUpListeners() {
        this.element.on('click', this.trigger, (event) => {
            this.toggle($(event.currentTarget), event);
        });
    };
}