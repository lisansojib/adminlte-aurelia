export class BoxWidget {
    DataKey = 'lte.boxwidget';
    animationSpeed = 500;
    collapseTrigger = '[data-widget="collapse"]';
    removeTrigger = '[data-widget="remove"]';
    collapseIcon = 'fa-minus';
    expandIcon = 'fa-plus';
    removeIcon = 'fa-times';

    Selector = {
        data: '.box',
        collapsed: '.collapsed-box',
        body: '.box-body',
        footer: '.box-footer',
        tools: '.box-tools'
    }

    ClassName = {
        collapsed: 'collapsed-box'
    }

    Event = {
        collapsed: 'collapsed.boxwidget',
        expanded: 'expanded.boxwidget',
        removed: 'removed.boxwidget'
    }

    activate() {
        this.element = $(this.Selector.data);
        this._setUpListeners();
    }


    toggle() {
        var isOpen = !this.element.is(this.Selector.collapsed);

        if (isOpen) {
            this.collapse();
        } else {
            this.expand();
        }
    }

    expand() {
        var expandedEvent = $.Event(this.Event.expanded);
        var collapseIcon = this.collapseIcon;
        var expandIcon = this.expandIcon;

        this.element.removeClass(this.ClassName.collapsed);

        this.element.find(this.Selector.tools)
            .find('.' + expandIcon)
            .removeClass(expandIcon)
            .addClass(collapseIcon);

        this.element.find(this.Selector.body + ', ' + this.Selector.footer)
            .slideDown(this.animationSpeed, () => {
                this.element.trigger(expandedEvent)
            });
    }

    collapse() {
        var collapsedEvent = $.Event(this.Event.collapsed);
        var collapseIcon = this.collapseIcon;
        var expandIcon = this.expandIcon;

        this.element.find(this.Selector.tools)
            .find('.' + collapseIcon)
            .removeClass(collapseIcon)
            .addClass(expandIcon);

        this.element.find(this.Selector.body + ', ' + this.Selector.footer)
            .slideUp(this.animationSpeed, () => {
                this.element.addClass(this.ClassName.collapsed);
                this.element.trigger(collapsedEvent);
            });
    }

    remove() {
        var removedEvent = $.Event(this.Event.removed)

        this.element.slideUp(this.animationSpeed, () => {
            this.element.trigger(removedEvent)
            this.element.remove()
        });
    }

    // Private
    _setUpListeners() {
        this.element.on('click', this.collapseTrigger, (event) => {
            if (event) event.preventDefault();
            this.toggle();
        });

        this.element.on('click', this.removeTrigger, (event) => {
            if (event) event.preventDefault()
            this.remove();
        })
    }
}