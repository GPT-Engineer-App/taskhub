import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("Normal");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { name: newTask, dueDate, priority, completed: false }]);
      setNewTask("");
      setDueDate(null);
      setPriority("Normal");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(index)} />
                  <span className={task.completed ? "line-through" : ""}>{task.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{task.dueDate ? format(task.dueDate, "PPP") : "No due date"}</span>
                  <span>{task.priority}</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Label>Task Name</Label>
                        <Input value={selectedTask?.name || ""} onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })} />
                        <Label>Due Date</Label>
                        <Calendar selected={selectedTask?.dueDate} onSelect={(date) => setSelectedTask({ ...selectedTask, dueDate: date })} />
                        <Label>Priority</Label>
                        <Input value={selectedTask?.priority || ""} onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })} />
                        <Label>Description</Label>
                        <Textarea value={selectedTask?.description || ""} onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })} />
                        <Button onClick={() => updateTask(index, selectedTask)}>Save</Button>
                        <Button variant="destructive" onClick={() => deleteTask(index)}>Delete</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Input placeholder="Add a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <Button onClick={addTask} className="mt-2">Add Task</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;