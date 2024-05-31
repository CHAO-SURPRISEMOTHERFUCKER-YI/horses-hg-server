import { Request, Response } from "express";
import Activity from "../models/Activity";
import path from "path";
import fs from "fs";

export class ActivityController {
  static createActivity = async (req: Request, res: Response) => {
    const activity = new Activity(req.body);
    activity.manager = req.user.id;
    try {
      await activity.save();
      res.send("La actividad se ha registrado correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al registrar el caballo");
    }
  };

  static getAllActivities = async (req: Request, res: Response) => {
    try {
      const activities = await Activity.find({});
      res.json(activities);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener todos las actividades");
    }
  };

  static getActivityById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const activity = await Activity.findById(id);
      if (!activity) {
        return res.status(404).json({ error: "Actividad no encontrado" });
      }
      res.json(activity);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener el actividad");
    }
  };

  static updateActivity = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const activity = await Activity.findByIdAndUpdate(id, req.body);
      if (!activity) {
        return res.status(404).json({ error: "Actividad no encontrado" });
      }
      res.json("Datos de la actividad actualizados");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al actualizar el actividad");
    }
  };

  static deleteActivity = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const activity = await Activity.findById(id);
      if (!activity) {
        return res.status(404).json({ error: "Actividad no encontrado" });
      }
      const filePath = path.join(
        __dirname,
        "../..",
        "public/images",
        activity.image
      );
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error(err);
          console.error(filePath);
          return res
            .status(500)
            .json({ error: "Error al eliminar el archivo de imagen" });
        }

        try {
          await activity.deleteOne();
          res.json("Registro de la actividad y la imagen eliminados");
        } catch (deleteError) {
          console.error(deleteError);
          res
            .status(500)
            .json({
              error: "Error al eliminar el caballo de la base de datos",
            });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al eliminar el actividad");
    }
  };
}
