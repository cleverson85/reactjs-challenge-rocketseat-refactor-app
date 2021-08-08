import { useEffect, useState } from "react";
import { GenreResponseProps } from "../@types/genres-props";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface MovieProps {
	imdbID: string;
	Title: string;
	Poster: string;
	Ratings: Array<{
		Source: string;
		Value: string;
	}>;
	Runtime: string;
}

interface ContentProps {
	id: number;
	title: string;
}

export function Content(props: ContentProps) {
	const [movies, setMovies] = useState<MovieProps[]>([]);

	const { id, title } = props;

	useEffect(() => {
		api.get<MovieProps[]>(`movies/?Genre_id=${id}`).then((response) => {
			setMovies(response.data);
		});
	}, [id]);

	return (
		<div className="container">
			<header>
				<span className="category">
					Categoria:<span> {title}</span>
				</span>
			</header>

			<main>
				<div className="movies-list">
					{movies.map((movie) => (
						<MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
					))}
				</div>
			</main>
		</div>
	);
}
