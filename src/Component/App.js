import NotionListPage from "./Sidebar/NotionListPage.js"
import EditPage from "./Editors/EditPage.js"
import { initRouter } from "../Domain/router.js"
import { push } from "../Domain/router.js"

export default function App({ $target }) {
	const notionListPage = new NotionListPage({
		$target,
		editDocument: id => {
			push(`/documents/${id}`)
			initRouter(() => this.route())
		},
		reset: () => {
			this.route()
		},
	})

	const editPage = new EditPage({
		$target,
		selectedId: null,
		update: () => notionListPage.render(),
	})

	this.route = async () => {
		const { pathname } = window.location

		if (pathname.indexOf("/documents/") === 0) {
			const [, , id] = pathname.split("/")
			await notionListPage.render()
			await editPage.setState({ id })
		} else {
			notionListPage.render()
			$target.innerHTML = ""
		}
	}

	this.route()
}
