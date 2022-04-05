import { Request, Response, NextFunction } from "express";
import { Movie } from "../model/Movie";
import { v4 as uuidv4 } from "uuid";

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await Movie.findAll();

    // get some Movies
    return res.status(200).json({
      message: users,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await Movie.findByPk(req.params.id);
    console.log(user);

    // get some Movies
    return res.status(200).json({
      message: user,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// adding a Movie
const addMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body.title);

    const { title, length, imdbApiID } = req.body;
    const id = uuidv4();
    const newMovie = await Movie.create({
      id,
      title,
      length,
      imdbApiID,
    });

    return res.status(200).json({
      message: newMovie,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  // return response
};

export default { getMovies, getMovie, addMovie };
// export default { getMovies, getMovie, updateMovie, deleteMovie, addMovie };
