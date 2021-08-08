import { useEffect, useState } from "react";
import { GenreResponseProps } from "../@types/genres-props";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps {
	setGenre: (value: GenreResponseProps) => void;
}

export function SideBar(props: SideBarProps) {
	const [selectedGenreId, setSelectedGenreId] = useState(1);
	const [genres, setGenres] = useState<GenreResponseProps[]>([]);

	useEffect(() => {
		api.get<GenreResponseProps[]>("genres").then((response) => {
			setGenres(response.data);
		});
	}, []);

	function handleGenresToContent(id: number) {
		const result = genres.find((genre) => genre.id === id);
		props.setGenre(result as GenreResponseProps);
	}

	function handleClickButton(id: number) {
		setSelectedGenreId(id);
		handleGenresToContent(id);
	}

	return (
		<nav className="sidebar">
			<span>
				Watch<p>Me</p>
			</span>

			<div className="buttons-container">
				{genres.map((genre) => (
					<Button key={String(genre.id)} title={genre.title} iconName={genre.name} onClick={() => handleClickButton(genre.id)} selected={selectedGenreId === genre.id} />
				))}
			</div>
		</nav>
	);
}
