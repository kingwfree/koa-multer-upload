const Koa = require("koa");
const Router = require("koa-router");
const { join } = require("path");
const multer = require("koa-multer");
const cors = require("koa2-cors");

const app = new Koa();
const router = new Router();
const storage = multer.diskStorage({
  //存储路径
  destination: join(__dirname, "upload"),
  //文件名 file当前上传的文件的信息
  filename(req, file, cb) {
    const filename = file.originalname.split(".");
    cb(null, `${Date.now()}.${filename[filename.length - 1]}`);
  }
});

const upload = multer({ storage });

//single的参数与input的name保持一致
router.post("/upload", upload.single("fileUpload"), async ctx => {
  ctx.body = {
    filename: ctx.req.file.filename
  };
});
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3005, () => {
  console.log("监听在3005端口");
});
