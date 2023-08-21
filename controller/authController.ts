import express, { Request, Response } from "express";
import { STATUS } from "../error/errorFile";
import authModel from "../model/authModel";
import cloudinary from "../config/cloudinary";
import bcrypt from "bcrypt";

export const register = async (req: any, res: Response) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const pass = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, pass);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path!
    );
    const user = await authModel.create({
      email,
      firstName,
      lastName,
      password: hashed,
      avatar: secure_url,
      avatarID: public_id,
    });

    return res.status(STATUS.CREATED).json({
      message: `${user}'s account has been created successfully`,
      data: user,
    });
  } catch (error) {
    return res.status(STATUS.BAD).json({
      message: "Error occured while registering user",
    });
  }
};


export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });

    if (user) {
      const check = await bcrypt.compare(password, user.password!);
      if (check) {
        return res.status(STATUS.OK).json({
          message: `welcome back ${user.firstName} registered successfully`,
          data: user.id,
        });
      } else {
        return res.status(STATUS.BAD).json({
          message: " please SignUp",
          data: user,
        });
      }
    }
  } catch (error) {
    return res.status(STATUS.BAD).json({
      message: "Error occurred while registering user",
    });
  }
};


export const view = async (req: Request, res: Response) => {
  try {
    return res.status(STATUS.OK).json({
      message : "Viewing all users on the plateform"
    })
  } catch (error) {
    return res.status(STATUS.BAD).json({
      message : "Unable to view all users on our platform"
    })
  }
}