export default function DocumentList({ $target, initialState, onAdd, onDelete }) {
	const $docList = document.createElement("div")
	$docList.className = "doc-list"
	$target.appendChild($docList)

	this.state = initialState

	this.setState = nextState => {
		this.state = nextState
		this.render()
	}

	this.render = () => {
		const documentList = renderDocuments(this.state, "")
		const rootButton = "<button class='btn-add document-item'>+ 페이지 추가</button>"
		$docList.innerHTML = `${documentList}${rootButton}`
	}

	const renderDocuments = (list, text) => {
		text += `
			<ul>
				${list
					.map(
						({ id, title, documents }) =>
							`<li data-id="${id}" class="document-item">${title}
				<button class="btn-add">+</button>
				<button class="btn-delete">-</button>
				</li>

				${documents.map(document => renderDocuments([document], text)).join("")}
				`
					)
					.join("")}
			</ul>
		`
		return text
	}

	this.render()

	$docList.addEventListener("click", e => {
		const { className } = e.target
		const $li = e.target.closest("li")
		const id = $li?.dataset.id ?? null

		if (className) {
			if (className === "btn-delete") {
				onDelete(id)
			} else {
				onAdd(id, className)
			}
		}
	})
}
