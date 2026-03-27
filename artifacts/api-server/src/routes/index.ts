import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import adhkarRouter from "./adhkar.js";
import favoritesRouter from "./favorites.js";
import eventsRouter from "./events.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/adhkar", adhkarRouter);
router.use("/favorites", favoritesRouter);
router.use("/events", eventsRouter);

export default router;
