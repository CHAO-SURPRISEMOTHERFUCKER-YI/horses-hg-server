import { Request, Response } from "express";
import Horse from "../models/Horse";

export class HorseController {
  static createHorse = async (req: Request, res: Response) => {
    const horse = new Horse(req.body);
    horse.manager = req.user.id;
    try {
      await horse.save();
      res.send("Caballo registrado correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al registrar el caballo");
    }
  };

  static getAllHorses = async (req: Request, res: Response) => {
    try {
      const horses = await Horse.find({});
      res.json(horses);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener todos los caballos");
    }
  };

  static getHorseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const horse = await Horse.findById(id);
      if (!horse) {
        return res.status(404).json({ error: "Caballo no encontrado" });
      }
      res.json(horse);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener el caballo");
    }
  };

  static updateHorse = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const horse = await Horse.findByIdAndUpdate(id, req.body);
      if (!horse) {
        return res.status(404).json({ error: "Caballo no encontrado" });
      }
      res.json("Datos del caballo actualizados");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al actualizar el caballo");
    }
  };

  static deleteHorse = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const horse = await Horse.findById(id);
      if (!horse) {
        return res.status(404).json({ error: "Caballo no encontrado" });
      }
      await horse.deleteOne();

      res.json("Registro del caballo eliminado");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al eliminar el caballo");
    }
  };
}
