const bcrypt = require("bcryptjs");
const getUserId = require("../utils/getUserId");

module.exports = (app, router) => {
  const db = router.db;

  app.delete("/reset-settings/:userId", (req, res) => {
    const userId = Number(req.params.userId);
    db.get("notes").remove({ userId, isPrivate: true }).write();
    db.get("users").find({ id: userId }).assign({ mPin: "" }).write();
    res.json({ message: "Private notes deleted & mPin cleared" });
  });

  app.post("/change-mpin", (req, res) => {
    const { currentMpin, newMpin } = req.body;
    const userId = Number(getUserId(req));
    const user = db.get("users").find({ id: userId }).value();

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.mPin && user.mPin !== currentMpin)
      return res.status(400).json({ message: "Wrong MPIN" });

    db.get("users").find({ id: userId }).assign({ mPin: newMpin }).write();
    res.json({ message: "MPIN changed" });
  });

  app.post("/change-password", async (req, res) => {
    const { newPassword } = req.body;
    const userId = Number(getUserId(req));
    const user = db.get("users").find({ id: userId }).value();

    if (!user) return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    db.get("users").find({ id: userId }).assign({ password: hashed }).write();
    res.json({ message: "Password changed" });
  });
};
