const selection = figma.currentPage.selection;

const isMaskable = (
	node: SceneNode | (SceneNode & BlendMixin),
): node is SceneNode & BlendMixin => {
	return (node as BlendMixin).isMask !== undefined;
};

if (selection.length >= 2) {
	let parent: (BaseNode & ChildrenMixin) | null =
		selection[selection.length - 1].parent;
	if (parent === null) parent = figma.currentPage;
	const group = figma.group(selection, parent);
	group.name = "Mask group";

	const maskNode = group.children[group.children.length - 1];
	group.insertChild(0, maskNode);
	if (isMaskable(maskNode)) {
		maskNode.isMask = true;
	}
}

figma.closePlugin();
