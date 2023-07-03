import Editor from "./Editor.js"
import { request } from "../../Domain/api.js"

export default function EditPage({ $target, selectedId, update }) {
	const $page = document.createElement("div")
	$page.className = "edit-container"

	this.state = selectedId

	let timer = null

	const editor = new Editor({
		$target: $page,
		initialState: { title: "", content: "" },
		onEditing: post => {
			if (timer !== null) clearTimeout(timer)
			timer = setTimeout(() => {
				fetchDocument(post)
			}, 2000)
		},
		onClick: id => {
			this.state = { id }
			history.pushState(null, null, `/documents/${id}`)
			selectedDocument()
		},
	})

	this.setState = async nextState => {
		this.state = nextState
		await selectedDocument()
		this.render()
	}

	const selectedDocument = async () => {
		//리스트 클릭시 이동
		const post = await request(`/documents/${this.state.id}`)
		await editor.setState(post)
	}

	const fetchDocument = async post => {
		//수정
		await request(`/documents/${this.state.id}`, {
			method: "PUT",
			body: JSON.stringify(post),
		})
		await update()
		this.render()
	}

	this.render = () => {
		$target.appendChild($page)
	}
}
