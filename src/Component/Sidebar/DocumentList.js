import { push } from "../../Domain/router.js"

export default function DocumentList({ $target, initialState }) {
	const $docList = document.createElement("div")
	$docList.className = "doc-list"

	$target.appendChild($docList)

	this.state = initialState

	this.setState = nextState => {
		this.state = nextState
		this.render()
	}

	const renderDocuments = nextDocuments => `
	<ul>
	  ${nextDocuments
			.map(
				({ id, title, documents }) => `
			<li data-id="${id}" class="doc-item">
			  ${title}
			  <button class="btn-add" type="button">+</button>
			</li>
			${documents.length ? renderDocuments(documents) : "No pages inside"}
		  `
			)
			.join("")}
	</ul>
  `

	this.render = () => {
		if (this.state.length > 0) {
			$docList.innerHTML = renderDocuments(this.state)
		}
	}

	$docList.addEventListener("click", e => {
		const $li = e.target

		if ($li) {
			const { className } = $li
			const { id } = $li.dataset
			if (className === "doc-item") {
				push(`/documents/${id}`)
			} else {
				push(`/documents/new`)
			}
		}
	})

	this.render()
}
