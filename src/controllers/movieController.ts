import { Request, Response } from "express";
import { MovieModel } from "../models/Movies";
import Logger from "../../config/logger";

export async function createMovie(req: Request, res: Response) {
  try {
    const data = req.body;
    const newMovie = await MovieModel.create(data);
    return res.status(201).json(newMovie);
  } catch (error: any) {
    if (error instanceof Error) {
      return Logger.error(`Erro no sistema: ${error.message}`);
    }
  }
}

export async function findMovieById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const movieId = await MovieModel.findById(id);

    if (!movieId) {
      return res.status(404).json({ error: `Filme não encontrado` });
    }

    return res.status(200).json(movieId);
  } catch (error) {
    if (error instanceof Error) {
      return Logger.error(`Erro no sistema: ${error.message}`);
    }
  }
}

export async function getAllMovies(req: Request, res: Response) {
  try {
    const movies = await MovieModel.find();
    return res.status(200).json(movies);
  } catch (error) {
    if (error instanceof Error) {
      return Logger.error(`Erro no sistema: ${error.message}`);
    }
  }
}

export async function removeMovie(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const movieById = await MovieModel.findById(id);

    if (!movieById) {
      return res.status(404).json({ error: "Filme não encotrado" });
    }

    await movieById.deleteOne({
      where: {
        id,
      },
    });

    return res.status(200).json({ message: "Filme deletado!" });
  } catch (error) {
    return Logger.error(`Erro no sistema: ${error.message}`);
  }
}

export async function updateMovie(req: Request, res: Response) {
  const data = req.body;

  try {
    const { id } = req.params;
    const movieById = await MovieModel.findById(id);

    if (!movieById) {
      return res.status(404).json({ error: "Filme não encotrado" });
    }

    await MovieModel.updateOne({ _id: id }, data);

    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      return Logger.error(`Erro no sistema: ${error.message}`);
    }
  }
}
