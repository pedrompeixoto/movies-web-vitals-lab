import { MovieAPIMovie } from "@/movies-api/movies-api";

interface MovieEntryProps {
    movie: MovieAPIMovie
}

export default function MovieEntry({ movie }: MovieEntryProps) {
    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="h-60 w-60 overflow-hidden flex justify-center items-center">
                <img className="max-h-full max-w-full" src={ movie.primaryImage?.url } alt={movie.titleText.text}/>
            </div>
            <span className="text-center">{ movie.titleText.text }</span>
        </div>
    );
}
