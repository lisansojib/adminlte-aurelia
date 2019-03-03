import { inject } from 'aurelia-framework';

export class Sidebar {
	activeMenu = true;
	itemTemplate = "";
	data = [
		{ id: 1, title: "Level 1", icon:'', route:"#welcome", child: [] },
		{
			id: 2, title: "Level 2", child: [
				{ id: 21, title: "Level 2.1", icon:'', route:"#welcome", child: [] },
				{ id: 22, title: "Level 2.2", icon:'', route:"#welcome", child: [] },
				{ id: 23, title: "Level 2.3", icon:'', route:"#welcome", child: [] }
			]
		},
		{
			id: 3, title: "Level 3", icon:'', route:"#welcome", child: [
				{ id: 31, title: "Level 3.1", icon:'', route:"#welcome", child: [] },
				{
					id: 32, title: "Level 3.2", icon:'', route:"#welcome", child: [
						{ id: 311, title: "Level 3.2.1", icon:'', route:"#welcome", child: [] },
						{ id: 312, title: "Level 3.2.2", icon:'', route:"#welcome", child: [] },
						{
							id: 312, title: "Level 3.2.3", icon:'', route:"#welcome", child: [
								{ id: 311, title: "Level 3.2.3.1", icon:'', route:"#welcome", child: [] },
								{ id: 312, title: "Level 3.2.3.2", icon:'', route:"#welcome", child: [] }
							]
						}
					]
				},
				{ id: 33, title: "Level 3.3", icon:'', route:"#welcome", child: [] }
			]
		}
	];

	constructor() {
		this.generateMenu(this.data);
	}

	attached() {
		$(".sidebar-menu").append(this.itemTemplate);
		$(".sidebar-menu").tree();
	}

	generateMenu(menuList) {
		for (let item of menuList) {
			if (!item.child.length) {
				this.itemTemplate += `<li><a href="${item.route}"><i class="fa fa-circle-o"></i> <span>${item.title}</span></a></li>`;
				this.activeMenu = false;
				continue;
			}
			else {
				this.itemTemplate += `<li class="treeview ${this.activeMenu ? 'active' : ''}">`;
				this.itemTemplate += '<a href="#">'
					+ `<i class="fa fa-circle"></i><span>${item.title}</span>`
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