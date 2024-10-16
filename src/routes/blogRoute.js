import { Router } from "express";
import {
  deleteBlog,
  updateBlog,
  createBlog,
  updateUserAvatar,
  // updateUserCoverImage,
  contactUs,
  blogPage,
  contactPage,
} from "../controllers/blogcontroller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/addblog").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 5,
    },
    {
      name: "coverimage",
      maxCount: 5,
    },
  ]),
  createBlog
);

//router.post("/uploadimage", upload.array("avatar", 20), uploadImg);
router.route("/contactus").post(contactUs);
router.route("/contactpage").get(contactPage);
router.route("/blogpage").get(blogPage);
router.route("/:blogId").put(updateBlog);
router.route("/:blogId").delete(deleteBlog);
/*router
  .route("/update-coverimage")
  .patch(upload.single("coverImage"), updateUserCoverImage);*/
router.route("/:blogId").patch(upload.single("avatar"), updateUserAvatar);

export default router;
