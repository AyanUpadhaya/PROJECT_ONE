const multer = require("multer");
const path = require("path");

const initializeMulter = (app) => {
  // Multer setup for file storage
  const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "application/pdf": "pdf", // Added MIME type for PDF files
  };

  const storage = multer.memoryStorage();

  const upload = multer({ storage });

  // If you want to limit the number of files and their size, you can use the following:
  // app.use(upload.array("files", 10)); // 10 is the maximum number of files allowed

  // If you want to handle mixed types of fields (single and multiple files), you can use:
  // app.use(upload.fields([{ name: "singleFile", maxCount: 1 }, { name: "multipleFiles", maxCount: 10 }]));

  // If you want to handle mixed types of fields (single and multiple files), you can use:
  app.use(
    upload.fields([
      { name: "single", maxCount: 1 },
      { name: "file", maxCount: 1 },
      { name: "multiple", maxCount: 10 },
    ])
  );

  // Custom Multer error handler middleware
  app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return sendResponse(res, 500, err?.message);
    } else {
      next(err);
    }
  });
};

module.exports = { initializeMulter };
