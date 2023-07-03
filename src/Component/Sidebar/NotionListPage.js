import { request } from "../../Domain/api.js"
import NotionListHeader from "./NotionListHeader.js"
import DocumentList from "./DocumentList.js"

export default function NotionListPage({ $target, editDocument, reset }) {
	const $page = document.createElement("div")
	$page.className = "notion-Listpage"

	new NotionListHeader({
		$target: $page,
		initialState: {
			workspaceName: "👻 정태호의 노션",
		},
	})

	const documentList = new DocumentList({
		$target: $page,
		initialState: [],
		onAdd: async (id, className) => {
			console.log(id, className)
			if (className.includes("btn-add")) {
				const post = {
					title: "new",
					parent: id,
				}
				const newDocument = await fetchNewDocument(post)
				editDocument(newDocument.id)
			} else {
				editDocument(id) //list 클릭 시에 수정할 수 있도록
			}
		},

		onDelete: async id => {
			await request(`/documents/${id}`, {
				method: "DELETE",
			})

			history.pushState(null, null, "/")
			reset()
		},
	})

	const fetchDocument = async () => {
		const posts = await request(`/documents`)
		documentList.setState(posts)
	}

	const fetchNewDocument = async post => {
		const newDocument = await request(`/documents`, {
			method: "POST",
			body: JSON.stringify(post),
		})

		return await newDocument
	}

	this.render = async () => {
		await fetchDocument()
		$target.appendChild($page)
	}
}
