// becomes two-dimentional array, holds objects meant to be displayed
const displayArray = [];

// class to instantiate nodes on the tree
function treeNodeClass(level, parent, index, title, desc)
{
	this.childs = [];

	this.selectedChild = -1;
	this.indexOfThis = index;

	this.title = title;
	this.desc = desc;

	// adds a new instance to "childs" array
	this.newChild = function(newText, newDesc)
	{
		this.childs.push(new treeNodeClass(level + 1, this, this.childs.length, newText, newDesc));
	}

	this.newAddBtnRec = function()
	{
		this.childs.push(new addNodeBtnClass(level + 1, this, this.childs.length));

		for (child of this.childs)
			if (child.selectedChild !== undefined)
				child.newAddBtnRec();
	}

	this.addToDisplay = function(isSelected)
	{
		// add this node to the displayArray if its not root
		if (level > 0)
			displayArray[level - 1].push(this);

		this.domElem.style.left = (151 * this.indexOfThis);

		if (isSelected)
		{
			// style for when node is selected
			this.removeBtn.style.visibility = "visible";
			this.domElem.style.backgroundColor = "#CCCCFF";

			// if selected, call this same method on child objects
			for (childIndex in this.childs)
				this.childs[childIndex].addToDisplay(childIndex == this.selectedChild);
		}
		else {
			// style for when node is unselected
			this.removeBtn.style.visibility = "hidden";
			this.domElem.style.backgroundColor = "#FFFFFF";
		}
	}

	this.removeNode = function()
	{
		// remove selected node, and fill inn from the right
		parent.childs.splice(this.indexOfThis, 1);
		selectedNode = parent.childs[this.indexOfThis];

		this.updateNodeEdit();

		// update indicies on other nodes to the right(reference members)
		for (let i = this.indexOfThis; i < parent.childs.length; i++)
			parent.childs[i].indexOfThis = i;

		this.draw();
	}

	this.draw = function()
	{
		// clear this stack and outwards in the display array
		for (let i = level - 1; i < displayArray.length; i++)
			displayArray[i] = [];

		// recursively add to display based on selected nodes from parent node, and draw the new nodes
		parent.addToDisplay(true);
		drawNodes(level - 1);
	}

	this.updateNodeEdit = function()
	{
		nodeTitle.value = this.title;
		nodeDesc.value = this.desc;
	}

	this.getParent = function()
	{
		return parent;
	}

	////////////////////////////////////
	// Dom element
	
	this.domElem = document.createElement("div");
	this.domElem.className = "treeNode";
	this.domElem.treeNode = this;

	this.childPar = document.createElement("p");
	this.childPar.innerText = title;

	this.removeBtn = document.createElement("button");
	this.removeBtn.innerText = "X";
	this.removeBtn.style.right = 0;
	this.removeBtn.style.top = 0;
	this.removeBtn.style.visibility = "hidden";
	this.removeBtn.treeNode = this;

	this.domElem.appendChild(this.childPar);
	this.domElem.appendChild(this.removeBtn);

	this.domElem.onclick = function()
	{
		// set this node to be the selected child, on the parent
		parent.selectedChild = this.treeNode.indexOfThis;
		selectedNode = parent.childs[this.treeNode.indexOfThis];

		// update node editor
		this.treeNode.updateNodeEdit();

		this.treeNode.draw();
	}
}
