import { useEffect, useState } from "react";
import { GenreResponseProps } from "./@types/genres-props";
import { Content } from "./components/Content";
import { SideBar } from "./components/SideBar";
import "./styles/content.scss";
import "./styles/global.scss";
import "./styles/sidebar.scss";

export function App() {
	const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<SideBar setGenre={setSelectedGenre} />
			<Content id={selectedGenre.id || 1} title={selectedGenre.title} />
		</div>
	);
}
