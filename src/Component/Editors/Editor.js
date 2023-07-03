export default function Editor({ $target, initialState = { title: "", content: "" }, onEditing, onClick }) {
	const $editor = document.createElement("div")
	$editor.className = "editor"

	const $subdocumentList = document.createElement("div")

	$target.appendChild($editor)
	$target.appendChild($subdocumentList)

	this.state = initialState

	let isinitialize = false

	this.setState = nextState => {
		this.state = nextState
		$editor.querySelector("[name=title]").value = this.state.title
		$editor.querySelector("[name=content]").value = this.state.content
		this.render([nextState])
	}

	this.render = nextState => {
		if (!isinitialize) {
			$editor.innerHTML = `
				<div>
    				<input type="text" name="title" class="editor-title" placeholder="입력 부탁" value="${this.state.title}" />
				</div>
				<div>
					<textarea name="content" class="editor-content">${this.state.content}</textarea>
				</div>
    		`
			isinitialize = true
		}

		if (nextState) {
			const documentList = renderDocuments(nextState, "")
			$subdocumentList.innerHTML = `<div class="subDocument">선택된 Document의 목록들 ${documentList}</div>`
		}
	}

	const renderDocuments = (list, text) => {
		text += `
			<ul>
				${list
					.map(
						({ id, title, documents }) =>
							`<li data-id="${id}" class="document-item">${title}
				<button class='btn-add'>+</button>
				<button class='btn-delete'>-</button>
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

	$editor.addEventListener("keyup", e => {
		const { target } = e
		const name = target.getAttribute("name")

		if (this.state[name] !== undefined) {
			const nextState = { ...this.state, [name]: target.value }

			this.setState(nextState)
			onEditing(this.state)
		}
	})

	$subdocumentList.addEventListener("click", e => {
		const $li = e.target.closest(".document-item")

		if ($li) {
			const { id } = $li.dataset
			onClick(id)
		}
	})
}
