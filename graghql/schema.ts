import { builder } from "./bulider";
import "./types/Project";
import "./types/Category";
import "./types/User";

export const schema = builder.toSchema();
