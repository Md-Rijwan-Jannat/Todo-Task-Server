require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_WRL;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  // await client.connect();
  try {
    const db = client.db("todo-task-management");
    const taskCollection = db.collection("tasks");

    // app.get('/tasks', async (req, res) => {
    //   const cursor = taskCollection.find({});
    //   const tasks = await cursor.toArray();
    //   res.send({ status: true, data: tasks });
    // });

    app.get("/tasks", async (req, res) => {
      let query = {};
      if (req.query.priority) {
        query.priority = req.query.priority;
      }
      const cursor = taskCollection.find(query);
      const tasks = await cursor.toArray();
      res.send({ status: true, data: tasks });
    });

    // Create a new task
    app.post("/task", async (req, res) => {
      const task = req.body;
      const createdAt = new Date();
      const updatedAt = new Date();
      const newData = {
        ...task,
        createdAt,
        updatedAt,
      };
      const result = await taskCollection.insertOne(newData);
      res.send(result);
    });

    // Get a task by id
    app.get("/task/:id", async (req, res) => {
      const id = req.params.id;
      const result = await taskCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Delete a task by id
    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Update a task by id
    app.put("/task/:id", async (req, res) => {
      const id = req.params.id;
      const task = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          title: task.title,
          description: task.description,
          priority: task.priority,
          isCompleted: task.isCompleted,
          updatedAt: new Date(),
        },
      };
      const options = { upsert: true };
      const result = await taskCollection.updateOne(filter, updateDoc, options);
      res.json(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
