module.exports = (app, router) => {
  const db = router.db;

  app.delete("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    const note = db.get("notes").find({ id }).value();
    if (!note) return res.status(404).json({ message: "Note not found" });

    db.get("notes").remove({ id }).write();
    res.json({ message: "Note deleted successfully" });
  });

  app.get("/notes-by-month", (req, res) => {
    const { userId, year, month } = req.query;
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    const filtered = db
      .get("notes")
      .filter((n) => n.userId === Number(userId))
      .filter((n) => {
        const d = new Date(n.reminder || n.createdAt);
        return d >= start && d <= end;
      })
      .value();

    res.set("X-Total-Count", filtered.length);
    res.json(filtered);
  });

  app.post("/notes/bulk-delete", (req, res) => {
    const ids = req.body.ids;
    if (!Array.isArray(ids))
      return res.status(400).json({ message: "ids must be array" });

    ids.forEach((id) => db.get("notes").remove({ id }).write());
    res.json({ message: "Notes deleted", deletedIds: ids });
  });
};
