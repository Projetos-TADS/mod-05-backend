import { MovieModel } from "../src/models";
import movieService from "../src/services/movie.services";

jest.mock("../src/models");

describe("MovieService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("deleteMovie", () => {
    it("deve deletar o filme com sucesso", async () => {
      const mockMovie = {
        movieId: "035481ce-9863-4511-8902-c7f219a39573",
        title: "Inception",
        description: "A mind-bending thriller",
        releaseYear: 2010,
        duration: 148,
        rating: 4.5,
        urlImage: "https://example.com/inception.jpg",
        destroy: jest.fn().mockResolvedValue(undefined),
      };

      await movieService.deleteMovie(mockMovie as unknown as MovieModel);

      expect(mockMovie.destroy).toHaveBeenCalledTimes(1);
    });

    it("deve lançar um erro quando a deleção do filme falha", async () => {
      const mockMovie = {
        movieId: "035481ce-9863-4511-8902-c7f219a39573",
        title: "Inception",
        description: "A mind-bending thriller",
        releaseYear: 2010,
        duration: 148,
        rating: 4.5,
        urlImage: "https://example.com/inception.jpg",
        destroy: jest.fn().mockRejectedValue(new Error("Database error")),
      };

      await expect(movieService.deleteMovie(mockMovie as unknown as MovieModel)).rejects.toThrow(
        "Database error"
      );

      expect(mockMovie.destroy).toHaveBeenCalledTimes(1);
    });
  });
});
