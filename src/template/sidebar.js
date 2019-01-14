import { inject } from 'aurelia-framework';
import { Tree } from './js/tree';

@inject(Tree)
export class Sidebar {
	activeMenu = true;
	itemTemplate = "";
	data = [
		{ id: 1, title: "Level 1", child: [] },
		{
			id: 2, title: "Level 2", child: [
				{ id: 21, title: "Level 2.1", child: [] },
				{ id: 22, title: "Level 2.2", child: [] },
				{ id: 23, title: "Level 2.3", child: [] }
			]
		},
		{
			id: 3, title: "Level 3", child: [
				{ id: 31, title: "Level 3.1", child: [] },
				{
					id: 32, title: "Level 3.2", child: [
						{ id: 311, title: "Level 3.2.1", child: [] },
						{ id: 312, title: "Level 3.2.2", child: [] }
					]
				},
				{ id: 33, title: "Level 3.3", child: [] }
			]
		}
	];

	constructor(tree) {
		this.tree = tree;
		this.generateMenu(this.data);
	}

	attached() {
		debugger;
		$(".sidebar-menu").append(this.itemTemplate);
		this.tree.activate();
	}

	generateMenu(menuList) {
		for (let item of menuList) {
			if (!item.child.length) {
				this.itemTemplate += `<li class="${this.activeMenu ? 'active' : ''}"><a href="#!"><i class="fa fa-circle-o"></i>${item.title}</a></li>`;
				this.activeMenu = false;
				continue;
			}
			else {
				this.itemTemplate += `<li class="treeview ${this.activeMenu ? 'active' : ''}">`;
				this.itemTemplate += '<a href="#">'
					+ `<i class="fa fa-dashboard"></i>${item.title}<span></span>`
					+ '<span class="pull-right-container">'
					+ '<i class="fa fa-angle-left pull-right"></i>'
					+ '</span>'
					+ '</a>';
				this.itemTemplate += '<ul class="treeview-menu">';
				this.activeMenu = false;
			}

			this.generateMenu(item.child);

			this.itemTemplate += '</ul></li>';
		}
	}
}