import SidebarHeader from "./SidebarHeader.js"
import DocumentList from "./DocumentList.js"
import { request } from "../../Domain/api.js"

export default function Sidebar({ $target, initialState }) {
	const $sideBar = document.createElement("div")
	$sideBar.className = "side-content"

	$target.appendChild($sideBar)

	this.state = initialState

	this.setState = nextState => {
		this.state = nextState
		this.render()
	}

	new SidebarHeader({
		$target: $sideBar,
		initialState: {
			workspaceName: "정태호의 노션",
		},
	})

	const documentList = new DocumentList({
		$target: $sideBar,
		initialState: [
			{
				id: 1,
				title: "노션 만들기",
				documents: [],
			},
		],
	})

	this.render = async () => {
		const documents = await request("/documents")
		documentList.setState(documents)
	}

	this.render()
}
