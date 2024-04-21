import db from "../Database/index.js";

function QuizRoutes(app) {
    app.put("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
        if (quizIndex !== -1) {
            db.quizzes[quizIndex] = {
                ...db.quizzes[quizIndex],
                ...req.body
            };
            res.sendStatus(204);
        } else {
            res.sendStatus(404); // Quiz not found
        }
    });

    app.delete("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
        if (quizIndex !== -1) {
            db.quizzes.splice(quizIndex, 1);
            res.sendStatus(200);
        } else {
            res.sendStatus(404); // Quiz not found
        }
    });

    app.get("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const quizzes = db.quizzes.filter((q) => q.course === cid);
        res.send(quizzes);
    });

    app.post("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const newQuiz = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.quizzes.push(newQuiz);
        res.send(newQuiz);
    });

    app.get("/api/quizzes/:qid/details", (req, res) => {
        console.log("trying to retrieve quiz details")
        const { qid } = req.params;
        const quiz = db.quizzes.find((q) => q._id === qid);
        if (quiz) {
            res.send(quiz);
        } else {
            res.sendStatus(404); // Quiz not found
        }
    });
}

export default QuizRoutes;